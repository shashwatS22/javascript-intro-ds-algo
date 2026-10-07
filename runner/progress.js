import fs from 'node:fs/promises';
import path from 'node:path';
import { getRoot } from './resolve.js';

const progressPath = path.join(getRoot(), 'progress.json');
const progressBakPath = path.join(getRoot(), 'progress.json.bak');

const defaultProgress = () => ({
  version: 1,
  startedAt: new Date().toISOString(),
  exercises: {},
});

export async function loadProgress() {
  try {
    const raw = await fs.readFile(progressPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return defaultProgress();
    }
    try {
      await fs.copyFile(progressPath, progressBakPath);
      console.warn('progress.json was corrupt — backed up to progress.json.bak and starting fresh.');
    } catch {
      // ignore backup failure
    }
    return defaultProgress();
  }
}

async function writeProgressAtomic(data) {
  const tmpPath = `${progressPath}.${process.pid}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  await fs.rename(tmpPath, progressPath);
}

export async function recordAttempt(result) {
  const progress = await loadProgress();
  const id = result.id;
  const existing = progress.exercises[id] ?? {
    status: 'pending',
    attempts: 0,
    solutionViewed: false,
  };

  existing.attempts = (existing.attempts ?? 0) + 1;
  existing.lastRunAt = new Date().toISOString();
  existing.status = result.status;

  if (result.status === 'pass' && !existing.firstPassAt) {
    existing.firstPassAt = new Date().toISOString();
  }

  progress.exercises[id] = existing;
  await writeProgressAtomic(progress);
  return progress;
}

export async function markSolutionViewed(id) {
  const progress = await loadProgress();
  if (!progress.exercises[id]) {
    progress.exercises[id] = {
      status: 'pending',
      attempts: 0,
      solutionViewed: true,
    };
  } else {
    progress.exercises[id].solutionViewed = true;
  }
  await writeProgressAtomic(progress);
}

export async function resetExercise(id) {
  const progress = await loadProgress();
  delete progress.exercises[id];
  await writeProgressAtomic(progress);
}

export async function resetLevel(levelName) {
  const progress = await loadProgress();
  for (const key of Object.keys(progress.exercises)) {
    if (key.startsWith(`${levelName}/`)) {
      delete progress.exercises[key];
    }
  }
  await writeProgressAtomic(progress);
}

export async function getExerciseProgress(id) {
  const progress = await loadProgress();
  return progress.exercises[id] ?? null;
}

export async function getFullProgress() {
  return loadProgress();
}

export function countFailures(exerciseProgress) {
  if (!exerciseProgress) return 0;
  if (exerciseProgress.status === 'pass') return exerciseProgress.attempts > 1 ? exerciseProgress.attempts - 1 : 0;
  return exerciseProgress.attempts ?? 0;
}

export async function getLongestStuck(progress) {
  let max = { id: null, attempts: 0 };
  for (const [id, data] of Object.entries(progress.exercises)) {
    if (data.status !== 'pass' && data.attempts > max.attempts) {
      max = { id, attempts: data.attempts };
    }
  }
  return max;
}

export async function getCurrentLevel(progress) {
  const { listLevels, listExercisesInLevel } = await import('./resolve.js');
  const levels = await listLevels();
  for (const level of levels) {
    const exercises = await listExercisesInLevel(level);
    for (const ex of exercises) {
      const id = `${level}/${ex}`;
      if (progress.exercises[id]?.status !== 'pass') {
        return level;
      }
    }
  }
  return levels[levels.length - 1] ?? null;
}

export async function getTotalStats(progress) {
  const { listAllExerciseIds } = await import('./resolve.js');
  const allIds = await listAllExerciseIds();
  const passed = allIds.filter((id) => progress.exercises[id]?.status === 'pass').length;
  return { total: allIds.length, passed };
}
