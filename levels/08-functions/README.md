# Level 08 — Functions

## What you'll learn
- How to wrap reusable code in a function
- How to write arrow functions and default parameters
- How to return a value vs printing it
- How to pass a function as an argument (callback)
- How closures remember values between calls

## Concepts

### Function declaration

A function is a named block of code you can call many times:

```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
// 5
```

`return` sends a value back to whoever called the function.

### Arrow function

A shorter syntax. When the body is one expression, you can skip `return`:

```js
const multiply = (a, b) => a * b;
console.log(multiply(4, 5));
// 20
```

### Default parameters

If the caller skips an argument, the default is used:

```js
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
console.log(greet("Ada"));
console.log(greet("Ada", "Hi"));
// Hello, Ada!
// Hi, Ada!
```

### Return a boolean

```js
function isEven(n) {
  return n % 2 === 0;
}
console.log(isEven(4));
console.log(isEven(7));
// true
// false
```

### Return an object

```js
function minMax(numbers) {
  let min = numbers[0];
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) min = numbers[i];
    if (numbers[i] > max) max = numbers[i];
  }
  return { min, max };
}
const result = minMax([3, 9, 2]);
console.log(result.min);
console.log(result.max);
// 2
// 9
```

An array `[...]` holds a list of values. `.length` is how many items it has.

### Rest parameters — any number of arguments

`...numbers` collects all arguments into an array:

```js
function sum(...numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}
console.log(sum(1, 2, 3));
console.log(sum());
// 6
// 0
```

### Passing a function to another function

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}
function double(x) {
  return x * 2;
}
console.log(applyTwice(double, 3));
// 12
```

`double(3)` is 6. `double(6)` is 12.

### A function that returns a function

```js
function makeMultiplier(n) {
  return (x) => x * n;
}
const triple = makeMultiplier(3);
console.log(triple(4));
// 12
```

### Return vs console.log

Returning gives a value to the caller. Logging only prints — the caller gets `undefined`:

```js
function returnsFive() {
  return 5;
}
function logsFive() {
  console.log(5);
}
console.log(returnsFive());
console.log(logsFive());
// 5
// 5
// undefined
```

The first `5` is printed by your outer `console.log(returnsFive())`. The second `5` is printed inside `logsFive`. The third line is `undefined` because `logsFive` returns nothing.

### Spread when calling a function

`...` spreads an array into separate arguments:

```js
const nums = [4, 9, 2];
console.log(Math.max(...nums));
// 9
```

Without spread, `Math.max(nums)` would not work — it expects individual numbers.

### Callback — call a function repeatedly

```js
function repeat(times, callback) {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
}
repeat(3, (i) => {
  console.log(`step ${i}`);
});
// step 0
// step 1
// step 2
```

The second argument is a function. You call it inside `repeat` with each index.

### IIFE — run immediately

An Immediately Invoked Function Expression runs as soon as it is defined:

```js
(function () {
  console.log("ran immediately");
})();
// ran immediately
```

The `( )` at the end calls the function right away.

### Block scope

Variables declared with `let` inside `{ }` exist only in that block:

```js
if (true) {
  let inner = "block";
  console.log(inner);
}
let outer = "function";
console.log(outer);
// block
// function
```

Printing `inner` outside the block would throw an error — it does not exist there.

### Closure — a function that remembers

A closure is an inner function that still sees variables from the outer function, even after the outer function finishes:

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
// 1
// 2
// 3
```

Each call to `counter()` reads and updates the same `count` variable.

### Test-graded exercises

Exercises `01-add.js` through `08-make-multiplier.js` use automated tests instead of printed output. Your file must **export** the function the stub describes. The function itself looks like this:

```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
// 5
```

In your exercise file, put the word `export` before `function` so tests can import it: `export function add(a, b) { ... }`.

Run `npm run check 08-functions/01-add` to see if your function passes all tests.

## Common mistakes
- **Using `console.log` instead of `return`.** Test-graded exercises check the return value. Logging alone will fail.
- **Forgetting `export`.** Test files import your function. Without `export`, the import fails.
- **Arrow function with `{ }` but no return.** `(a, b) => { a + b }` returns nothing. Use `(a, b) => a + b` or add `return`.
- **Calling a function without `()`.** `console.log(add)` prints the function itself, not the result. Write `add(2, 3)`.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-add.js` to `14-closure-counter.js` in order. Exercises 1–8 are test-graded — save each file and run `npm run check <id>` or use `npm run dev`. Exercises 9–14 are output-graded like earlier levels.
