import pc from 'picocolors';
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildDiff } from './grade.js';
import {
  getLevelProgress,
  getNextLevelName,
  getLevelNumber,
  getRoot,
} from './resolve.js';
import { getFullProgress } from './progress.js';

let configCache = null;

async function loadConfig() {
  if (configCache) return configCache;
  try {
    const raw = await fs.readFile(path.join(getRoot(), 'config.json'), 'utf8');
    configCache = JSON.parse(raw);
  } catch {
    configCache = { clearScreen: true };
  }
  return configCache;
}

export function printBanner() {
  console.log(pc.bold('\n  js-bootcamp — save a file to check your work\n'));
}

export async function printResult(result) {
  const config = await loadConfig();

  if (config.clearScreen) {
    process.stdout.write('\x1Bc');
    printBanner();
  }

  const { id, status, durationMs, mode } = result;

  if (status === 'pass') {
    console.log(pc.green(`✓ PASS  ${id}`) + pc.dim(`  (${durationMs}ms)`));

    const progress = await getFullProgress();
    const { total, passed } = await getLevelProgress(result.level, progress);
    const levelNum = String(getLevelNumber(result.level)).padStart(2, '0');
    console.log(pc.dim(`\n  Level ${levelNum} — ${passed}/${total} done`));

    if (passed === total && total > 0) {
      const nextLevel = await getNextLevelName(result.level);
      console.log('');
      console.log(pc.green(pc.bold('  ═══════════════════════════════════════')));
      console.log(pc.green(pc.bold(`  Level ${levelNum} complete! Nice work.`)));
      if (nextLevel) {
        console.log(pc.green(`  Next up: ${nextLevel}`));
      } else {
        console.log(pc.green('  You finished all levels!'));
      }
      console.log(pc.green(pc.bold('  ═══════════════════════════════════════')));
    }
    console.log('');
    return;
  }

  if (status === 'timeout') {
    console.log(pc.red(`✗ TIMEOUT  ${id}`));
    console.log(pc.yellow('\n  Timed out — you may have an infinite loop.\n'));
    return;
  }

  if (status === 'missing-expected') {
    console.log(pc.red(`✗ ERROR  ${id}`));
    console.log(pc.yellow(`\n  ${result.stderr}\n`));
    return;
  }

  if (status === 'error') {
    console.log(pc.red(`✗ ERROR  ${id}`));
    if (result.stderr) {
      console.log(pc.yellow('\n  ' + result.stderr.split('\n').join('\n  ') + '\n'));
    }
    return;
  }

  // fail
  console.log(pc.red(`✗ FAIL  ${id}`));
  console.log('');

  if (mode === 'test') {
    console.log('  Test failures:');
    const failures = result.testFailures ?? [result.actual];
    for (const f of failures) {
      console.log(pc.yellow(`  • ${f}`));
    }
    console.log('');
  } else {
    const diff = buildDiff(result.expected, result.actual);
    console.log('  line  expected          your output');
    console.log('  ' + '─'.repeat(4) + '  ' + '─'.repeat(16) + '  ' + '─'.repeat(16));

    for (const row of diff.rows) {
      const marker = row.isFirstDiff ? pc.yellow('  ← first difference') : '';
      const expCol = row.expected.padEnd(16).slice(0, 16);
      const actCol = row.actual.padEnd(16).slice(0, 16);
      const lineStr = String(row.line).padStart(4);
      if (row.isFirstDiff) {
        console.log(
          pc.dim(`  ${lineStr}`) +
            '  ' +
            pc.green(expCol) +
            '  ' +
            pc.red(actCol) +
            marker,
        );
        if (diff.firstDiffIndex >= 0) {
          const expLine = diff.rows[diff.firstDiffIndex]?.expected ?? '';
          const actLine = diff.rows[diff.firstDiffIndex]?.actual ?? '';
          console.log(
            pc.dim(
              `\n  Not quite — your line ${row.line} prints ${actLine === '(nothing)' ? 'nothing' : actLine}, expected ${expLine === '(nothing)' ? 'nothing' : expLine}.`,
            ),
          );
        }
      } else {
        console.log(pc.dim(`  ${lineStr}`) + '  ' + expCol + '  ' + actCol);
      }
    }

    if (diff.truncated) {
      console.log(pc.dim(`\n  ... ${diff.remaining} more lines`));
    }
    console.log('');
  }

  if (result.hint) {
    console.log(pc.cyan(`  Hint: ${result.hint}`));
    console.log('');
  }
}

export async function printLevelSummary(results) {
  console.log('\n  Exercise                          Status    Time');
  console.log('  ' + '─'.repeat(50));

  let passed = 0;
  for (const r of results) {
    const statusColor =
      r.status === 'pass'
        ? pc.green('PASS')
        : r.status === 'fail'
          ? pc.red('FAIL')
          : pc.yellow(r.status.toUpperCase());
    console.log(`  ${r.id.padEnd(34)}  ${statusColor.padEnd(12)}  ${r.durationMs}ms`);
    if (r.status === 'pass') passed++;
  }

  console.log('');
  console.log(`  ${passed}/${results.length} passed\n`);
}

export async function printProgressDashboard() {
  const progress = await getFullProgress();
  const { listLevels, getLevelProgress } = await import('./resolve.js');
  const { getTotalStats, getCurrentLevel, getLongestStuck } = await import('./progress.js');

  const levels = await listLevels();
  const { total, passed } = await getTotalStats(progress);
  const current = await getCurrentLevel(progress);
  const stuck = await getLongestStuck(progress);

  console.log('\n  js-bootcamp progress\n');
  console.log(`  Total: ${passed}/${total} exercises passed\n`);

  for (const level of levels) {
    const { total: lt, passed: lp } = await getLevelProgress(level, progress);
    const pct = lt > 0 ? Math.round((lp / lt) * 100) : 0;
    const barLen = 20;
    const filled = Math.round((pct / 100) * barLen);
    const bar = '█'.repeat(filled) + '░'.repeat(barLen - filled);
    const num = String(getLevelNumber(level)).padStart(2, '0');
    console.log(`  Level ${num}  [${bar}] ${lp}/${lt}`);
  }

  console.log('');
  if (current) {
    console.log(`  Current level: ${current}`);
  }
  if (stuck.id && stuck.attempts >= 2) {
    console.log(`  Longest stuck: ${stuck.id} (${stuck.attempts} attempts)`);
  }
  console.log('');
}
