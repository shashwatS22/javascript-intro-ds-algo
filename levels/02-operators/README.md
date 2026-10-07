# Level 02 — Operators

## What you'll learn
- How to do math with `+`, `-`, `*`, `/`, and `%`
- How `++` and `--` change a number before or after you use it
- How to compare values with `==` vs `===`
- How to combine conditions with `&&`, `||`, and `!`
- How to pick a value with the ternary operator (`? :`)

## Concepts

### Arithmetic operators

JavaScript can add, subtract, multiply, and divide numbers:

```js
const a = 17;
const b = 5;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
// 22
// 12
// 85
// 3.4
```

Division can produce decimals. When you need the whole-number part, use `Math.floor`:

```js
console.log(Math.floor(17 / 5));
// 3
```

### The remainder operator `%`

The `%` operator gives you the **remainder** after division. Read `17 % 5` as "17 divided by 5, what is left over?"

```js
console.log(17 % 5);
// 2
```

Because `17 = 5 × 3 + 2`, the remainder is `2`. This is useful for finding the last digit of a number:

```js
const n = 4739;
console.log(n % 10);
// 9
```

Any number's last digit is always `n % 10`.

### Post-increment and pre-increment

`x++` adds 1 to `x`, but **after** the current line uses the old value. `++x` adds 1 **before** the line uses it:

```js
let x = 5;
console.log(x++);
console.log(x);
console.log(++x);
console.log(x);
// 5
// 6
// 7
// 7
```

The first `console.log(x++)` prints `5` because `x` is bumped to `6` only after that line finishes.

### Compound assignment

These shortcuts update a variable in place:

```js
let total = 100;
total += 20;
console.log(total);
total -= 30;
console.log(total);
total *= 2;
console.log(total);
total /= 4;
console.log(total);
// 120
// 90
// 180
// 45
```

### Loose vs strict equality

`==` compares values and may convert types. `===` compares value **and** type with no conversion:

```js
console.log(1 == "1");
console.log(1 === "1");
console.log(0 == false);
console.log(0 === false);
console.log(null == undefined);
console.log(null === undefined);
// true
// false
// true
// false
// true
// false
```

Prefer `===` unless you have a specific reason to use `==`.

### Logical operators

```js
const a = true;
const b = false;
console.log(a && b);
console.log(a || b);
console.log(!a);
console.log(!b);
// false
// true
// false
// true
```

`&&` means "and" — both must be true. `||` means "or" — at least one must be true. `!` flips true to false and back.

### Ternary operator

A short if/else in one expression:

```js
const n = 14;
console.log(n % 2 === 0 ? "even" : "odd");
// even
```

If the condition before `?` is true, you get the first value. Otherwise you get the value after `:`.

### Strings vs numbers

The `+` operator joins strings. `Number()` converts a string to a number first:

```js
const s = "42";
console.log(s + 8);
console.log(Number(s) + 8);
// 428
// 50
```

`"42" + 8` becomes `"428"` because both sides are treated as text.

### NaN — "Not a Number"

When conversion fails, you get `NaN`:

```js
const x = Number("abc");
console.log(x);
console.log(Number.isNaN(x));
// NaN
// true
```

### Math helpers

```js
console.log(Math.abs(-7));
console.log(Math.pow(2, 10));
console.log(Math.sqrt(144));
console.log(Math.round(4.6));
console.log(Math.max(3, 9, 2));
// 7
// 1024
// 12
// 5
// 9
```

### Operator precedence

Multiplication happens before addition unless parentheses say otherwise:

```js
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);
console.log(10 - 4 - 3);
// 14
// 20
// 3
```

Subtraction goes left to right: `10 - 4` is `6`, then `6 - 3` is `3`.

## Common mistakes
- **Using `/` when you want whole-number division.** `17 / 5` is `3.4`, not `3`. Use `Math.floor(a / b)` when you need an integer result.
- **Confusing `%` with `/`.** `/` gives the quotient (how many times it fits). `%` gives what's left over.
- **Using `==` by habit.** `"5" == 5` is true, which can hide bugs. Use `===` for safer checks.
- **Forgetting that `+` joins strings.** `"42" + 8` is `"428"`, not `50`. Convert with `Number()` first when you mean math.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-arithmetic.js` to `12-last-digit.js` in order. Save each file to check it.
