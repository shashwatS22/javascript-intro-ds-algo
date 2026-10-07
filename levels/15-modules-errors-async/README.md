# Level 15 — Modules, errors, and async

## What you'll learn
- How to split code into files with `import` and `export`
- How to catch errors with `try` / `catch` / `finally`
- Why JavaScript does not always run lines in the order you write them
- How callbacks, Promises, and `async` / `await` handle work that takes time

## Concepts

### Default export
One file can export a single main thing as the **default**. Another file imports it with any name.

```js
// In helpers/greet.js you would write:
// export default function greet(name) {
//   return `Hello, ${name}!`;
// }

// Here is the same logic in one file so you can run it:
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Ada"));
// Hello, Ada!
```

In your exercises you will create `helpers/greet.js` and import it with:

```text
import greet from "./helpers/greet.js";
```

The `.js` extension is required in this project.

### Named exports
A file can export several named values. Import them inside `{ curly braces }`.

```js
// In helpers/math.js you would write:
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
console.log(add(5, 3));
console.log(subtract(5, 3));
// 8
// 2
```

Import both names like this: `import { add, subtract } from "./helpers/math.js";`

### try / catch
Wrap risky code in `try`. If it throws an error, `catch` runs instead of crashing the program.

```js
try {
  JSON.parse("not json");
} catch {
  console.log("caught an error");
}
console.log("still running");
// caught an error
// still running
```

### throw your own errors
Use `throw` when something invalid happens, like dividing by zero.

```js
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
try {
  divide(10, 0);
} catch (err) {
  console.log(err.message);
}
// Cannot divide by zero
```

### finally
`finally` runs whether the `try` succeeded or failed. Use it for cleanup.

```js
function run(success) {
  try {
    if (success) console.log("try ok");
    else throw new Error("fail");
  } catch {
    console.log("caught");
  } finally {
    console.log("finally");
  }
}
run(true);
run(false);
// try ok
// finally
// caught
// finally
```

### setTimeout and execution order
`setTimeout` schedules work for later. Code after it runs first.

```js
console.log("first");
setTimeout(() => console.log("third"), 0);
console.log("second");
// first
// second
// third
```

Even with `0` milliseconds, the callback waits until the current code finishes.

### Callback style
Before Promises, async work called a function you passed in when done.

```js
function getUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: "Ada" });
  }, 10);
}
getUser(1, (user) => {
  console.log(user.name);
});
// Ada
```

### Promises
A Promise represents a value that will arrive later. `.then` runs on success; `.catch` runs on failure.

```js
const done = new Promise((resolve) => {
  setTimeout(() => resolve("done"), 10);
});
done.then((value) => console.log(value));
// done
```

```js
const failed = new Promise((_, reject) => {
  setTimeout(() => reject("failed"), 10);
});
failed.catch((reason) => console.log(reason));
// failed
```

### async / await
`async` functions can `await` a Promise. The code **looks** sequential but still runs asynchronously.

```js
async function run() {
  const value = await new Promise((resolve) => {
    setTimeout(() => resolve("done"), 10);
  });
  console.log(value);
}
await run();
// done
```

### Promise.all
Wait for several Promises at once. You get an array of all results.

```js
const p1 = new Promise((r) => setTimeout(() => r(1), 30));
const p2 = new Promise((r) => setTimeout(() => r(2), 10));
const p3 = new Promise((r) => setTimeout(() => r(3), 20));
const all = await Promise.all([p1, p2, p3]);
console.log(all.join(" "));
// 1 2 3
```

### Reading a file with fs/promises
Node can read files without blocking your program. Use `await` with `readFile`.

```js
import { readFile } from "node:fs/promises";
const text = await readFile("levels/15-modules-errors-async/data/sample.txt", "utf8");
console.log(text.trim());
// hello from a file
```

## Common mistakes
- Forgetting `.js` on import paths — Node ESM requires the full file name.
- Using `await` outside an `async` function — wrap it in `async function main() { ... }` or use top-level await in a module.
- Assuming `setTimeout(fn, 0)` runs immediately — it always waits until current code finishes.
- Ignoring rejected Promises — always add `.catch` or use `try` / `catch` with `await`.

## Before you start
Type every example above into `playground/scratch.js` and run it. For modules, create small helper files and import them — that is the same pattern React and Next.js use.

## Exercises
Work through `01-` to `12-` in order. Save each file to check it. Exercises 1 and 2 ask you to create helper files in `helpers/`.
