import chokidar from 'chokidar';
import path from 'node:path';
import pc from 'picocolors';
import fs from 'node:fs/promises';
import { runExercise } from './run-one.js';
import { printResult, printBanner } from './report.js';
import { recordAttempt } from './progress.js';
import {
  pathToId,
  isExerciseFile,
  canAccessLevel,
  getRoot,
} from './resolve.js';
import { getFullProgress } from './progress.js';

const root = getRoot();

async function loadConfig() {
  try {
    const raw = await fs.readFile(path.join(root, 'config.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return { strictProgression: true };
  }
}

printBanner();

const watcher = chokidar.watch(path.join(root, 'levels'), {
  ignored: ['**/*.test.js', '**/node_modules/**', '**/helpers/**'],
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 120, pollInterval: 20 },
});

let running = false;
let pendingRel = null;

async function handleFile(rel) {
  if (!isExerciseFile(rel)) return;

  if (running) {
    pendingRel = rel;
    return;
  }

  running = true;
  try {
    do {
      const current = pendingRel ?? rel;
      pendingRel = null;

      const absPath = path.isAbsolute(current) ? current : path.join(root, current);
      const id = pathToId(absPath);
      const level = id?.split('/')[0];

      process.stdout.write(pc.dim(`\n  → ${id} saved — checking…\n`));

      const config = await loadConfig();
      if (config.strictProgression && level) {
        const progress = await getFullProgress();
        const access = await canAccessLevel(level, progress, true);
        if (!access.allowed) {
          console.log(pc.yellow(`\n  ${access.message}\n`));
          continue;
        }
      }

      const result = await runExercise(absPath, { timeoutMs: config.timeoutMs });
      await recordAttempt(result);
      await printResult(result);
    } while (pendingRel);
  } finally {
    running = false;
  }
}

watcher.on('change', (rel) => {
  handleFile(rel).catch((err) => console.error(pc.red(`\n  Watcher error: ${err.message}\n`)));
});

watcher.on('add', (rel) => {
  handleFile(rel).catch((err) => console.error(pc.red(`\n  Watcher error: ${err.message}\n`)));
});

watcher.on('ready', () => {
  console.log(pc.dim('Watching levels/ — save any exercise to check it.\n'));
});
