# Level 05 — While loops

## What you'll learn
- How to repeat code while a condition stays true with `while`
- How to strip digits from a number until it becomes 0
- How to solve problems where you don't know the trip count ahead of time
- How `do...while` runs the body at least once
- How to use Euclid's algorithm and the Collatz sequence

## Concepts

### The `while` loop

A `while` loop checks a condition **before** each trip. If the condition is false from the start, the body never runs:

```js
let i = 1;
const n = 3;
while (i <= n) {
  console.log(i);
  i++;
}
// 1
// 2
// 3
```

You must change something inside the body (here `i++`) or the condition never becomes false and the loop runs forever.

### Sum of digits with `while`

Keep taking the last digit with `% 10`, then remove it with `Math.floor(n / 10)`:

```js
let n = 482;
let sum = 0;
while (n > 0) {
  sum += n % 10;
  n = Math.floor(n / 10);
}
console.log(sum);
// 14
```

When `n` reaches 0, the loop stops.

### Reverse a number with `while`

```js
let n = 908;
let reversed = 0;
while (n > 0) {
  reversed = reversed * 10 + (n % 10);
  n = Math.floor(n / 10);
}
console.log(reversed);
// 809
```

### Palindrome check

A number reads the same forwards and backwards. Compare the original to its reverse:

```js
const original = 121;
let n = original;
let reversed = 0;
while (n > 0) {
  reversed = reversed * 10 + (n % 10);
  n = Math.floor(n / 10);
}
console.log(original === reversed ? "palindrome" : "not palindrome");
// palindrome
```

### Armstrong number

An Armstrong number equals the sum of its digits each raised to the power of the digit count. For 153: `1³ + 5³ + 3³ = 153`.

```js
const original = 153;
let n = original;
let sum = 0;
let digits = 0;
let temp = original;
while (temp > 0) {
  digits++;
  temp = Math.floor(temp / 10);
}
n = original;
while (n > 0) {
  const d = n % 10;
  sum += d ** digits;
  n = Math.floor(n / 10);
}
console.log(sum === original ? "armstrong" : "not armstrong");
// armstrong
```

### GCD with Euclid's algorithm

The greatest common divisor of two numbers is the largest number that divides both. Euclid's method replaces the larger number with the remainder until one number becomes 0:

```js
let a = 48;
let b = 18;
while (b !== 0) {
  const remainder = a % b;
  a = b;
  b = remainder;
}
console.log(a);
// 6
```

### Count digits

```js
let n = 1000;
let count = 0;
while (n > 0) {
  count++;
  n = Math.floor(n / 10);
}
console.log(count);
// 4
```

### Convert to binary

Repeatedly divide by 2 and collect remainders. Read them in reverse order:

```js
let n = 5;
let bits = "";
while (n > 0) {
  bits = (n % 2) + bits;
  n = Math.floor(n / 2);
}
console.log(bits);
// 101
```

Prepending each remainder builds the bits left-to-right.

### do...while — body runs at least once

`do...while` checks the condition **after** the body:

```js
let n = 0;
do {
  console.log("ran once");
} while (n > 0);
console.log("loop finished");
// ran once
// loop finished
```

Even though `n > 0` is false, the body already ran once.

### Collatz steps

If n is even, divide by 2. If odd, replace with `3n + 1`. Count steps until you reach 1:

```js
let n = 6;
let steps = 0;
while (n !== 1) {
  if (n % 2 === 0) {
    n = n / 2;
  } else {
    n = 3 * n + 1;
  }
  steps++;
}
console.log(steps);
// 8
```

For `n = 6`: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 (8 steps).

## Common mistakes
- **Infinite loops.** If the condition never becomes false, the grader times out. Always move toward the exit inside the body.
- **Forgetting to copy the original number.** Palindrome and Armstrong checks need the starting value after the loop modifies `n`.
- **Wrong binary order.** `bits = (n % 2) + bits` prepends each bit. Appending without reversing gives digits backwards.
- **Using `while` when a `for` loop is simpler.** If you know exactly how many times to repeat, a `for` loop is often clearer. Use `while` when the trip count depends on the data.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-while-count.js` to `10-collatz.js` in order. Save each file to check it.
