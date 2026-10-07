# Level 04 — For loops

## What you'll learn
- How to repeat code a fixed number of times with a `for` loop
- How to count up, count down, and step by 2
- How to build a running total inside a loop
- How to work with digits of a number using `%` and `/`
- How to solve classic loop problems (factorial, Fibonacci, FizzBuzz)

## Concepts

### The `for` loop

A `for` loop repeats a block of code while a counter changes:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
// 1
// 2
// 3
```

The three parts inside `()` do different jobs:
1. `let i = 1` — start the counter at 1
2. `i <= 3` — keep going while this is true
3. `i++` — add 1 to `i` after each repetition

### What `i++` means

`i++` is shorthand for "add 1 to `i`". It runs at the **end** of each loop trip, after the body finishes.

So when `i` is 1, the body prints 1, then `i++` makes `i` become 2. When `i` is 3, the body prints 3, then `i++` makes `i` become 4. Now `4 <= 3` is false, so the loop stops.

### Counting down

Change the start, the condition, and the step:

```js
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
// 10
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
```

`i--` subtracts 1 each time (the opposite of `i++`).

### Even numbers with step 2

```js
for (let i = 2; i <= 6; i += 2) {
  console.log(i);
}
// 2
// 4
// 6
```

`i += 2` means "add 2 to `i`" each time.

### Building a sum

Start a total at 0 and add each number:

```js
let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(sum);
// 15
```

### Factorial

Multiply every number from 1 to n:

```js
const n = 4;
let result = 1;
for (let i = 1; i <= n; i++) {
  result *= i;
}
console.log(result);
// 24
```

`4 × 3 × 2 × 1 = 24`.

### Working with digits

To get the last digit, use `% 10`. To remove the last digit, use `Math.floor(n / 10)`:

```js
let n = 748;
let count = 0;
for (let temp = n; temp > 0; temp = Math.floor(temp / 10)) {
  count++;
}
console.log(count);
// 3
```

Each trip through the loop removes one digit until `temp` becomes 0.

To sum digits with the same idea:

```js
let n = 937;
let digitSum = 0;
for (let temp = n; temp > 0; temp = Math.floor(temp / 10)) {
  digitSum += temp % 10;
}
console.log(digitSum);
// 19
```

Each trip adds the last digit (`temp % 10`), then removes it.

### Reversing a number

Build a new number digit by digit:

```js
let n = 123;
let reversed = 0;
for (let temp = n; temp > 0; temp = Math.floor(temp / 10)) {
  reversed = reversed * 10 + (temp % 10);
}
console.log(reversed);
// 321
```

### Power without `**`

Multiply `base` by itself `exp` times:

```js
const base = 3;
const exp = 4;
let result = 1;
for (let i = 0; i < exp; i++) {
  result *= base;
}
console.log(result);
// 81
```

### Fibonacci sequence

Each number is the sum of the two before it, starting with 0 and 1:

```js
const n = 6;
let a = 0;
let b = 1;
for (let i = 0; i < n; i++) {
  console.log(a);
  const next = a + b;
  a = b;
  b = next;
}
// 0
// 1
// 1
// 2
// 3
// 5
```

### FizzBuzz with a loop

```js
for (let i = 1; i <= 6; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
```

### Looping over a string

Strings have an `.length` property. You can read character `i` with `s[i]`:

```js
const s = "hi";
let vowels = 0;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
    vowels++;
  }
}
console.log(vowels);
// 1
```

## Common mistakes
- **Off-by-one errors.** `i <= 10` includes 10. `i < 10` stops at 9. Read the task carefully.
- **Using the wrong step.** To count evens, start at 2 and use `i += 2`. Starting at 1 and adding 2 each time gives odd numbers.
- **Forgetting to update the counter inside the body.** In a normal `for` loop, `i++` in the header handles this. If you write a manual loop, you must change the counter yourself or it runs forever.
- **Modifying the original number when you need it later.** Copy to a temp variable (`let temp = n`) when stripping digits so you don't lose the starting value.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-one-to-ten.js` to `14-count-vowels.js` in order. Save each file to check it.
