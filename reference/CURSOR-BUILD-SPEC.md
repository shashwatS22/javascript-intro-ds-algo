# Build Spec — `js-bootcamp` auto-graded JavaScript practice repo

**Give this file to Cursor.** It contains everything needed to scaffold the repo: structure, runner implementation, file conventions, and all 190 exercises.

Read §1–§7 fully before writing code. §8 is the exercise bank. §9 is the build order with acceptance criteria — follow it in sequence.

---

## 1. What we're building

A local Node.js project for one learner. She opens an exercise file, writes code, saves. A file watcher immediately runs that one file, compares its stdout to an expected output, and prints **PASS** or **FAIL** with a diff. Progress is tracked in a JSON file.

**Non-goals:** no web UI, no server, no database, no accounts, no deployment. This is a terminal experience. Keep it small and fast.

### Why a custom watcher instead of plain nodemon

`nodemon` restarts one fixed entry file on any change. We need to run *the specific file that changed* and grade it. That's ~40 lines with `chokidar`. We use `chokidar` directly. `nodemon` is not a dependency.

---

## 2. Tech constraints

- Node.js 20+ (uses `node:test`, `fs/promises`, top-level await)
- **ESM only** — `"type": "module"` in `package.json`. Every file uses `import`/`export`, never `require`. Consistency with what she'll use in Next.js.
- Dependencies: `chokidar` and `picocolors`. Nothing else. No TypeScript in this repo (that comes later in a separate `ts-drills/` folder).
- Cross-platform: must work on Windows, macOS, Linux. Use `node:path` everywhere, never hardcode `/`.

---

## 3. Repo structure

```
js-bootcamp/
├── package.json
├── README.md                    # how to run it, written for a beginner
├── NOTES.md                     # her scratch notes (starts with a template)
├── config.json                  # runner settings
├── progress.json                # generated, gitignored
├── .gitignore
│
├── runner/
│   ├── watch.js                 # chokidar watcher — the main entry point
│   ├── run-one.js               # execute a single exercise, return a result
│   ├── grade.js                 # output normalisation + comparison + diff
│   ├── report.js                # all terminal formatting/colour
│   ├── progress.js              # read/write progress.json
│   ├── resolve.js               # id <-> path helpers, level listing
│   └── cli.js                   # argument parsing for check / level / progress / solution
│
├── levels/
│   ├── 01-print-and-variables/
│   │   ├── README.md            # concept notes for this level
│   │   ├── 01-hello.js          # her file — stub with instructions in a comment
│   │   ├── 01-hello.expected.txt
│   │   ├── 02-name-age.js
│   │   ├── 02-name-age.expected.txt
│   │   └── ...
│   ├── 02-operators/
│   └── ... through 15-modules-errors-async/
│
├── .solutions/                  # reference solutions, one per exercise
│   ├── 01-print-and-variables/
│   │   └── 01-hello.js
│   └── ...
│
└── playground/
    └── scratch.js               # free space, never graded
```

### Naming rules

- Level folder: `NN-kebab-case-name`, `NN` zero-padded from `01`.
- Exercise file: `NN-kebab-case-name.js`, `NN` zero-padded, unique within its level.
- **Exercise ID** = `<level-folder>/<exercise-basename>`, e.g. `04-for-loops/07-count-digits`. This ID is used in the CLI, in `progress.json`, and in solution lookup.
- Expected output: same basename + `.expected.txt`.
- Test-graded exercises (level 08 onward, where a function is the deliverable): same basename + `.test.js`.

---

## 4. Exercise file format

Every exercise stub follows this shape exactly:

```js
/**
 * 04-for-loops / 07-count-digits
 *
 * TASK
 * Count how many digits the number below has, and print the count.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 5
 */

// ---- GIVEN ----
const n = 74821;
// ---------------

// Your code below 👇
```

Rules for stubs:

- The `TASK` block is one to three plain sentences. No jargon she hasn't met yet.
- `GIVEN` values are always literal constants inside the marked block. **No `process.stdin` anywhere in this repo** — stdin makes grading flaky and adds nothing pedagogically at this stage.
- `EXPECTED OUTPUT` is repeated in the comment for short outputs (≤ 6 lines) so she doesn't have to open another file. For longer outputs, write `See 07-count-digits.expected.txt`.
- Never leave a partial solution in the stub. Empty below the comment.

---

## 5. Grading

### 5.1 Output grading (default)

1. Spawn `node <file>` as a child process with `cwd` = repo root.
2. Timeout: 5000 ms. On timeout → `FAIL` with reason `Timed out — you may have an infinite loop.`
3. Non-zero exit code or anything on stderr → `ERROR`. Print stderr, and if it contains a stack trace, show only the first 5 lines plus the error message. Do not print the runner's own stack.
4. Normalise both actual and expected before comparing:

```js
export const normalize = (s) =>
  s.replace(/\r\n/g, '\n')      // Windows line endings
   .split('\n')
   .map((line) => line.replace(/\s+$/, ''))  // strip trailing whitespace per line
   .join('\n')
   .replace(/\n+$/, '');        // strip trailing blank lines
```

5. Compare normalised strings. Equal → `PASS`.

### 5.2 Diff output on failure

Show a line-aligned comparison, capped at 20 lines. First differing line marked. Example:

```
✗ FAIL  04-for-loops/12-fibonacci

  line  expected          your output
  ────  ────────────────  ────────────────
   1    0                 0
   2    1                 1
   3    1                 1
   4    2                 3      ← first difference
   5    3                 5
   6    5                 (nothing)

  Hint: check your loop's starting values.
```

The `Hint` line comes from an optional `hint` field in the exercise metadata. Omit the line if there's no hint.

### 5.3 Test grading

If `<basename>.test.js` exists **instead of** `.expected.txt`, run `node --test <testfile>` and parse the TAP output. Pass if all assertions pass. Show failed assertion messages on failure.

Test files use only Node built-ins:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from './01-add-function.js';

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
});
```

For test-graded exercises the stub must include the required `export` signature in the comment block.

### 5.4 Generating expected outputs

**Do not hand-write `.expected.txt` files.** For each exercise:

1. Write a correct reference solution in `.solutions/<level>/<file>.js`.
2. Run it.
3. Write its stdout verbatim to `levels/<level>/<file>.expected.txt`.

This must be a script, `npm run gen:expected`, that regenerates all of them. It guarantees the expected output and the reference solution can never drift apart. Run it as the final build step and commit the results.

If a reference solution errors or produces empty output, fail the generation loudly with the exercise ID — do not write an empty expected file.

---

## 6. The runner

### 6.1 `runner/watch.js`

```js
import chokidar from 'chokidar';
import path from 'node:path';
import pc from 'picocolors';
import { runExercise } from './run-one.js';
import { printResult, printBanner } from './report.js';
import { recordAttempt } from './progress.js';

const root = process.cwd();

printBanner();

const watcher = chokidar.watch('levels/**/*.js', {
  cwd: root,
  ignored: ['**/*.test.js', '**/node_modules/**'],
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 120, pollInterval: 20 },
});

let running = false;

watcher.on('change', async (rel) => {
  if (running) return;              // ignore saves while a run is in flight
  running = true;
  try {
    const result = await runExercise(path.join(root, rel));
    await recordAttempt(result);
    printResult(result);
  } finally {
    running = false;
  }
});

watcher.on('ready', () => console.log(pc.dim('Watching levels/ — save any exercise to check it.\n')));
```

### 6.2 `runner/run-one.js`

Exports `runExercise(absPath) -> Result`.

```js
{
  id: '04-for-loops/07-count-digits',
  level: '04-for-loops',
  status: 'pass' | 'fail' | 'error' | 'timeout' | 'missing-expected',
  mode: 'output' | 'test',
  expected: string,
  actual: string,
  stderr: string,
  durationMs: number,
  hint?: string,
}
```

Use `child_process.spawn('node', [file])` (not `exec`) so output isn't buffer-limited. Kill on timeout with `SIGKILL`.

### 6.3 `runner/report.js`

All colour lives here. Requirements:

- Clear the terminal before each result so the screen only ever shows the latest verdict. (`process.stdout.write('\x1Bc')`, but respect a `config.json` flag `clearScreen`.)
- `PASS` in green with a checkmark, the exercise ID, and elapsed time.
- On a pass, show the level's progress: `Level 04 — 7/14 done`.
- When a level goes fully green, print a distinct celebration block and the name of the next level.
- Never print more than 20 diff lines; truncate with `... N more lines`.
- No emoji spam. One glyph per verdict.

### 6.4 `runner/progress.js`

`progress.json` shape:

```json
{
  "version": 1,
  "startedAt": "2026-09-06T10:00:00.000Z",
  "exercises": {
    "04-for-loops/07-count-digits": {
      "status": "pass",
      "attempts": 4,
      "firstPassAt": "2026-09-08T14:22:11.000Z",
      "lastRunAt": "2026-09-08T14:22:11.000Z",
      "solutionViewed": false
    }
  }
}
```

Write atomically (temp file + rename). Never lose progress on a crash. If the file is corrupt, back it up to `progress.json.bak` and start fresh with a warning rather than throwing.

### 6.5 CLI commands

| Command | Behaviour |
|---|---|
| `npm run dev` | Start the watcher. This is the one she uses all day. |
| `npm run check <id>` | Run one exercise once and print the verdict. |
| `npm run check:level <NN>` | Run every exercise in a level, print a summary table. |
| `npm run progress` | Print a dashboard: per-level bar, total done, current level, longest-stuck exercise. |
| `npm run solution <id>` | Print the reference solution. **Locked** until the exercise has ≥ 3 recorded failed attempts. If locked, print how many attempts remain. `--force` overrides. Sets `solutionViewed: true`. |
| `npm run gen:expected` | Regenerate all `.expected.txt` from `.solutions/`. Maintainer command. |
| `npm run reset <id\|level>` | Clear an exercise or level's progress and restore the stub. Asks for confirmation. |

### 6.6 `config.json`

```json
{
  "clearScreen": true,
  "timeoutMs": 5000,
  "strictProgression": true,
  "solutionUnlockAfterFailures": 3
}
```

`strictProgression: true` means the watcher refuses to grade an exercise in level `N` until level `N-1` is fully green — it prints a short message pointing at the first unfinished exercise instead. This is deliberate; it stops level-skipping.

---

## 7. Level `README.md` template

Every level folder gets one. Cursor drafts it; it must be beginner-readable — short sentences, no unexplained terminology, every concept shown with a runnable snippet.

```md
# Level 04 — For loops

## What you'll learn
- (3–5 bullets, plain language)

## Concepts

### The `for` loop
(2–3 sentences of explanation)

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// 1
// 2
// 3
```
(one sentence on what each of the three parts does)

### ... (one section per concept)

## Common mistakes
- (3–4 real beginner mistakes with the fix)

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-` to `14-` in order. Save each file to check it.
```

Rules for these READMEs:
- Explain `i++` the first time it appears. Explain `%` the first time it appears. Assume nothing.
- Every code block must actually run and produce the output shown in its comments.
- No forward references to concepts from later levels.

---

## 8. The exercise bank — 190 exercises

**Column meaning:** `Expected` is the exact stdout, with `\n` shown as `⏎`. Where the output is long or shape-dependent, it says `→ from solution` — generate it via `npm run gen:expected`.

Unless a row says otherwise, every exercise is **output-graded**. Rows marked **[T]** are **test-graded** — the stub exports a named function and a `.test.js` accompanies it.

---

### Level 01 — `01-print-and-variables` (12)

| # | File | Task (with GIVEN values) | Expected |
|---|---|---|---|
| 1 | `01-hello` | Print exactly `Hello, World!` | `Hello, World!` |
| 2 | `02-name-age` | GIVEN `name = "Riya"`, `age = 27`. Print `Riya is 27 years old` using a template literal. | `Riya is 27 years old` |
| 3 | `03-two-lines` | Print `Line one` then `Line two` using two separate `console.log` calls. | `Line one⏎Line two` |
| 4 | `04-one-log-two-lines` | Print the same two lines using **one** `console.log` and `\n`. | `Line one⏎Line two` |
| 5 | `05-let-reassign` | Declare `let count = 10`. Print it. Reassign to `20`. Print it again. | `10⏎20` |
| 6 | `06-typeof` | Print the `typeof` each of: `5`, `"hi"`, `true`, `undefined`, `null`, `{}` — one per line. | `number⏎string⏎boolean⏎undefined⏎object⏎object` |
| 7 | `07-concat` | GIVEN `first = "Ada"`, `last = "Lovelace"`. Print the full name with a space between. | `Ada Lovelace` |
| 8 | `08-address` | Print a 3-line address using a single multi-line template literal: `12 Park Road` / `Bareilly` / `243001`. | `12 Park Road⏎Bareilly⏎243001` |
| 9 | `09-swap` | GIVEN `a = 1`, `b = 2`. Swap them using array destructuring, then print `a=2 b=1`. | `a=2 b=1` |
| 10 | `10-decimals` | GIVEN `pi = 3.14159`. Print it rounded to 2 decimal places using `toFixed`. | `3.14` |
| 11 | `11-booleans` | Print the result of `5 > 3`, then `5 === "5"`, one per line. | `true⏎false` |
| 12 | `12-escapes` | Print exactly: `She said "hello" and left.` then on the next line a tab-separated `a	b`. | `She said "hello" and left.⏎a	b` |

---

### Level 02 — `02-operators` (12)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-arithmetic` | GIVEN `a = 17`, `b = 5`. Print sum, difference, product, quotient, remainder — one per line. | `22⏎12⏎85⏎3.4⏎2` |
| 2 | `02-integer-divide` | GIVEN `a = 17`, `b = 5`. Print the whole-number part of `a / b` using `Math.floor`. | `3` |
| 3 | `03-post-vs-pre` | GIVEN `let x = 5`. Print `x++`, then `x`, then `++x`, then `x`. | `5⏎6⏎7⏎7` |
| 4 | `04-compound` | GIVEN `let total = 100`. Apply `+= 20`, `-= 30`, `*= 2`, `/= 4` in order, printing after each. | `120⏎90⏎180⏎45` |
| 5 | `05-loose-vs-strict` | Print `1 == "1"`, `1 === "1"`, `0 == false`, `0 === false`, `null == undefined`, `null === undefined`. | `true⏎false⏎true⏎false⏎true⏎false` |
| 6 | `06-logical` | GIVEN `a = true`, `b = false`. Print `a && b`, `a \|\| b`, `!a`, `!b`. | `false⏎true⏎false⏎true` |
| 7 | `07-ternary` | GIVEN `n = 14`. Use a ternary to print `even` or `odd`. | `even` |
| 8 | `08-string-to-number` | GIVEN `s = "42"`. Print `s + 8` and `Number(s) + 8`. | `428⏎50` |
| 9 | `09-nan` | GIVEN `x = Number("abc")`. Print `x`, then `Number.isNaN(x)`. | `NaN⏎true` |
| 10 | `10-math-methods` | Print `Math.abs(-7)`, `Math.pow(2, 10)`, `Math.sqrt(144)`, `Math.round(4.6)`, `Math.max(3, 9, 2)`. | `7⏎1024⏎12⏎5⏎9` |
| 11 | `11-precedence` | Print the value of `2 + 3 * 4`, then `(2 + 3) * 4`, then `10 - 4 - 3`. | `14⏎20⏎3` |
| 12 | `12-last-digit` | GIVEN `n = 4739`. Print its last digit using `%`, then its first digit using division in a `while`-free way (`Math.floor(n / 1000)`). | `9⏎4` |

---

### Level 03 — `03-conditionals` (12)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-sign` | GIVEN `n = -14`. Print `positive`, `negative`, or `zero`. | `negative` |
| 2 | `02-even-odd` | GIVEN `n = 27`. Print `even` or `odd` using `if`/`else`. | `odd` |
| 3 | `03-max-of-two` | GIVEN `a = 34`, `b = 34`. Print the larger, or `equal` if they're the same. | `equal` |
| 4 | `04-max-of-three` | GIVEN `a = 12`, `b = 45`, `c = 45`. Print the largest value. | `45` |
| 5 | `05-leap-year` | GIVEN `year = 2100`. Print `leap` or `not leap` (divisible by 4, but not 100, unless also by 400). | `not leap` |
| 6 | `06-grade` | GIVEN `marks = 73`. Print grade: 90+ `A`, 75+ `B`, 60+ `C`, 40+ `D`, else `F`. | `C` |
| 7 | `07-vowel` | GIVEN `ch = "u"`. Print `vowel` or `consonant`. | `vowel` |
| 8 | `08-switch-day` | GIVEN `day = 6`. Use `switch` to print the weekday name (1 = Monday). | `Saturday` |
| 9 | `09-switch-calc` | GIVEN `a = 12`, `b = 4`, `op = "/"`. Use `switch` on `op` to print the result. Handle `+ - * /` and an unknown-operator default. | `3` |
| 10 | `10-can-vote` | GIVEN `age = 17`, `isCitizen = true`. Print `can vote` only if 18+ **and** a citizen, else `cannot vote`. | `cannot vote` |
| 11 | `11-triangle-valid` | GIVEN sides `a = 3`, `b = 4`, `c = 8`. Print `valid` if each pair's sum exceeds the third side, else `invalid`. | `invalid` |
| 12 | `12-fizzbuzz-one` | GIVEN `n = 15`. Print `FizzBuzz`, `Fizz`, `Buzz`, or the number itself. | `FizzBuzz` |

---

### Level 04 — `04-for-loops` (14)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-one-to-ten` | Print 1 to 10, one per line. | `1⏎2⏎…⏎10` |
| 2 | `02-ten-to-one` | Print 10 down to 1, one per line. | `10⏎9⏎…⏎1` |
| 3 | `03-evens` | Print every even number from 2 to 20, one per line. | → from solution |
| 4 | `04-sum-to-n` | GIVEN `n = 100`. Print the sum of 1 to n. | `5050` |
| 5 | `05-times-table` | GIVEN `n = 7`. Print `7 x 1 = 7` through `7 x 10 = 70`. | → from solution |
| 6 | `06-factorial` | GIVEN `n = 6`. Print n factorial using a loop. | `720` |
| 7 | `07-count-digits` | GIVEN `n = 74821`. Print how many digits it has, using a loop (not `.toString()`). | `5` |
| 8 | `08-reverse-number` | GIVEN `n = 12345`. Print the number reversed, as a number. | `54321` |
| 9 | `09-power` | GIVEN `base = 3`, `exp = 5`. Print `base ** exp` computed with a loop (no `Math.pow`, no `**`). | `243` |
| 10 | `10-sum-of-digits` | GIVEN `n = 9375`. Print the sum of its digits. | `24` |
| 11 | `11-squares` | Print the square of every number 1 to 8, one per line. | → from solution |
| 12 | `12-fibonacci` | GIVEN `n = 10`. Print the first n Fibonacci numbers starting `0, 1`, one per line. | → from solution |
| 13 | `13-fizzbuzz` | Print FizzBuzz for 1 to 20, one per line. | → from solution |
| 14 | `14-count-vowels` | GIVEN `s = "javascript is fun"`. Loop over the characters and print the vowel count. | `6` |

---

### Level 05 — `05-while-loops` (10)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-while-count` | GIVEN `n = 5`. Print 1 to n using a `while` loop. | `1⏎2⏎3⏎4⏎5` |
| 2 | `02-sum-digits-while` | GIVEN `n = 48291`. Print the digit sum using `while`. | `24` |
| 3 | `03-reverse-while` | GIVEN `n = 9081`. Print it reversed using `while`. | `1809` |
| 4 | `04-palindrome-number` | GIVEN `n = 12321`. Print `palindrome` or `not palindrome`. | `palindrome` |
| 5 | `05-armstrong` | GIVEN `n = 153`. Print `armstrong` if the sum of each digit cubed equals n. | `armstrong` |
| 6 | `06-gcd` | GIVEN `a = 48`, `b = 18`. Print the GCD using Euclid's algorithm with `while`. | `6` |
| 7 | `07-count-digits-while` | GIVEN `n = 1000000`. Print its digit count using `while`. | `7` |
| 8 | `08-to-binary` | GIVEN `n = 25`. Print its binary form by repeatedly dividing by 2 (no `.toString(2)`). | `11001` |
| 9 | `09-do-while` | GIVEN `n = 0`. Use `do...while` to show the body runs once even though the condition is false. Print `ran once` then `loop finished`. | `ran once⏎loop finished` |
| 10 | `10-collatz` | GIVEN `n = 27`. Count the steps to reach 1 (even → n/2, odd → 3n+1). Print the count. | `111` |

---

### Level 06 — `06-patterns` (16)

All patterns use GIVEN `n = 5` unless noted. Every expected output comes from the reference solution. These map directly to Striver Step 1, Lec 2.

| # | File | Pattern |
|---|---|---|
| 1 | `01-star-square` | 5×5 solid square of `*` |
| 2 | `02-star-triangle` | Left-aligned right triangle of `*`, rows 1→5 |
| 3 | `03-number-triangle` | Left-aligned triangle where row `i` prints `1 2 … i` |
| 4 | `04-same-number-triangle` | Row `i` prints the digit `i` repeated `i` times |
| 5 | `05-inverted-star-triangle` | Left-aligned triangle of `*`, rows 5→1 |
| 6 | `06-inverted-number-triangle` | Rows 5→1, row prints `1 2 … i` |
| 7 | `07-floyds-triangle` | Numbers 1..15 laid out in 5 rows, continuing across rows |
| 8 | `08-binary-triangle` | Triangle of alternating `1`/`0`, each row starting with `1` |
| 9 | `09-pyramid` | Centred pyramid of `*`, 5 rows |
| 10 | `10-inverted-pyramid` | Centred pyramid of `*`, upside down |
| 11 | `11-diamond` | Pyramid on top of inverted pyramid |
| 12 | `12-half-diamond` | Triangle up then triangle down, left-aligned |
| 13 | `13-butterfly` | Butterfly pattern of `*`, `n = 4` |
| 14 | `14-hollow-square` | 5×5 square, `*` on the border, spaces inside |
| 15 | `15-alphabet-triangle` | Row `i` prints `A B … ` up to the `i`-th letter |
| 16 | `16-multiplication-grid` | 5×5 multiplication table, columns padded to width 4 with `padStart` |

Reference solutions must build each line into a string variable and print it with **one** `console.log` per row. Do not use `process.stdout.write`. The level README must show this pattern explicitly.

---

### Level 07 — `07-number-problems` (14)

Direct preparation for Striver's "Basic Maths".

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-count-digits` | GIVEN `n = 946213`. Print digit count. | `6` |
| 2 | `02-reverse` | GIVEN `n = 700`. Print reversed as a number (leading zeros dropped). | `7` |
| 3 | `03-palindrome` | GIVEN `n = 1221`. Print `true` or `false`. | `true` |
| 4 | `04-armstrong` | GIVEN `n = 371`. Print `true` or `false`. | `true` |
| 5 | `05-divisors` | GIVEN `n = 36`. Print all divisors, space-separated, on one line. | `1 2 3 4 6 9 12 18 36` |
| 6 | `06-is-prime` | GIVEN `n = 97`. Print `prime` or `not prime`. Loop only to `Math.sqrt(n)`. | `prime` |
| 7 | `07-gcd` | GIVEN `a = 120`, `b = 45`. Print the GCD. | `15` |
| 8 | `08-lcm` | GIVEN `a = 12`, `b = 18`. Print the LCM using `(a*b)/gcd`. | `36` |
| 9 | `09-sum-divisors` | GIVEN `n = 28`. Print the sum of all divisors including n. | `56` |
| 10 | `10-perfect-number` | GIVEN `n = 496`. Print `perfect` if its proper divisors sum to n. | `perfect` |
| 11 | `11-prime-factors` | GIVEN `n = 360`. Print prime factors with repeats, space-separated. | `2 2 2 3 3 5` |
| 12 | `12-primes-to-n` | GIVEN `n = 30`. Print every prime from 2 to n, space-separated. | `2 3 5 7 11 13 17 19 23 29` |
| 13 | `13-nth-prime` | GIVEN `k = 20`. Print the 20th prime number. | `71` |
| 14 | `14-digit-frequency` | GIVEN `n = 1223334444`. Print each distinct digit and its count as `digit:count`, ascending, space-separated. | `1:1 2:2 3:3 4:4` |

---

### Level 08 — `08-functions` (14)

Exercises 1–8 are **[T]** test-graded — the file exports a function, a `.test.js` checks it. Exercises 9–14 are output-graded because they demonstrate behaviour rather than compute a value.

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-add` **[T]** | Export `add(a, b)` returning their sum. Use a function declaration. | tests |
| 2 | `02-arrow-multiply` **[T]** | Export `multiply(a, b)` as an arrow function with an implicit return. | tests |
| 3 | `03-default-params` **[T]** | Export `greet(name, greeting = "Hello")` returning `"Hello, Ada!"` style. | tests |
| 4 | `04-is-even` **[T]** | Export `isEven(n)` returning a boolean. | tests |
| 5 | `05-min-max-object` **[T]** | Export `minMax(numbers)` returning `{ min, max }`. | tests |
| 6 | `06-rest-sum` **[T]** | Export `sum(...numbers)` handling any argument count, returning 0 for none. | tests |
| 7 | `07-apply-twice` **[T]** | Export `applyTwice(fn, value)` returning `fn(fn(value))`. | tests |
| 8 | `08-make-multiplier` **[T]** | Export `makeMultiplier(n)` returning a function that multiplies its argument by n. | tests |
| 9 | `09-return-vs-log` | Define two functions — one that returns `5`, one that logs `5` and returns nothing. Print the result of calling each. | `5⏎5⏎undefined` |
| 10 | `10-spread-call` | GIVEN `nums = [4, 9, 2]`. Call `Math.max` with the array spread into it and print the result. | `9` |
| 11 | `11-callback` | Write `repeat(times, callback)` that calls the callback with each index 0..times-1. Call it with `times = 3` and a callback that prints `step 0` etc. | `step 0⏎step 1⏎step 2` |
| 12 | `12-iife` | Write an IIFE that prints `ran immediately`. | `ran immediately` |
| 13 | `13-scope` | Inside an `if` block declare `let inner = "block"`. Outside, declare `let outer = "function"`. Print `inner` inside the block and `outer` outside. Add a comment explaining why printing `inner` outside would throw. | `block⏎function` |
| 14 | `14-closure-counter` | Write `makeCounter()` returning a function that returns 1, 2, 3… on successive calls. Create one counter, call it 3 times, print each result. | `1⏎2⏎3` |

---

### Level 09 — `09-strings` (14)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-basics` | GIVEN `s = "JavaScript"`. Print length, uppercase, lowercase. | `10⏎JAVASCRIPT⏎javascript` |
| 2 | `02-loop-chars` | GIVEN `s = "code"`. Print each character on its own line. | `c⏎o⏎d⏎e` |
| 3 | `03-reverse` | GIVEN `s = "bareilly"`. Print it reversed, using a loop (not `.split().reverse().join()`). | `yllierab` |
| 4 | `04-palindrome` | GIVEN `s = "racecar"`. Print `true` or `false`. | `true` |
| 5 | `05-count-vowels-consonants` | GIVEN `s = "hello world"`. Print `vowels: 3` then `consonants: 7`. | `vowels: 3⏎consonants: 7` |
| 6 | `06-word-count` | GIVEN `s = " the quick  brown fox "`. Print the number of words, handling extra spaces. | `4` |
| 7 | `07-title-case` | GIVEN `s = "learning javascript today"`. Print it with each word capitalised. | `Learning Javascript Today` |
| 8 | `08-remove-duplicates` | GIVEN `s = "programming"`. Print the string with duplicate characters removed, keeping first occurrences. | `progamin` |
| 9 | `09-split-join` | GIVEN `s = "a,b,c,d"`. Split on commas and print the array joined by ` - `. | `a - b - c - d` |
| 10 | `10-search-methods` | GIVEN `s = "javascript"`. Print `s.includes("script")`, `s.startsWith("java")`, `s.endsWith("x")`, `s.indexOf("a")`. | `true⏎true⏎false⏎1` |
| 11 | `11-slice` | GIVEN `s = "abcdefgh"`. Print `s.slice(2, 5)`, `s.slice(-3)`, `s.substring(5, 2)`. | `cde⏎fgh⏎cde` |
| 12 | `12-replace` | GIVEN `s = "cat bat cat"`. Print `s.replace("cat", "dog")` then `s.replaceAll("cat", "dog")`. | `dog bat cat⏎dog bat dog` |
| 13 | `13-trim-pad` | GIVEN `s = "  7  "`. Print `s.trim()`, then the trimmed value padded to 5 with leading zeros. | `7⏎00007` |
| 14 | `14-anagram` | GIVEN `a = "listen"`, `b = "silent"`. Print `true` if they're anagrams. Sort the characters to compare. | `true` |

---

### Level 10 — `10-arrays` (16)

Every exercise prints the result. Arrays are printed with `.join(" ")` unless stated, so output is a clean single line.

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-basics` | GIVEN `arr = [10, 20, 30]`. Print length, first element, last element. | `3⏎10⏎30` |
| 2 | `02-mutate` | GIVEN `arr = [2, 3]`. `push(4)`, `unshift(1)`, print joined. Then `pop()`, `shift()`, print joined. | `1 2 3 4⏎2 3` |
| 3 | `03-two-loops` | GIVEN `arr = ["a", "b", "c"]`. Print each element with a classic `for`, then again with `for...of`. | `a⏎b⏎c⏎a⏎b⏎c` |
| 4 | `04-sum-average` | GIVEN `arr = [4, 8, 15, 16, 23, 42]`. Print the sum, then the average to 2 decimals. | `108⏎18.00` |
| 5 | `05-largest` | GIVEN `arr = [3, 41, 7, 41, 19]`. Print the largest element without `Math.max`. | `41` |
| 6 | `06-second-largest` | GIVEN `arr = [12, 35, 1, 10, 34, 35]`. Print the second largest **distinct** value. | `34` |
| 7 | `07-is-sorted` | GIVEN `arr = [1, 2, 2, 5, 9]`. Print `true` if non-decreasing. | `true` |
| 8 | `08-reverse-in-place` | GIVEN `arr = [1, 2, 3, 4, 5]`. Reverse it using two pointers, no `.reverse()`. Print joined. | `5 4 3 2 1` |
| 9 | `09-linear-search` | GIVEN `arr = [7, 3, 9, 1]`, `target = 9`. Print the index, or `-1`. | `2` |
| 10 | `10-count-occurrences` | GIVEN `arr = [1, 3, 3, 5, 3]`, `target = 3`. Print how many times it appears. | `3` |
| 11 | `11-remove-duplicates-sorted` | GIVEN `arr = [1, 1, 2, 2, 2, 3, 3]`. Print the unique values joined. | `1 2 3` |
| 12 | `12-rotate-one` | GIVEN `arr = [1, 2, 3, 4, 5]`. Left-rotate by one place. Print joined. | `2 3 4 5 1` |
| 13 | `13-rotate-k` | GIVEN `arr = [1, 2, 3, 4, 5, 6, 7]`, `k = 3`. Left-rotate by k. Print joined. | `4 5 6 7 1 2 3` |
| 14 | `14-move-zeros` | GIVEN `arr = [0, 1, 0, 3, 12]`. Move all zeros to the end, keeping the order of the rest. Print joined. | `1 3 12 0 0` |
| 15 | `15-union-sorted` | GIVEN `a = [1, 2, 3, 4, 6]`, `b = [2, 3, 5]`. Print the sorted union, joined. | `1 2 3 4 5 6` |
| 16 | `16-missing-number` | GIVEN `arr = [0, 1, 2, 4, 5]`, `n = 5`. Print the missing number from 0..n. | `3` |

---

### Level 11 — `11-array-methods` (12)

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-foreach` | GIVEN `arr = [10, 20, 30]`. Use `forEach` to print `index: value` for each. | `0: 10⏎1: 20⏎2: 30` |
| 2 | `02-map` | GIVEN `arr = [1, 2, 3, 4]`. Print each element doubled, joined. | `2 4 6 8` |
| 3 | `03-filter` | GIVEN `arr = [1..10]`. Print only even numbers, joined. | `2 4 6 8 10` |
| 4 | `04-reduce-sum` | GIVEN `arr = [5, 10, 15]`. Print the sum using `reduce`. | `30` |
| 5 | `05-reduce-max` | GIVEN `arr = [4, 19, 7, 2]`. Print the max using `reduce`. | `19` |
| 6 | `06-find` | GIVEN `arr = [3, 8, 12, 5]`. Print the first element greater than 7, then its index. | `8⏎1` |
| 7 | `07-some-every` | GIVEN `arr = [2, 4, 6, 7]`. Print `arr.some(isOdd)` then `arr.every(isEven)`. | `true⏎false` |
| 8 | `08-sort-numbers` | GIVEN `arr = [10, 9, 100, 2]`. Print sorted ascending, then descending, each joined. Explain in a comment why plain `.sort()` is wrong here. | `2 9 10 100⏎100 10 9 2` |
| 9 | `09-sort-strings` | GIVEN `arr = ["banana", "apple", "cherry"]`. Print sorted alphabetically, joined. | `apple banana cherry` |
| 10 | `10-chaining` | GIVEN `arr = [1..10]`. Take the evens, square them, sum them. Print the result. | `220` |
| 11 | `11-flat` | GIVEN `arr = [1, [2, 3], [4, [5]]]`. Print `arr.flat()` joined, then `arr.flat(2)` joined. | `1 2 3 4 5⏎1 2 3 4 5` |
| 12 | `12-immutability` | GIVEN `arr = [1, 2, 3]`. Show that `map` returns a new array and doesn't change the original. Print the mapped array joined, then the original joined. | `2 4 6⏎1 2 3` |

---

### Level 12 — `12-objects` (12)

Shared GIVEN for several exercises: `const people = [{ name: "Ada", age: 36, city: "London" }, { name: "Raman", age: 42, city: "Kolkata" }, { name: "Meera", age: 29, city: "Pune" }]`

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-access` | GIVEN `user = { name: "Ada", age: 36 }`. Print `user.name` and `user["age"]`. | `Ada⏎36` |
| 2 | `02-modify` | Same user. Add `city: "London"`, change age to 37, delete `age`. Print the object's keys joined. | `name city` |
| 3 | `03-for-in` | GIVEN `scores = { math: 90, science: 85, art: 72 }`. Print `key: value` for each with `for...in`. | `math: 90⏎science: 85⏎art: 72` |
| 4 | `04-keys-values-entries` | Same scores. Print `Object.keys` joined, `Object.values` joined, and the number of entries. | `math science art⏎90 85 72⏎3` |
| 5 | `05-nested` | GIVEN a nested object with `user.address.city = "Bareilly"`. Print the city. | `Bareilly` |
| 6 | `06-list-names` | Use `people`. Print each person's name on its own line. | `Ada⏎Raman⏎Meera` |
| 7 | `07-filter-objects` | Use `people`. Print the names of everyone over 30, joined by `, `. | `Ada, Raman` |
| 8 | `08-sort-objects` | Use `people`. Print names sorted by age ascending, joined. | `Meera Ada Raman` |
| 9 | `09-destructure` | GIVEN `user = { name: "Ada", age: 36, city: "London" }`. Destructure name and city into variables and print `Ada — London`. | `Ada — London` |
| 10 | `10-spread-merge` | GIVEN `defaults = { theme: "light", fontSize: 14 }`, `custom = { fontSize: 18 }`. Merge with spread and print the merged object's `theme` and `fontSize`. | `light⏎18` |
| 11 | `11-json` | Use `people[0]`. Print `JSON.stringify` of it, then parse that string back and print the parsed `.name`. | `{"name":"Ada","age":36,"city":"London"}⏎Ada` |
| 12 | `12-optional-chaining` | GIVEN `user = { name: "Ada" }`. Print `user.address?.city` and `user.address?.city ?? "unknown"`. | `undefined⏎unknown` |

---

### Level 13 — `13-recursion` (10)

Maps to Striver Step 1, Lec 5. Exercises 4–10 are **[T]** test-graded so she thinks in terms of return values, not printing.

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-print-n-times` | Recursively print `learning` 4 times. No loops. | `learning` ×4 |
| 2 | `02-print-one-to-n` | GIVEN `n = 5`. Recursively print 1 to n. | `1⏎2⏎3⏎4⏎5` |
| 3 | `03-print-n-to-one` | GIVEN `n = 5`. Recursively print n down to 1. | `5⏎4⏎3⏎2⏎1` |
| 4 | `04-sum-to-n` **[T]** | Export `sumTo(n)` returning 1+2+…+n recursively. | tests |
| 5 | `05-factorial` **[T]** | Export `factorial(n)`. `factorial(0)` must return 1. | tests |
| 6 | `06-reverse-array` **[T]** | Export `reverse(arr)` returning a reversed **new** array, recursively. | tests |
| 7 | `07-is-palindrome` **[T]** | Export `isPalindrome(s)` using two indices recursively. | tests |
| 8 | `08-fibonacci` **[T]** | Export `fib(n)` where `fib(0) = 0`, `fib(1) = 1`. | tests |
| 9 | `09-power` **[T]** | Export `power(base, exp)` recursively, `exp >= 0`. | tests |
| 10 | `10-sum-digits` **[T]** | Export `sumDigits(n)` recursively. | tests |

The level README must include a call-stack trace for `factorial(4)` drawn out line by line. This is the concept that unlocks the level.

---

### Level 14 — `14-hashing` (10)

Maps to Striver Step 1, Lec 6.

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-char-count-object` | GIVEN `s = "banana"`. Count characters using a plain object. Print `char:count` pairs in insertion order, space-separated. | `b:1 a:3 n:2` |
| 2 | `02-char-count-map` | Same string, using a `Map`. Print the same output. | `b:1 a:3 n:2` |
| 3 | `03-array-frequency` | GIVEN `arr = [10, 5, 10, 15, 10, 5]`. Print `value:count` in insertion order, space-separated. | `10:3 5:2 15:1` |
| 4 | `04-high-low-frequency` | Same array. Print `highest: 10` then `lowest: 15`. | `highest: 10⏎lowest: 15` |
| 5 | `05-set-unique` | GIVEN `arr = [1, 2, 2, 3, 3, 3]`. Print the unique values joined, and the count. | `1 2 3⏎3` |
| 6 | `06-set-operations` | GIVEN `a = [1, 2, 3, 4]`, `b = [3, 4, 5]`. Print the union joined, then the intersection joined. | `1 2 3 4 5⏎3 4` |
| 7 | `07-first-non-repeating` | GIVEN `s = "swiss"`. Print the first character that appears once, or `none`. | `w` |
| 8 | `08-two-sum` | GIVEN `arr = [2, 7, 11, 15]`, `target = 9`. Print the two indices, space-separated, using a `Map` in one pass. | `0 1` |
| 9 | `09-group-by-letter` | GIVEN `words = ["apple", "avocado", "banana", "blueberry", "cherry"]`. Group by first letter and print `a: apple, avocado` style, one line per letter. | `a: apple, avocado⏎b: banana, blueberry⏎c: cherry` |
| 10 | `10-anagram-map` | GIVEN `a = "anagram"`, `b = "nagaram"`. Print `true` using a frequency map (not sorting). | `true` |

---

### Level 15 — `15-modules-errors-async` (12)

The bridge to React and Next.js. Async is where most self-taught beginners have gaps — this level exists to close them before they matter.

| # | File | Task | Expected |
|---|---|---|---|
| 1 | `01-default-export` | Create `helpers/greet.js` with a default export. Import it here and print `Hello, Ada!`. | `Hello, Ada!` |
| 2 | `02-named-exports` | Create `helpers/math.js` exporting `add` and `subtract`. Import both and print `add(5,3)` then `subtract(5,3)`. | `8⏎2` |
| 3 | `03-try-catch` | Call `JSON.parse("not json")` inside `try`. In `catch`, print `caught an error`. Then print `still running`. | `caught an error⏎still running` |
| 4 | `04-throw` | Write `divide(a, b)` that throws if `b === 0`. Call it with `(10, 0)` in a try/catch and print the error's message: `Cannot divide by zero`. | `Cannot divide by zero` |
| 5 | `05-finally` | Show `finally` runs on both success and failure. Print `try ok`, `finally`, `caught`, `finally`. | `try ok⏎finally⏎caught⏎finally` |
| 6 | `06-settimeout-order` | Print `first`, schedule a `setTimeout` of 0ms printing `third`, then print `second`. | `first⏎second⏎third` |
| 7 | `07-callback-style` | Write `getUser(id, callback)` that uses `setTimeout` to call back with `{ id, name: "Ada" }` after 10ms. Print the name in the callback. | `Ada` |
| 8 | `08-promise` | Write a Promise that resolves with `done` after 10ms. Print the resolved value with `.then`. | `done` |
| 9 | `09-promise-reject` | Write a Promise that rejects with `failed`. Handle it with `.catch` and print the reason. | `failed` |
| 10 | `10-async-await` | Rewrite exercise 08 using `async`/`await` inside an async function. | `done` |
| 11 | `11-promise-all` | Create three promises resolving to 1, 2, 3 after different delays. Use `Promise.all` and print the results joined. | `1 2 3` |
| 12 | `12-read-file` | Read `data/sample.txt` (created during scaffolding, contents: `hello from a file`) using `fs/promises` and `await`. Print its trimmed contents. | `hello from a file` |

Exercises 1, 2 and 12 need supporting files created during scaffolding: `levels/15-modules-errors-async/helpers/` (empty, with a `.gitkeep`) and `levels/15-modules-errors-async/data/sample.txt`.

For 1 and 2 she creates the helper files herself — the stub explains this. The watcher must ignore `helpers/**` so saving a helper doesn't trigger a grade run.

---

## 9. Build order for Cursor

Do these in sequence. Don't start a step until the previous one's acceptance criteria pass.

### Step 1 — Skeleton
Create `package.json` (ESM, Node 20+, scripts stubbed), `.gitignore` (`node_modules`, `progress.json`, `progress.json.bak`), `config.json`, empty `runner/` and `levels/` directories, `playground/scratch.js`, and `NOTES.md` with a template containing `## Confused about`, `## Learned today`, `## Re-solve list`.

**Acceptance:** `npm install` succeeds. `node --version` check in `package.json` `engines`.

### Step 2 — Grader core
Implement `runner/grade.js` (normalise + compare + build a diff structure) and `runner/resolve.js` (path ↔ ID, list levels, list exercises in a level, find the first unfinished exercise).

**Acceptance:** unit tests in `runner/__tests__/grade.test.js` using `node:test` covering: exact match, trailing whitespace, `\r\n`, trailing newlines, empty actual, longer actual than expected.

### Step 3 — Single-run + reporting
Implement `runner/run-one.js` and `runner/report.js`. Build the two-column diff renderer.

**Acceptance:** hand-create one exercise (`01-print-and-variables/01-hello`) with a wrong solution and confirm the FAIL diff renders. Fix it and confirm PASS renders.

### Step 4 — Progress
Implement `runner/progress.js` with atomic writes and corruption recovery.

**Acceptance:** `npm run progress` prints a dashboard for the one existing exercise. Killing the process mid-write leaves a valid file.

### Step 5 — Watcher
Implement `runner/watch.js` including `strictProgression` and the level-complete celebration.

**Acceptance:** `npm run dev` runs, saving an exercise grades it in under 300ms, and saving a level-03 exercise while level 02 is incomplete prints the progression block message instead of grading.

### Step 6 — CLI
Implement `runner/cli.js` and wire up `check`, `check:level`, `progress`, `solution` (with the 3-failure lock), and `reset`.

**Acceptance:** each command works and prints a helpful message on bad input. `solution` refuses before 3 failures.

### Step 7 — Content generation
Generate all 15 level folders. For each exercise in §8: the stub file (per §4's format), the reference solution in `.solutions/`, and the `.test.js` where marked **[T]**. Then write and run `npm run gen:expected`.

Do this **one level at a time**, verifying each level fully before moving to the next. Do not generate all 190 in one pass.

**Acceptance per level:** `npm run check:level NN` run against `.solutions/` shows 100% pass. Every stub compiles when empty (no syntax errors). No stub contains a solution.

### Step 8 — Level READMEs
Write a `README.md` per level using the §7 template. Verify every code snippet in them actually runs and produces the commented output — write a script `npm run verify:readmes` that extracts fenced `js` blocks and executes them if that's practical; otherwise verify manually.

**Acceptance:** a reader who knows only levels 1..N-1 can understand level N's README with no external lookup.

### Step 9 — Root README
Write `README.md` for a complete beginner: how to install Node, how to clone, `npm install`, `npm run dev`, what PASS and FAIL look like (with screenshots-as-text), what to do when stuck, and the rules from the learning plan. Assume she has never used a terminal. Include the exact commands to copy.

**Acceptance:** someone who has never used Node could follow it start to finish.

### Step 10 — Full pass
Run `npm run check:level` for all 15 levels against the reference solutions. Reset progress. Verify `npm run dev` from a clean state starts at level 01.

---

## 10. Quality bar

These are the things that will make or break whether she actually uses this. Treat them as requirements, not polish.

1. **Feedback in under 300ms.** If the runner feels slow she'll stop trusting it.
2. **Failure messages never blame.** `Not quite — your line 4 prints 3, expected 2.` Not `ERROR: assertion failed`.
3. **Stack traces are trimmed.** A beginner seeing 30 lines of internal Node frames will panic. Show the error type, message, and the line number in *her* file. Nothing else.
4. **No jargon in anything she reads.** Stubs, READMEs, and runner output use words she's already met. "Function" is fine at level 08. "Closure" needs a sentence of explanation the first time.
5. **Every level ends with a visible win.** The level-complete block should genuinely feel like something.
6. **The repo runs on a fresh machine** with only Node installed. No global installs, no editor plugins required.
