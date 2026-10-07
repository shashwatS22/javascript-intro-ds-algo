# monika-learning

A local JavaScript practice repo (**js-bootcamp**). Open an exercise, write code, save — the terminal tells you **PASS** or **FAIL** right away.

Built for learning JavaScript from scratch, one small step at a time.

---

## Get the code

If you do not have this folder yet, clone it and install dependencies:

```bash
git clone <your-repo-url>
cd monika-learning
npm install
```

`progress.json` is created on your machine when you pass exercises. It is not committed to git — each clone starts fresh.

---

## What you need

1. **Node.js 20 or newer** — download from [nodejs.org](https://nodejs.org) (pick the LTS version).
2. **A code editor** — VS Code or Cursor works well.
3. **A terminal** — the panel where you type commands (in VS Code: Terminal → New Terminal).

Check Node is installed:

```bash
node --version
```

You should see `v20` or higher.

---

## First-time setup

Open a terminal in this folder and run:

```bash
npm install
```

That installs the two small tools the auto-grader needs. You only do this once.

---

## How to practice (every day)

### 1. Start the watcher

```bash
npm run dev
```

Leave this running. It watches the `levels/` folder.

### 2. Open an exercise file

Start with:

```
levels/01-print-and-variables/01-hello.js
```

Read the comment at the top. It tells you what to do.

### 3. Write your code below the comment

Type your code under `// Your code below 👇`. Do **not** copy-paste from the internet or from solutions.

### 4. Save the file

Press **Cmd+S** (Mac) or **Ctrl+S** (Windows).

The terminal clears and shows your result within a second.

---

## What PASS looks like

```
✓ PASS  01-print-and-variables/01-hello  (45ms)

  Level 01 — 1/12 done
```

Green checkmark = your output matches what was expected. Move to the next exercise.

When you finish every exercise in a level, you'll see a celebration message and the name of the next level.

---

## What FAIL looks like

```
✗ FAIL  04-for-loops/12-fibonacci

  line  expected          your output
  ────  ────────────────  ────────────────
   1    0                 0
   2    1                 1
   3    1                 1
   4    2                 3      ← first difference

  Not quite — your line 4 prints 3, expected 2.

  Hint: check your loop's starting values.
```

Read the diff line by line. Fix your code. Save again.

---

## What ERROR looks like

```
✗ ERROR  03-conditionals/05-leap-year

  ReferenceError: year is not defined
      at file:///.../05-leap-year.js:12:5
```

This means your code crashed before it could print anything. Read the error message — it usually points to the line number in **your** file.

---

## Other useful commands

| Command | What it does |
|---|---|
| `npm run check 01-print-and-variables/01-hello` | Run one exercise once (without the watcher) |
| `npm run check:level 01` | Run every exercise in level 01 |
| `npm run progress` | See how many exercises you've passed |
| `npm run solution 04-for-loops/07-count-digits` | Show the reference solution (locked until 3 failed attempts) |
| `npm run reset 04-for-loops/07-count-digits` | Clear progress and restore the empty stub |

---

## The daily routine

| Block | Time | What |
|---|---|---|
| 1. Concept | 30 min | Read the level's `README.md`. Type the examples into `playground/scratch.js` and run them. |
| 2. Drills | 90 min | Work through exercises until they're all green. |
| 3. DSA | 60 min | 2–4 LeetCode problems in JavaScript (Striver A2Z sheet). |
| 4. Review | 20 min | Re-solve one old problem from a blank file. Write 3 lines in `NOTES.md`. |

Run examples in the playground:

```bash
node playground/scratch.js
```

---

## Rules that matter

1. **Type everything.** No copy-paste into exercise files.
2. **15-minute rule.** Stuck for 15 minutes → re-read the level README. Still stuck at 25 minutes → `npm run solution <id>`, read it, close it, delete your attempt, rewrite from memory.
3. **Finish the level before moving on.** The watcher blocks level-skipping by default. Get every exercise green before opening the next level folder.
4. **Write in NOTES.md.** Anything confusing goes under `## Confused about`. Review it every few days.
5. **LeetCode in JavaScript only.** Same language as the drills.

---

## Folder guide

```
levels/          ← your exercise files (work here)
  01-print-and-variables/
  02-operators/
  ... through 15-modules-errors-async/
playground/      ← scratch space, never graded
NOTES.md         ← your learning journal
config.json      ← settings (don't change unless you know why)
progress.json    ← auto-generated, tracks what you've passed
.solutions/      ← reference answers (use only when stuck)
```

Each level folder has a `README.md` with concept explanations. Read it before starting the exercises.

---

## When you're stuck

1. Re-read the level README.
2. Try a smaller version in `playground/scratch.js`.
3. After 25 minutes, unlock the solution: `npm run solution <exercise-id>`
4. Add the confusing part to `NOTES.md`.

---

## Levels overview

| # | Level | Exercises |
|---|---|---|
| 01 | Print & variables | 12 |
| 02 | Operators | 12 |
| 03 | Conditionals | 12 |
| 04 | For loops | 14 |
| 05 | While loops | 10 |
| 06 | Patterns | 16 |
| 07 | Number problems | 14 |
| 08 | Functions | 14 |
| 09 | Strings | 14 |
| 10 | Arrays | 16 |
| 11 | Array methods | 12 |
| 12 | Objects & JSON | 12 |
| 13 | Recursion | 10 |
| 14 | Hashing | 10 |
| 15 | Modules, errors, async | 12 |

**Total: 190 exercises.**

Good luck. Save often.
