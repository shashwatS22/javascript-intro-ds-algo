import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { spawn } from 'node:child_process';
import { runExercise } from './run-one.js';
import {
  printResult,
  printLevelSummary,
  printProgressDashboard,
} from './report.js';
import {
  idToPath,
  findLevelByNumber,
  listExercisesInLevel,
  listAllExerciseIds,
  getStubsDir,
  getRoot,
  getSolutionsDir,
} from './resolve.js';
import {
  getExerciseProgress,
  markSolutionViewed,
  resetExercise,
  resetLevel,
  loadProgress,
} from './progress.js';

async function loadConfig() {
  try {
    const raw = await fs.readFile(path.join(getRoot(), 'config.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return { solutionUnlockAfterFailures: 3, timeoutMs: 5000 };
  }
}

function runProcess(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (c) => (stdout += c));
    child.stderr.on('data', (c) => (stderr += c));
    child.on('close', (code) => resolve({ stdout, stderr, code }));
    child.on('error', reject);
  });
}

async function cmdCheck(args) {
  const id = args[0];
  if (!id) {
    console.log('\n  Usage: npm run check <exercise-id>');
    console.log('  Example: npm run check 01-print-and-variables/01-hello\n');
    process.exit(1);
  }

  const useSolutions = args.includes('--solutions');
  const absPath = idToPath(id, useSolutions);
  try {
    await fs.access(absPath);
  } catch {
    console.log(`\n  Exercise not found: ${id}\n`);
    process.exit(1);
  }

  const config = await loadConfig();
  const result = await runExercise(absPath, { timeoutMs: config.timeoutMs });
  await printResult(result);
  process.exit(result.status === 'pass' ? 0 : 1);
}

async function cmdCheckLevel(args) {
  const levelArg = args.find((a) => !a.startsWith('--'));
  if (!levelArg) {
    console.log('\n  Usage: npm run check:level <NN>');
    console.log('  Example: npm run check:level 01\n');
    process.exit(1);
  }

  const useSolutions = args.includes('--solutions');
  const levelName = await findLevelByNumber(parseInt(levelArg, 10));
  if (!levelName) {
    console.log(`\n  Level not found: ${levelArg}\n`);
    process.exit(1);
  }

  const exercises = await listExercisesInLevel(levelName);
  const config = await loadConfig();
  const results = [];

  for (const ex of exercises) {
    const id = `${levelName}/${ex}`;
    const absPath = idToPath(id, useSolutions);
    const result = await runExercise(absPath, { timeoutMs: config.timeoutMs });
    results.push(result);
  }

  await printLevelSummary(results);
  const allPass = results.every((r) => r.status === 'pass');
  process.exit(allPass ? 0 : 1);
}

async function cmdProgress() {
  await printProgressDashboard();
}

async function cmdSolution(args) {
  const force = args.includes('--force');
  const id = args.find((a) => !a.startsWith('--'));
  if (!id) {
    console.log('\n  Usage: npm run solution <exercise-id> [--force]\n');
    process.exit(1);
  }

  const config = await loadConfig();
  const progress = await getExerciseProgress(id);
  const failures = progress?.status === 'pass' ? 0 : (progress?.attempts ?? 0);
  const needed = config.solutionUnlockAfterFailures ?? 3;

  if (!force && failures < needed) {
    const remaining = needed - failures;
    console.log(`\n  Solution locked. ${remaining} more failed attempt(s) needed.`);
    console.log('  Use --force to override.\n');
    process.exit(1);
  }

  const solPath = idToPath(id, true);
  try {
    const code = await fs.readFile(solPath, 'utf8');
    console.log(`\n  Solution for ${id}:\n`);
    console.log(code);
    await markSolutionViewed(id);
  } catch {
    console.log(`\n  No solution found for: ${id}\n`);
    process.exit(1);
  }
}

async function confirm(message) {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`${message} (y/N) `);
  rl.close();
  return answer.toLowerCase() === 'y';
}

async function cmdReset(args) {
  const target = args[0];
  if (!target) {
    console.log('\n  Usage: npm run reset <exercise-id|level-number>\n');
    process.exit(1);
  }

  const ok = await confirm(`Reset progress and restore stub for "${target}"?`);
  if (!ok) {
    console.log('\n  Cancelled.\n');
    return;
  }

  const stubsDir = getStubsDir();
  const levelName = await findLevelByNumber(parseInt(target, 10));

  if (levelName && !target.includes('/')) {
    await resetLevel(levelName);
    const exercises = await listExercisesInLevel(levelName);
    for (const ex of exercises) {
      const stubSrc = path.join(stubsDir, levelName, `${ex}.js`);
      const stubDest = path.join(getRoot(), 'levels', levelName, `${ex}.js`);
      try {
        await fs.copyFile(stubSrc, stubDest);
      } catch {
        // stub may not exist yet
      }
    }
    console.log(`\n  Reset level ${levelName}.\n`);
  } else {
    await resetExercise(target);
    const [level, file] = target.split('/');
    const stubSrc = path.join(stubsDir, level, `${file}.js`);
    const stubDest = idToPath(target, false);
    try {
      await fs.copyFile(stubSrc, stubDest);
      console.log(`\n  Reset ${target}.\n`);
    } catch {
      console.log(`\n  Progress cleared for ${target} (stub not restored — no snapshot).\n`);
    }
  }
}

async function cmdGenExpected() {
  const solutionsDir = getSolutionsDir();
  const root = getRoot();
  const ids = await listAllExerciseIds();
  let generated = 0;
  let skipped = 0;

  for (const id of ids) {
    const solPath = path.join(solutionsDir, `${id}.js`);
    const expectedPath = path.join(root, 'levels', `${id}.expected.txt`);
    const testPath = path.join(root, 'levels', `${id}.test.js`);

    try {
      await fs.access(testPath);
      skipped++;
      continue;
    } catch {
      // not test-graded
    }

    try {
      await fs.access(solPath);
    } catch {
      console.error(`  Missing solution for ${id}`);
      process.exit(1);
    }

    const { stdout, stderr, code } = await runProcess('node', [solPath], root);

    if (code !== 0 || stderr.trim()) {
      console.error(`  Solution failed for ${id}:\n${stderr}`);
      process.exit(1);
    }

    if (!stdout && stdout !== '') {
      console.error(`  Empty output for ${id} — not writing expected file.`);
      process.exit(1);
    }

    await fs.writeFile(expectedPath, stdout, 'utf8');
    generated++;
  }

  console.log(`\n  Generated ${generated} expected files (${skipped} test-graded skipped).\n`);
}

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'check':
      await cmdCheck(args);
      break;
    case 'check:level':
      await cmdCheckLevel(args);
      break;
    case 'progress':
      await cmdProgress();
      break;
    case 'solution':
      await cmdSolution(args);
      break;
    case 'reset':
      await cmdReset(args);
      break;
    case 'gen:expected':
      await cmdGenExpected();
      break;
    default:
      console.log('\n  Unknown command. Use: check, check:level, progress, solution, reset, gen:expected\n');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
