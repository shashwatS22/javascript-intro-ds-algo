import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

export const normalize = (s) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '');

export function compareOutput(actual, expected) {
  const normActual = normalize(actual);
  const normExpected = normalize(expected);
  return normActual === normExpected;
}

export function buildDiff(expected, actual, maxLines = 20) {
  const expectedLines = normalize(expected).split('\n');
  const actualLines = normalize(actual).split('\n');
  const maxLen = Math.max(expectedLines.length, actualLines.length);
  const totalLines = maxLen;
  const capped = Math.min(maxLen, maxLines);

  let firstDiffIndex = -1;
  const rows = [];

  for (let i = 0; i < capped; i++) {
    const exp = expectedLines[i] ?? '';
    const act = actualLines[i] ?? '';
    const isDiff = exp !== act;
    if (isDiff && firstDiffIndex === -1) {
      firstDiffIndex = i;
    }
    rows.push({
      line: i + 1,
      expected: exp === '' && i >= expectedLines.length ? '(nothing)' : exp,
      actual: act === '' && i >= actualLines.length ? '(nothing)' : act,
      isDiff,
      isFirstDiff: isDiff && firstDiffIndex === i,
    });
  }

  return {
    rows,
    firstDiffIndex,
    totalLines,
    truncated: totalLines > maxLines,
    remaining: totalLines > maxLines ? totalLines - maxLines : 0,
  };
}

export async function loadExpected(absPath) {
  let expectedPath = absPath.replace(/\.js$/, '.expected.txt');
  const solutionsMarker = `${path.sep}.solutions${path.sep}`;
  const levelsMarker = `${path.sep}levels${path.sep}`;
  if (expectedPath.includes(solutionsMarker)) {
    expectedPath = expectedPath.replace(solutionsMarker, levelsMarker);
  }
  try {
    return await fs.readFile(expectedPath, 'utf8');
  } catch {
    return null;
  }
}

export function getTestPath(absPath) {
  return absPath.replace(/\.js$/, '.test.js');
}

export async function hasTestFile(absPath) {
  const testPath = getTestPath(absPath);
  try {
    await fs.access(testPath);
    return testPath;
  } catch {
    const solutionsMarker = `${path.sep}.solutions${path.sep}`;
    const levelsMarker = `${path.sep}levels${path.sep}`;
    if (testPath.includes(solutionsMarker)) {
      const levelsTest = testPath.replace(solutionsMarker, levelsMarker);
      try {
        await fs.access(levelsTest);
        return levelsTest;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export function parseTapOutput(output) {
  const lines = output.split('\n');
  let passed = 0;
  let failed = 0;
  const failures = [];

  for (const line of lines) {
    if (line.startsWith('ok ') && !line.includes('# todo')) {
      passed++;
    } else if (line.startsWith('not ok ')) {
      failed++;
      failures.push(line.replace(/^not ok \d+ - /, ''));
    }
  }

  return { passed, failed, failures, allPassed: failed === 0 && passed > 0 };
}

export function trimStackTrace(stderr, exercisePath) {
  const lines = stderr.trim().split('\n');
  if (lines.length === 0) return stderr;

  const result = [];
  const exerciseBase = path.basename(exercisePath);

  for (let i = 0; i < lines.length && result.length < 6; i++) {
    const line = lines[i];
    if (i === 0 || line.includes(exerciseBase) || line.includes('Error:')) {
      result.push(line);
    }
  }

  if (result.length === 0) {
    return lines.slice(0, 5).join('\n');
  }

  return result.join('\n');
}
