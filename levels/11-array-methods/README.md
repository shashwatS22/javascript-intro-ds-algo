# Level 11 — Array methods

## What you'll learn
- How to use `forEach`, `map`, `filter`, and `reduce` instead of hand-written loops
- How to find items with `find` and test conditions with `some` and `every`
- How to sort arrays the right way
- How to chain methods together

## Concepts

### forEach
Runs a function once for each item. Good for side effects like printing.

```js
const arr = [10, 20, 30];
arr.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});
// 0: 10
// 1: 20
// 2: 30
```

### map
Builds a **new** array by transforming each item.

```js
const arr = [1, 2, 3, 4];
const doubled = arr.map((n) => n * 2);
console.log(doubled.join(" "));
// 2 4 6 8
```

### filter
Builds a **new** array with only the items that pass a test.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = arr.filter((n) => n % 2 === 0);
console.log(evens.join(" "));
// 2 4 6 8 10
```

The `%` operator gives you the remainder after division. `n % 2 === 0` means "n is even".

### reduce
Combines all items into one value — a sum, a max, or anything you build step by step.

```js
const arr = [5, 10, 15];
const sum = arr.reduce((total, n) => total + n, 0);
console.log(sum);
// 30
```

The second argument `0` is the starting value.

### find
Returns the **first** item that matches. Returns `undefined` if nothing matches.

```js
const arr = [3, 8, 12, 5];
const found = arr.find((n) => n > 7);
const index = arr.findIndex((n) => n > 7);
console.log(found);
console.log(index);
// 8
// 1
```

### some and every
`some` asks "does at least one item pass?" `every` asks "do they all pass?"

```js
const isOdd = (n) => n % 2 !== 0;
const arr = [2, 4, 6, 7];
console.log(arr.some(isOdd));
console.log(arr.every((n) => n % 2 === 0));
// true
// false
```

### Sorting numbers
Plain `.sort()` treats numbers like strings, so `10` comes before `2`. Pass a compare function instead.

```js
const arr = [10, 9, 100, 2];
const asc = [...arr].sort((a, b) => a - b);
const desc = [...arr].sort((a, b) => b - a);
console.log(asc.join(" "));
console.log(desc.join(" "));
// 2 9 10 100
// 100 10 9 2
```

The spread `[...arr]` makes a copy so the original stays unchanged.

### Chaining methods
Each method returns a new array (or a value from `reduce`), so you can chain them.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = arr
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .reduce((sum, n) => sum + n, 0);
console.log(result);
// 220
```

### Immutability
`map` does not change the original array. It returns a new one.

```js
const arr = [1, 2, 3];
const mapped = arr.map((n) => n * 2);
console.log(mapped.join(" "));
console.log(arr.join(" "));
// 2 4 6
// 1 2 3
```

## Common mistakes
- Forgetting the starting value in `reduce` — without `0`, the first item becomes the start and addition can break.
- Using `.sort()` on numbers without a compare function — you get `"10"` before `"2"`.
- Expecting `filter` or `map` to change the original — they always return a new array.
- Using `forEach` when you need a new array — use `map` or `filter` instead.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-` to `12-` in order. Save each file to check it.
