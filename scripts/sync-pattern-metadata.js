import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const patternDir = path.join(root, 'levels', '06-patterns');

const HINT_INTRO = {
  '01-star-square': 'Each row has n stars — two nested loops.',
  '02-star-triangle': 'Row i has i stars, left-aligned.',
  '03-number-triangle': 'Row i prints 1 through i with a space between numbers.',
  '04-same-number-triangle': 'Row i prints the digit i repeated i times, with spaces.',
  '05-inverted-star-triangle': 'Start at row n and count down to 1 star.',
  '06-inverted-number-triangle': 'Start at row n with numbers 1..i, then shrink i.',
  '07-floyds-triangle': 'Use one counter that increases across rows.',
  '08-binary-triangle': 'Row j is 1 if j is odd, else 0 — add spaces between.',
  '09-pyramid': 'Leading spaces: n - i, then 2*i - 1 solid stars (no gaps).',
  '10-inverted-pyramid': 'Same as the pyramid, but rows from n down to 1.',
  '11-diamond': 'Print the pyramid, then an inverted pyramid without repeating the middle row.',
  '12-half-diamond': 'Left-aligned triangle up to n, then down to 1 star.',
  '13-butterfly': 'Each row: stars, spaces in the middle, stars again (widest at the center).',
  '14-hollow-square': 'Stars on the border only; spaces inside.',
  '15-alphabet-triangle': 'Row i prints A through the i-th letter, spaced.',
  '16-multiplication-grid': 'Each cell is i*j, padded to width 4 with padStart.',
};

function replaceExpectedBlock(content, expectedText) {
  const expectedBlock = expectedText.split('\n').join('\n * ');
  return content.replace(
    /\* EXPECTED OUTPUT\n \* [\s\S]*?\n \*\//,
    `* EXPECTED OUTPUT\n * ${expectedBlock}\n */`,
  );
}

async function main() {
  const entries = await fs.readdir(patternDir);
  const jsFiles = entries.filter((f) => f.endsWith('.js') && !f.endsWith('.test.js')).sort();

  const hintsPath = path.join(root, 'runner', 'hints.json');
  const hints = JSON.parse(await fs.readFile(hintsPath, 'utf8'));

  for (const jsFile of jsFiles) {
    const base = jsFile.replace(/\.js$/, '');
    const expectedPath = path.join(patternDir, `${base}.expected.txt`);
    const expected = (await fs.readFile(expectedPath, 'utf8')).replace(/\r\n/g, '\n').replace(/\n+$/, '');
    const intro = HINT_INTRO[base] ?? 'Build each row as a string, then one console.log per row.';
    hints[`06-patterns/${base}`] = `${intro}\n${expected}`;

    for (const sub of ['levels/06-patterns', '.stubs/06-patterns']) {
      const filePath = path.join(root, sub, jsFile);
      try {
        const content = await fs.readFile(filePath, 'utf8');
        await fs.writeFile(filePath, replaceExpectedBlock(content, expected), 'utf8');
      } catch {
        /* optional stub */
      }
    }
  }

  await fs.writeFile(hintsPath, `${JSON.stringify(hints, null, 2)}\n`, 'utf8');
  console.log(`Updated ${jsFiles.length} pattern exercises and hints.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
