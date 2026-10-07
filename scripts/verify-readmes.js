// Extracts fenced js blocks from levels/*/README.md, runs each snippet,
// and compares stdout to expected output written in trailing // comments.

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import pc from 'picocolors';

const root = process.cwd();
const TIMEOUT_MS = 5000;
const ASYNC_TAIL_MS = 250;

const normalize = (s) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '');

function stripCommentPrefix(line) {
  return line.replace(/^\s*\/\/\s?/, '');
}

function isCommentLine(line) {
  return /^\s*\/\//.test(line);
}

function looksLikeOutputComment(line) {
  const content = stripCommentPrefix(line).trim();
  if (content === '') return false;

  // Skip explanatory comments (sentences, teaching notes).
  if (/^(explain|note|because|this |the |here |i\+\+|why |do not|don't)/i.test(content)) {
    return false;
  }
  if (/[.!?]$/.test(content) && content.split(/\s+/).length > 4) {
    return false;
  }

  return true;
}

function splitCodeAndExpected(block) {
  const lines = block.replace(/\n+$/, '').split('\n');
  const expected = [];
  let end = lines.length - 1;

  while (end >= 0) {
    const line = lines[end];
    if (line.trim() === '') {
      end--;
      continue;
    }
    if (isCommentLine(line)) {
      expected.unshift(stripCommentPrefix(line));
      end--;
      continue;
    }
    break;
  }

  const codeLines = lines.slice(0, end + 1).filter((line) => {
    if (!isCommentLine(line)) return true;
    return !looksLikeOutputComment(line);
  });

  return {
    code: codeLines.join('\n').trim(),
    expected: expected.join('\n'),
  };
}

function extractJsBlocks(markdown) {
  const blocks = [];
  const re = /```js\n([\s\S]*?)```/g;
  let match;
  while ((match = re.exec(markdown)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function needsAsyncWait(code) {
  return /\b(setTimeout|setInterval|Promise|async|await|\.then\s*\(|\.catch\s*\(|\.finally\s*\(|fs\/promises|readFile)\b/.test(
    code,
  );
}

function runSnippet(code, cwd) {
  return new Promise(async (resolve) => {
    const tmpDir = await mkdtemp(path.join(tmpdir(), 'verify-readme-'));
    const file = path.join(tmpDir, 'snippet.mjs');

    let fullCode = code;
    if (needsAsyncWait(code)) {
      fullCode = `${code}\nawait new Promise((resolveDelay) => setTimeout(resolveDelay, ${ASYNC_TAIL_MS}));\n`;
    }

    try {
      await writeFile(file, fullCode, 'utf8');
    } catch (err) {
      await rm(tmpDir, { recursive: true, force: true });
      resolve({ error: err.message, stdout: '', stderr: '', exitCode: 1 });
      return;
    }

    const child = spawn('node', [file], {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, TIMEOUT_MS);

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('close', async (exitCode) => {
      clearTimeout(timer);
      await rm(tmpDir, { recursive: true, force: true });
      resolve({ stdout, stderr, exitCode, timedOut });
    });
  });
}

async function findReadmeFiles() {
  const levelsDir = path.join(root, 'levels');
  const entries = await fs.readdir(levelsDir, { withFileTypes: true });
  const readmes = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(levelsDir, entry.name, 'README.md');
    try {
      await fs.access(readmePath);
      readmes.push(readmePath);
    } catch {
      // no README in this level
    }
  }

  return readmes.sort();
}

async function verifyReadme(readmePath) {
  const rel = path.relative(root, readmePath);
  const markdown = await fs.readFile(readmePath, 'utf8');
  const blocks = extractJsBlocks(markdown);
  const results = [];

  for (let i = 0; i < blocks.length; i++) {
    const blockIndex = i + 1;
    const { code, expected } = splitCodeAndExpected(blocks[i]);

    if (!code) {
      results.push({
        rel,
        blockIndex,
        status: 'skip',
        reason: 'empty code block',
      });
      continue;
    }

    const run = await runSnippet(code, root);

    if (run.timedOut) {
      results.push({
        rel,
        blockIndex,
        status: 'fail',
        reason: 'timed out',
        expected,
        actual: run.stdout,
      });
      continue;
    }

    if (run.exitCode !== 0) {
      results.push({
        rel,
        blockIndex,
        status: 'fail',
        reason: 'runtime error',
        expected,
        actual: run.stdout,
        stderr: run.stderr.trim(),
      });
      continue;
    }

    const actual = normalize(run.stdout);
    const want = normalize(expected);

    if (actual === want) {
      results.push({ rel, blockIndex, status: 'pass' });
    } else {
      results.push({
        rel,
        blockIndex,
        status: 'fail',
        reason: 'output mismatch',
        expected: want,
        actual,
      });
    }
  }

  return results;
}

async function main() {
  const readmes = await findReadmeFiles();

  if (readmes.length === 0) {
    console.log(pc.yellow('No levels/*/README.md files found.'));
    process.exit(0);
  }

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const readmePath of readmes) {
    const results = await verifyReadme(readmePath);

    for (const result of results) {
      const label = `${result.rel} block ${result.blockIndex}`;

      if (result.status === 'pass') {
        passed++;
        console.log(pc.green(`✓ PASS  ${label}`));
      } else if (result.status === 'skip') {
        skipped++;
        console.log(pc.dim(`○ SKIP  ${label} (${result.reason})`));
      } else {
        failed++;
        console.log(pc.red(`✗ FAIL  ${label} (${result.reason})`));
        if (result.stderr) {
          console.log(pc.dim(`  stderr: ${result.stderr.split('\n')[0]}`));
        }
        if (result.expected !== undefined) {
          console.log(pc.dim('  expected:'));
          for (const line of result.expected.split('\n')) {
            console.log(pc.dim(`    ${line}`));
          }
          console.log(pc.dim('  actual:'));
          for (const line of (result.actual || '').split('\n')) {
            console.log(pc.dim(`    ${line}`));
          }
        }
      }
    }
  }

  console.log('');
  console.log(
    `${readmes.length} README(s) — ${pc.green(`${passed} passed`)}, ${pc.red(`${failed} failed`)}, ${pc.dim(`${skipped} skipped`)}`,
  );

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(pc.red(err.message));
  process.exit(1);
});
