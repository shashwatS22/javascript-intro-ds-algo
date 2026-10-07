import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import {
  compareOutput,
  loadExpected,
  hasTestFile,
  parseTapOutput,
  trimStackTrace,
} from './grade.js';
import { pathToId, getRoot } from './resolve.js';

let hintsCache = null;

async function loadHints() {
  if (hintsCache) return hintsCache;
  try {
    const raw = await fs.readFile(path.join(getRoot(), 'runner', 'hints.json'), 'utf8');
    hintsCache = JSON.parse(raw);
  } catch {
    hintsCache = {};
  }
  return hintsCache;
}

function runProcess(command, args, cwd, timeoutMs) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      env: { ...process.env },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, code: timedOut ? -1 : code, timedOut });
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ stdout, stderr: err.message, code: 1, timedOut: false });
    });
  });
}

export async function runExercise(absPath, options = {}) {
  const root = getRoot();
  const start = Date.now();
  const id = pathToId(absPath);
  const level = id ? id.split('/')[0] : path.basename(path.dirname(absPath));
  const hints = await loadHints();
  const hint = hints[id] ?? undefined;

  const timeoutMs = options.timeoutMs ?? 5000;
  const testPath = await hasTestFile(absPath);

  if (testPath) {
    const { stdout, stderr, code, timedOut } = await runProcess(
      'node',
      ['--test', '--test-reporter', 'tap', testPath],
      root,
      timeoutMs,
    );
    const durationMs = Date.now() - start;

    if (timedOut) {
      return {
        id,
        level,
        status: 'timeout',
        mode: 'test',
        expected: '',
        actual: stdout,
        stderr,
        durationMs,
        hint,
      };
    }

    const tap = parseTapOutput(stdout + '\n' + stderr);

    if (code !== 0 || !tap.allPassed) {
      return {
        id,
        level,
        status: tap.failed > 0 ? 'fail' : 'error',
        mode: 'test',
        expected: 'all tests pass',
        actual: tap.failures.join('\n') || stderr,
        stderr,
        durationMs,
        hint,
        testFailures: tap.failures,
      };
    }

    return {
      id,
      level,
      status: 'pass',
      mode: 'test',
      expected: 'all tests pass',
      actual: `${tap.passed} test(s) passed`,
      stderr: '',
      durationMs,
      hint,
    };
  }

  const expected = await loadExpected(absPath);
  if (expected === null) {
    return {
      id,
      level,
      status: 'missing-expected',
      mode: 'output',
      expected: '',
      actual: '',
      stderr: 'No .expected.txt file found for this exercise.',
      durationMs: Date.now() - start,
      hint,
    };
  }

  const { stdout, stderr, code, timedOut } = await runProcess('node', [absPath], root, timeoutMs);
  const durationMs = Date.now() - start;

  if (timedOut) {
    return {
      id,
      level,
      status: 'timeout',
      mode: 'output',
      expected,
      actual: stdout,
      stderr,
      durationMs,
      hint,
    };
  }

  if (code !== 0 || stderr.trim()) {
    return {
      id,
      level,
      status: 'error',
      mode: 'output',
      expected,
      actual: stdout,
      stderr: trimStackTrace(stderr, absPath),
      durationMs,
      hint,
    };
  }

  const passed = compareOutput(stdout, expected);

  return {
    id,
    level,
    status: passed ? 'pass' : 'fail',
    mode: 'output',
    expected,
    actual: stdout,
    stderr: '',
    durationMs,
    hint,
  };
}
