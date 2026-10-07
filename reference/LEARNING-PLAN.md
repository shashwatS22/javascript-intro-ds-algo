# Zero to Next.js — A Full-Time Learning Plan

**Audience:** a beginner who can already write `console.log`, a `for` loop, and an `if`, but nothing beyond that.
**Commitment:** 3+ hours/day, ~5–6 days a week.
**End state:** comfortable in JavaScript → TypeScript → React → Next.js, with a working DSA foundation on LeetCode.

There are two documents:

| File | Who it's for |
|---|---|
| `LEARNING-PLAN.md` (this file) | You and her — the roadmap, the routine, what to learn when |
| `CURSOR-BUILD-SPEC.md` | Hand this to Cursor — it builds the practice repo, all 190 exercises, and the auto-grader |

---

## 1. The core idea

She gets one repo (`js-bootcamp`) running locally. It's a Node project with a file watcher. She opens an exercise file, writes code, hits save, and the terminal immediately tells her **PASS** or **FAIL** with a line-by-line diff against the expected output.

That's the whole loop. No setup friction, no "did I run it right", no waiting for feedback. Save → verdict → fix → save.

**Two parallel tracks run every day:**

- **Track A — Drills (the repo).** 190 auto-graded exercises across 15 levels. This is where she learns the *language*.
- **Track B — DSA (LeetCode).** Problems from Striver's A2Z sheet, solved on LeetCode in JavaScript. This is where she learns to *think*.

Track A always stays ahead of Track B. She never gets a LeetCode problem that needs syntax she hasn't drilled.

---

## 2. Daily routine (3.5 hours)

| Block | Time | What |
|---|---|---|
| 1. Concept | 30 min | Read the level's `README.md` in the repo, type out the examples in `playground/scratch.js`. Typing, not copy-pasting. |
| 2. Drills | 90 min | Work through that level's exercises until they're green. |
| 3. DSA | 60 min | 2–4 LeetCode problems from the current Striver section. |
| 4. Review | 20 min | Re-solve one problem from 2 days ago **from a blank file**. Then write 3 lines in `NOTES.md` about what tripped her up. |

The review block is the one people skip and it's the one that makes it stick. Don't skip it.

### Rules that matter

1. **No copy-paste into exercise files.** Type everything.
2. **15-minute rule.** Stuck for 15 min on a drill → read the level README again. Still stuck at 25 min → `npm run solution <id>`, read it, close it, delete her attempt, and rewrite it from memory.
3. **Never move to the next level until the current one is 100% green.** The runner enforces this by default (`strictProgression: true` in config).
4. **LeetCode uses JavaScript**, not any other language. Consistency beats variety at this stage.
5. **One "concept debt" list.** Anything she doesn't understand goes into `NOTES.md` under `## Confused about`. You review that list with her every few days. This is your main job as the teacher.

---

## 3. Phase overview

| Phase | Weeks | What | Deliverable |
|---|---|---|---|
| **1. JavaScript** | 1–4 | 15 levels, 190 drills. Variables → recursion → hashing → async. | All levels green |
| **2. DSA foundation** | 1–6 (parallel) | Striver Step 1 & 2 on LeetCode | ~60 problems solved |
| **3. TypeScript** | 5–6 | Types, interfaces, generics. Re-do 30 JS drills in TS. | `ts-drills/` green |
| **4. Web fundamentals** | 7–8 | HTML, CSS, the DOM, fetch, browser dev tools | 2 static pages + 1 DOM app |
| **5. React** | 9–11 | Components, props, state, effects, forms, lists | 3 small apps |
| **6. Next.js** | 12–16 | App Router, server components, routing, data, API routes, DB, auth, deploy | 1 deployed full-stack app |

**A note on Phase 4:** you didn't mention HTML/CSS/DOM, but jumping from Node into Next.js without them is the single most common way this kind of plan stalls. React is a way of producing HTML; if she doesn't know what a `<div>`, a flexbox, or an event listener is, React becomes memorisation. Two weeks here saves a month later. If you want to compress, cut it to one week and skip CSS animation/grid depth — but don't skip it entirely.

---

## 4. Phase 1 in detail — the 15 levels

Each level in the repo has a `README.md` you write once (Cursor drafts it) covering the concept, then the exercises. Here's what each level teaches and what it unlocks.

| # | Level | Drills | Concepts taught | Unlocks on LeetCode |
|---|---|---|---|---|
| 01 | Print & Variables | 12 | `console.log`, `let`/`const`, types, template literals, `typeof` | — |
| 02 | Operators | 12 | arithmetic, `%`, `==` vs `===`, logical ops, ternary, `Math.*` | — |
| 03 | Conditionals | 12 | `if`/`else if`/`else`, `switch`, truthy/falsy | Striver Lec 1 basics |
| 04 | For loops | 14 | `for`, accumulators, `break`/`continue`, loop-based number work | FizzBuzz, simple sums |
| 05 | While loops | 10 | `while`, `do...while`, digit extraction via `%` and `/` | — |
| 06 | Nested loops & patterns | 16 | loops inside loops, row/column thinking | Striver Lec 2 (22 patterns) |
| 07 | Number problems | 14 | primes, divisors, GCD, Armstrong, palindrome numbers | **Striver Lec 4 — Basic Maths** |
| 08 | Functions | 14 | declarations, arrows, params, return, scope, closures, callbacks | Refactoring all prior work |
| 09 | Strings | 14 | indexing, immutability, all core string methods | Striver Strings (basic) |
| 10 | Arrays | 16 | indexing, mutation methods, traversal, search, rotation | **Striver Step 3 — Arrays (easy)** |
| 11 | Array HOFs | 12 | `map`, `filter`, `reduce`, `find`, `sort`, `some`/`every` | Cleaner LeetCode solutions |
| 12 | Objects & JSON | 12 | key access, nesting, destructuring, spread, `JSON.*` | Data-shaped problems |
| 13 | Recursion | 10 | base case, recursive case, call stack | **Striver Lec 5 — Recursion** |
| 14 | Hashing | 10 | `Map`, `Set`, frequency counting, `O(1)` lookup | **Striver Lec 6 — Hashing**, Two Sum |
| 15 | Modules, errors, async | 12 | `import`/`export`, `try`/`catch`, Promises, `async`/`await`, `fs` | Required for React/Next.js |

**Total: 190 exercises.**

The full exercise list — every file name, task, fixed inputs, and expected output — is in `CURSOR-BUILD-SPEC.md` § 8.

### Suggested pacing (full-time)

| Days | Levels |
|---|---|
| 1–2 | 01, 02 |
| 3–4 | 03, 04 |
| 5–6 | 05, 06 |
| 7–8 | 07 |
| 9–10 | 08 |
| 11–12 | 09 |
| 13–15 | 10, 11 |
| 16–17 | 12 |
| 18–19 | 13 |
| 20–21 | 14 |
| 22–24 | 15 + full review |

Level 06 (patterns) and level 13 (recursion) are the two walls. Expect her to slow down there. That's normal — patterns build spatial loop reasoning and recursion breaks people's mental model. Budget extra time, don't rush them.

---

## 5. Track B — the Striver A2Z mapping

Source: <https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z>

She reads the problem on the Striver sheet, then solves it **on LeetCode in JavaScript**. Striver's videos are in C++/Java — that's fine, the logic transfers. Only the syntax differs, and by then she'll know the syntax.

| Order | Striver section | Start after repo level | Approx. problems |
|---|---|---|---|
| 1 | Step 1, Lec 1 — Language basics | 03 | Covered by drills |
| 2 | Step 1, Lec 2 — Patterns (22) | 06 | 22 |
| 3 | Step 1, Lec 4 — Basic Maths | 07 | 7 |
| 4 | Step 1, Lec 5 — Basic Recursion | 13 | 9 |
| 5 | Step 1, Lec 6 — Basic Hashing | 14 | 3 |
| 6 | Step 2 — Sorting techniques | 13 | 7 |
| 7 | Step 3 — Arrays (Easy) | 10 | ~14 |
| 8 | Step 3 — Arrays (Medium) | 14 | ~14 |
| 9 | Step 4 — Binary Search (1D) | after Phase 1 | ~13 |
| 10 | Step 5 — Strings (Basic) | 09 | ~7 |

**Target by end of Phase 1: ~60 problems.** Steps 2 and 3 are the first real algorithmic work — she should still be on those when Phase 3 (TypeScript) begins. DSA continues in the background for months; it does not need to finish before web development starts.

### LeetCode discipline

- Time-box every problem to 30 minutes. Then look at the editorial, understand it, close it, and write it from scratch.
- After solving, write the approach in one plain-English sentence in `NOTES.md`. If she can't, she didn't solve it — she guessed.
- Re-solve any problem she needed help with, 3 days later.

---

## 6. Phase 3 — TypeScript (outline)

Do not treat TS as a new language. It's JavaScript plus annotations, and she'll already know the JavaScript.

**Setup:** a `ts-drills/` folder in the same repo. Same watcher, same PASS/FAIL loop, `tsx` instead of `node`. `strict: true` from day one — learning TS with `strict: false` teaches the wrong habits.

**Topics, in order:**

1. Why types exist — a bug demo she can feel
2. Primitive annotations: `string`, `number`, `boolean`, `null`, `undefined`
3. Arrays and tuples: `number[]`, `[string, number]`
4. Object types and `interface`
5. `type` aliases; `type` vs `interface`
6. Union and literal types (`"admin" | "user"`)
7. Optional properties, `readonly`
8. Function types: parameter and return annotations
9. `any` vs `unknown` vs `never` — and why `any` is a smell
10. Type narrowing: `typeof`, `in`, truthiness guards
11. Generics: `Array<T>`, then writing her own `identity<T>`
12. Utility types: `Partial`, `Pick`, `Omit`, `Record`
13. Enums (and why literal unions are usually better)
14. `tsconfig.json` — what the flags mean
15. Reading and fixing real compiler errors

**Practice:** re-do 30 chosen JS drills (levels 08–14) with full type annotations. Same expected outputs, so the grader is reused as-is. Then convert 5 LeetCode solutions to TS.

**Duration:** 8–10 days full-time.

---

## 7. Phase 4 — Web fundamentals (outline)

1. HTML: semantic structure, forms, attributes, accessibility basics
2. CSS: box model, flexbox, grid, positioning, responsive units, one component library-free layout built by hand
3. DOM: `querySelector`, event listeners, creating and removing elements
4. `fetch` and a public JSON API
5. Browser dev tools: elements panel, console, network tab

**Projects:** a personal profile page (HTML/CSS only), then a to-do app in vanilla JS with DOM manipulation, then a page that fetches and renders data from an API.

**Duration:** 8–12 days.

---

## 8. Phase 5 — React (outline)

1. Why components; JSX and how it differs from HTML
2. Props and one-way data flow
3. `useState` — the mental model of re-rendering
4. Conditional rendering, lists, `key`
5. Events and controlled form inputs
6. `useEffect` and cleanup
7. Lifting state up; composition over prop drilling
8. `useRef`, `useMemo` (lightly)
9. Custom hooks
10. Fetching data, loading/error states

**Projects:** counter → to-do app → a search-and-filter app against a real API.

**Duration:** ~3 weeks.

---

## 9. Phase 6 — Next.js (outline)

1. App Router: `app/`, `page.tsx`, `layout.tsx`, file-based routing
2. Server Components vs Client Components — the `"use client"` boundary
3. Dynamic routes and route params
4. Data fetching in server components; caching and revalidation
5. Server Actions and forms
6. Route Handlers (`app/api/.../route.ts`)
7. `loading.tsx`, `error.tsx`, Suspense
8. `next/image`, `next/link`, metadata
9. Styling: Tailwind
10. Database: Postgres + Prisma or Drizzle
11. Auth: Auth.js
12. Deploy on Vercel; environment variables

**Capstone:** one full-stack app she designs — auth, a database, CRUD, deployed and shareable. Something she actually wants to exist, not a tutorial clone. Motivation matters more than scope here.

**Duration:** 4–5 weeks.

---

## 10. Milestones — how to know she's ready to move on

| Gate | Test |
|---|---|
| Leave Phase 1 | All 190 drills green. Can write "count vowels in a string" and "find second largest in an array" from a blank file, no reference, in under 5 minutes each. |
| Leave Phase 3 | Can annotate an unannotated JS file and get zero `any`s. Can read a TS error and explain what it means. |
| Leave Phase 4 | Can build a responsive two-column layout from a screenshot without looking up flexbox. |
| Leave Phase 5 | Can build a filterable list from an API, from scratch, in one sitting. |
| Done | The capstone is deployed, and she can explain every file in it. |

---

## 11. Your job in this

The repo handles correctness. It cannot handle the things that actually cause beginners to quit.

- **Review `NOTES.md` every 2–3 days.** The "Confused about" list is your teaching agenda.
- **Explain *why*, not *how*.** When she asks about `===`, don't give the rule — show her a bug it causes.
- **Let her struggle for 15 minutes.** Rescuing too early is the most common way well-meaning teachers slow someone down.
- **Celebrate green levels.** 190 exercises is a long grind; visible progress is what carries people through week 3.
- **Don't add topics ahead of schedule** because they seem interesting. The ordering here is deliberate — every level only needs things from earlier levels.
