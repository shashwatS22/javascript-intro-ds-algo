# Level 03 — Conditionals

## What you'll learn
- How to run code only when a condition is true with `if` / `else`
- How to chain multiple checks with `else if`
- How to pick an action with `switch`
- How to combine conditions with `&&` and `||`
- How to solve classic decision problems (grades, leap years, FizzBuzz)

## Concepts

### if / else

Run one block when a condition is true, another when it is false:

```js
const n = -14;
if (n > 0) {
  console.log("positive");
} else if (n < 0) {
  console.log("negative");
} else {
  console.log("zero");
}
// negative
```

The condition inside `()` must be something that becomes `true` or `false`.

### Even or odd

Use the remainder operator `%` from Level 02. A number is even when `n % 2 === 0`:

```js
const n = 27;
if (n % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}
// odd
```

### Comparing two values

```js
const a = 34;
const b = 34;
if (a > b) {
  console.log(a);
} else if (b > a) {
  console.log(b);
} else {
  console.log("equal");
}
// equal
```

### else if chains

Check conditions top to bottom. The first true branch runs, then the rest are skipped:

```js
const marks = 73;
if (marks >= 90) {
  console.log("A");
} else if (marks >= 75) {
  console.log("B");
} else if (marks >= 60) {
  console.log("C");
} else if (marks >= 40) {
  console.log("D");
} else {
  console.log("F");
}
// C
```

### Leap year logic

A year is a leap year when it is divisible by 4, **unless** it is divisible by 100, **unless** it is also divisible by 400:

```js
const year = 2100;
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log("leap");
} else {
  console.log("not leap");
}
// not leap
```

2100 is divisible by 4 and by 100, but not by 400 — so it is not a leap year.

### Checking a single character

```js
const ch = "u";
if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
  console.log("vowel");
} else {
  console.log("consonant");
}
// vowel
```

### switch

When you compare one value against many fixed options, `switch` can be clearer:

```js
const day = 6;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("invalid day");
}
// Saturday
```

Each `case` needs `break` unless you want fall-through to the next case.

### switch for a calculator

```js
const a = 12;
const b = 4;
const op = "/";
switch (op) {
  case "+":
    console.log(a + b);
    break;
  case "-":
    console.log(a - b);
    break;
  case "*":
    console.log(a * b);
    break;
  case "/":
    console.log(a / b);
    break;
  default:
    console.log("unknown operator");
}
// 3
```

### Combining conditions with &&

Both sides must be true:

```js
const age = 17;
const isCitizen = true;
if (age >= 18 && isCitizen) {
  console.log("can vote");
} else {
  console.log("cannot vote");
}
// cannot vote
```

### Triangle validity

Three sides form a valid triangle only when each pair's sum is greater than the third side:

```js
const a = 3;
const b = 4;
const c = 8;
if (a + b > c && b + c > a && c + a > b) {
  console.log("valid");
} else {
  console.log("invalid");
}
// invalid
```

Here `3 + 4` is `7`, which is not greater than `8`.

### FizzBuzz for one number

```js
const n = 15;
if (n % 15 === 0) {
  console.log("FizzBuzz");
} else if (n % 3 === 0) {
  console.log("Fizz");
} else if (n % 5 === 0) {
  console.log("Buzz");
} else {
  console.log(n);
}
// FizzBuzz
```

Check divisible by both 3 and 5 first (that means divisible by 15).

## Common mistakes
- **Using `=` instead of `===`.** `if (n = 5)` assigns 5 to `n` instead of comparing. Use `===` for checks.
- **Forgetting `break` in switch.** Without `break`, execution falls through to the next case and may print extra lines.
- **Checking FizzBuzz in the wrong order.** Test `% 15 === 0` before `% 3` or `% 5`, or you'll print `Fizz` or `Buzz` instead of `FizzBuzz`.
- **Missing braces on multi-line blocks.** Always wrap the body in `{ }` even for one line — it prevents bugs when you add a second line later.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-sign.js` to `12-fizzbuzz-one.js` in order. Save each file to check it.
