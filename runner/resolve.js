import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const levelsDir = path.join(root, 'levels');
const solutionsDir = path.join(root, '.solutions');
const stubsDir = path.join(root, '.stubs');

export function getRoot() {
  return root;
}

export function getLevelsDir() {
  return levelsDir;
}

export function getSolutionsDir() {
  return solutionsDir;
}

export function getStubsDir() {
  return stubsDir;
}

export function pathToId(absPath) {
  const rel = path.relative(levelsDir, absPath);
  if (rel.startsWith('..')) {
    const solRel = path.relative(solutionsDir, absPath);
    if (!solRel.startsWith('..')) {
      return solRel.replace(/\.js$/, '');
    }
    return null;
  }
  return rel.replace(/\.js$/, '').replace(/\\/g, '/');
}

export function idToPath(id, useSolutions = false) {
  const base = useSolutions ? solutionsDir : levelsDir;
  return path.join(base, `${id}.js`);
}

export function isExerciseFile(relPath) {
  if (!relPath.endsWith('.js')) return false;
  if (relPath.endsWith('.test.js')) return false;
  if (relPath.includes('/helpers/') || relPath.includes('\\helpers\\')) return false;
  return true;
}

export async function listLevels() {
  try {
    const entries = await fs.readdir(levelsDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

export async function listExercisesInLevel(levelName) {
  const levelPath = path.join(levelsDir, levelName);
  try {
    const entries = await fs.readdir(levelPath, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith('.js') && !e.name.endsWith('.test.js'))
      .map((e) => e.name.replace(/\.js$/, ''))
      .sort();
  } catch {
    return [];
  }
}

export async function listAllExerciseIds() {
  const levels = await listLevels();
  const ids = [];
  for (const level of levels) {
    const exercises = await listExercisesInLevel(level);
    for (const ex of exercises) {
      ids.push(`${level}/${ex}`);
    }
  }
  return ids;
}

export function getLevelNumber(levelName) {
  const match = levelName.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export async function getLevelProgress(levelName, progressData) {
  const exercises = await listExercisesInLevel(levelName);
  const passed = exercises.filter((ex) => {
    const id = `${levelName}/${ex}`;
    return progressData.exercises?.[id]?.status === 'pass';
  });
  return { total: exercises.length, passed: passed.length, exercises };
}

export async function isLevelComplete(levelName, progressData) {
  const { total, passed } = await getLevelProgress(levelName, progressData);
  return total > 0 && passed === total;
}

export async function getFirstUnfinishedExercise(progressData) {
  const levels = await listLevels();
  for (const level of levels) {
    const { exercises, total, passed } = await getLevelProgress(level, progressData);
    if (passed < total) {
      for (const ex of exercises) {
        const id = `${level}/${ex}`;
        if (progressData.exercises?.[id]?.status !== 'pass') {
          return id;
        }
      }
    }
  }
  return null;
}

export async function canAccessLevel(levelName, progressData, strictProgression) {
  if (!strictProgression) return { allowed: true };

  const levelNum = getLevelNumber(levelName);
  if (levelNum <= 1) return { allowed: true };

  const levels = await listLevels();
  const prevLevel = levels.find((l) => getLevelNumber(l) === levelNum - 1);
  if (!prevLevel) return { allowed: true };

  const complete = await isLevelComplete(prevLevel, progressData);
  if (complete) return { allowed: true };

  const unfinished = await getFirstUnfinishedExercise(progressData);
  return {
    allowed: false,
    message: `Finish the previous level first. Next up: ${unfinished ?? prevLevel}`,
    unfinished,
  };
}

export function getNextLevel(currentLevel) {
  const num = getLevelNumber(currentLevel);
  const nextNum = String(num + 1).padStart(2, '0');
  return null; // resolved async
}

export async function getNextLevelName(currentLevel) {
  const levels = await listLevels();
  const num = getLevelNumber(currentLevel);
  return levels.find((l) => getLevelNumber(l) === num + 1) ?? null;
}

export function parseLevelArg(arg) {
  if (!arg) return null;
  const padded = arg.padStart(2, '0');
  return padded;
}

export async function findLevelByNumber(num) {
  const levels = await listLevels();
  const padded = String(num).padStart(2, '0');
  return levels.find((l) => l.startsWith(padded)) ?? null;
}
