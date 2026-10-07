# Level 13 — Recursion

## What you'll learn
- What recursion means — a function that calls itself
- How to write a base case so recursion stops
- How to trace a call stack step by step
- How to solve sum, factorial, reverse, palindrome, Fibonacci, power, and digit-sum problems recursively

## Concepts

### What is recursion?
Recursion means a function calls itself with a smaller or simpler problem until it hits a **base case** — a condition where it stops and returns a value directly.

Think of it like nested Russian dolls: open one, and inside is a smaller one, until you reach the smallest doll that does not open.

### A simple recursive print
No loops — the function prints once, then calls itself with one fewer repetition.

```js
function printTimes(word, n) {
  if (n === 0) return;
  console.log(word);
  printTimes(word, n - 1);
}
printTimes("learning", 3);
// learning
// learning
// learning
```

The base case is `n === 0`. Without it, the function would call itself forever.

### Print 1 to n
Call yourself with `n - 1` first, then print `n`. That prints in ascending order.

```js
function printOneToN(n) {
  if (n === 0) return;
  printOneToN(n - 1);
  console.log(n);
}
printOneToN(5);
// 1
// 2
// 3
// 4
// 5
```

### Print n down to 1
Print first, then call yourself. That prints in descending order.

```js
function printNToOne(n) {
  if (n === 0) return;
  console.log(n);
  printNToOne(n - 1);
}
printNToOne(5);
// 5
// 4
// 3
// 2
// 1
```

### Sum from 1 to n
The recursive idea: `sumTo(n)` = `n + sumTo(n - 1)`. The base case is `sumTo(0) = 0`.

```js
function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1);
}
console.log(sumTo(5));
// 15
```

### Factorial
`factorial(n)` means `n × (n-1) × … × 1`. By definition, `factorial(0) = 1`.

```js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(4));
// 24
```

### Call-stack trace for `factorial(4)`
When you call `factorial(4)`, JavaScript pauses each call and waits for the next one to finish. Here is the full line-by-line trace:

```
factorial(4)                         → 4 * factorial(3)   // not done yet, must wait
  factorial(3)                       → 3 * factorial(2)   // not done yet, must wait
    factorial(2)                     → 2 * factorial(1)   // not done yet, must wait
      factorial(1)                   → 1 * factorial(0)   // not done yet, must wait
        factorial(0)                 → 1                  // base case! returns 1
      factorial(1)                   → 1 * 1 = 1          // returns 1
    factorial(2)                     → 2 * 1 = 2          // returns 2
  factorial(3)                       → 3 * 2 = 6          // returns 6
factorial(4)                         → 4 * 6 = 24         // returns 24
```

The calls go **down** (4 → 3 → 2 → 1 → 0). The answers come back **up** (1 → 1 → 2 → 6 → 24). That up-and-down movement is the call stack.

### Reverse an array recursively
Take the first item, recursively reverse the rest, then put the first item at the end.

```js
function reverse(arr) {
  if (arr.length === 0) return [];
  return [...reverse(arr.slice(1)), arr[0]];
}
console.log(reverse([1, 2, 3]).join(" "));
// 3 2 1
```

### Fibonacci recursively
`fib(0) = 0`, `fib(1) = 1`, and every later number is the sum of the two before it.

```js
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(6));
// 8
```

## Common mistakes
- Forgetting the base case — the function calls itself forever and you get a stack overflow error.
- Returning nothing in the base case — always `return` a value when recursion should stop.
- Making the problem the same size — each call must move toward the base case (smaller `n`, shorter array, etc.).
- Using recursion when a simple loop is enough — loops are fine for printing; recursion shines when the problem naturally shrinks.

## Before you start
Type every example above into `playground/scratch.js` and run it. Trace `factorial(4)` on paper before you run it. Say each line out loud: "4 waits for 3, 3 waits for 2…"

## Exercises
Work through `01-` to `10-` in order. Save each file to check it. Exercises 4–10 export functions and are checked by tests instead of printed output.
