# Level 07 — Number problems

## What you'll learn
- How to count, reverse, and check properties of digits
- How to find all divisors of a number
- How to test for prime numbers efficiently
- How to compute GCD and LCM
- How to factor numbers and count digit frequencies

## Concepts

### Count digits

Strip one digit at a time until the number is 0:

```js
let n = 946;
let count = 0;
for (let temp = n; temp > 0; temp = Math.floor(temp / 10)) {
  count++;
}
console.log(count);
// 3
```

### Reverse a number

Leading zeros disappear when stored as a number — `700` reversed is `7`, not `007`:

```js
let n = 700;
let reversed = 0;
for (let temp = n; temp > 0; temp = Math.floor(temp / 10)) {
  reversed = reversed * 10 + (temp % 10);
}
console.log(reversed);
// 7
```

### Palindrome check

Compare the original to its reverse:

```js
const n = 1221;
let temp = n;
let reversed = 0;
for (; temp > 0; temp = Math.floor(temp / 10)) {
  reversed = reversed * 10 + (temp % 10);
}
console.log(n === reversed);
// true
```

### Armstrong number check

Raise each digit to the power of the digit count and sum:

```js
const n = 371;
let temp = n;
let digits = 0;
for (let t = n; t > 0; t = Math.floor(t / 10)) {
  digits++;
}
let sum = 0;
temp = n;
for (; temp > 0; temp = Math.floor(temp / 10)) {
  const d = temp % 10;
  sum += d ** digits;
}
console.log(sum === n);
// true
```

### Print all divisors

A divisor divides evenly — remainder 0:

```js
const n = 12;
let line = "";
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    if (line.length > 0) line += " ";
    line += i;
  }
}
console.log(line);
// 1 2 3 4 6 12
```

Build one line string, then print once — same idea as pattern printing.

### Check for prime

A prime has exactly two divisors: 1 and itself. Only check up to `Math.sqrt(n)` — if nothing divides by then, nothing larger will either:

```js
const n = 97;
let isPrime = n >= 2;
for (let i = 2; i <= Math.sqrt(n); i++) {
  if (n % i === 0) {
    isPrime = false;
    break;
  }
}
console.log(isPrime ? "prime" : "not prime");
// prime
```

`break` exits the loop early when you find a divisor.

### GCD — greatest common divisor

```js
let a = 120;
let b = 45;
while (b !== 0) {
  const r = a % b;
  a = b;
  b = r;
}
console.log(a);
// 15
```

### LCM — least common multiple

`LCM(a, b) = (a × b) / GCD(a, b)`:

```js
const x = 12;
const y = 18;
let a = x;
let b = y;
while (b !== 0) {
  const r = a % b;
  a = b;
  b = r;
}
const gcd = a;
console.log((x * y) / gcd);
// 36
```

### Sum of divisors

Include 1 and the number itself:

```js
const n = 6;
let sum = 0;
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    sum += i;
  }
}
console.log(sum);
// 12
```

### Perfect number

A perfect number equals the sum of its **proper** divisors (all divisors except itself):

```js
const n = 28;
let sum = 0;
for (let i = 1; i < n; i++) {
  if (n % i === 0) {
    sum += i;
  }
}
console.log(sum === n ? "perfect" : "not perfect");
// perfect
```

`1 + 2 + 4 + 7 + 14 = 28`.

### Prime factors

Divide out the smallest prime factor repeatedly:

```js
let n = 12;
let line = "";
let d = 2;
while (n > 1) {
  while (n % d === 0) {
    if (line.length > 0) line += " ";
    line += d;
    n = Math.floor(n / d);
  }
  d++;
}
console.log(line);
// 2 2 3
```

### All primes up to n

```js
const limit = 10;
let line = "";
for (let num = 2; num <= limit; num++) {
  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    if (line.length > 0) line += " ";
    line += num;
  }
}
console.log(line);
// 2 3 5 7
```

### Digit frequency

Count each digit, then print in ascending order:

```js
const n = 1223;
const freq = {};
let temp = n;
while (temp > 0) {
  const d = temp % 10;
  freq[d] = (freq[d] || 0) + 1;
  temp = Math.floor(temp / 10);
}
let line = "";
for (let d = 0; d <= 9; d++) {
  if (freq[d]) {
    if (line.length > 0) line += " ";
    line += `${d}:${freq[d]}`;
  }
}
console.log(line);
// 1:1 2:2 3:1
```

An object `{}` stores key–value pairs. Here keys are digits and values are counts.

## Common mistakes
- **Checking primes only up to `n - 1`.** That works but is slow. Stop at `Math.sqrt(n)` instead.
- **Including `n` in proper divisor sums.** Perfect numbers use divisors **less than** `n`, not including `n` itself.
- **Losing the original values when computing GCD.** Save `x` and `y` before the loop mutates `a` and `b`.
- **Wrong order for prime factors.** Divide by 2 repeatedly before trying 3, then 4, and so on. The inner `while` handles repeats.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-count-digits.js` to `14-digit-frequency.js` in order. Save each file to check it.
