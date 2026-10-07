# Level 01 — Print and variables

## What you'll learn
- How to print text to the terminal with `console.log`
- How to store values in variables with `let` and `const`
- How to build messages with template literals (backticks)
- How to check what type a value is with `typeof`
- How to join strings and format numbers

## Concepts

### Printing with `console.log`

`console.log` sends a line of text to the terminal. Each call prints one line.

```js
console.log("Hello, World!");
// Hello, World!
```

You can call it many times. Each call adds a new line.

```js
console.log("Line one");
console.log("Line two");
// Line one
// Line two
```

You can also put two lines inside one call using `\n` (newline):

```js
console.log("Line one\nLine two");
// Line one
// Line two
```

### Variables with `let`

A variable is a named box that holds a value. Use `let` when the value might change later.

```js
let count = 10;
console.log(count);
count = 20;
console.log(count);
// 10
// 20
```

### Constants with `const`

Use `const` when the value should not be reassigned.

```js
const name = "Riya";
console.log(name);
// Riya
```

### Template literals

Wrap text in backticks (`` ` ``) to insert values with `${...}`:

```js
const name = "Riya";
const age = 27;
console.log(`${name} is ${age} years old`);
// Riya is 27 years old
```

Multi-line template literals keep the line breaks:

```js
console.log(`12 Park Road
Bareilly
243001`);
// 12 Park Road
// Bareilly
// 243001
```

### Joining strings

The `+` operator joins strings together:

```js
const first = "Ada";
const last = "Lovelace";
console.log(first + " " + last);
// Ada Lovelace
```

### Checking types with `typeof`

`typeof` tells you what kind of value something is:

```js
console.log(typeof 5);
console.log(typeof "hi");
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
// number
// string
// boolean
// undefined
// object
// object
```

`null` is a special case — `typeof null` prints `object`. That is a long-standing quirk in JavaScript.

### Swapping values

You can swap two variables in one line with array destructuring:

```js
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(`a=${a} b=${b}`);
// a=2 b=1
```

### Rounding decimals

`.toFixed(n)` rounds a number to `n` decimal places and returns a string:

```js
const pi = 3.14159;
console.log(pi.toFixed(2));
// 3.14
```

### Comparisons print `true` or `false`

Comparison operators return boolean values:

```js
console.log(5 > 3);
console.log(5 === "5");
// true
// false
```

`===` checks both value and type. The number `5` is not the same as the string `"5"`.

### Escape characters

Some characters need a backslash inside strings:

```js
console.log('She said "hello" and left.');
console.log("a\tb");
// She said "hello" and left.
// a	b
```

`\"` prints a quote. `\t` prints a tab.

## Common mistakes
- **Forgetting quotes around text.** `console.log(hello)` looks for a variable named `hello`. Use `console.log("hello")` for the word itself.
- **Using straight quotes with template literals.** Template literals need backticks, not `"` or `'`. Write `` `Hello, ${name}` `` not `"Hello, ${name}"`.
- **Mixing up `let` and `const`.** If you reassign a value later, use `let`. If you try to reassign a `const`, you get an error.
- **Extra spaces in output.** The grader compares your output exactly. `"Hello, World!"` is not the same as `"Hello, World! "`.

## Before you start
Type every example above into `playground/scratch.js` and run it with `node playground/scratch.js`. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-hello.js` to `12-escapes.js` in order. Save each file to check it. Run `npm run dev` in the project root so the watcher grades your work automatically.
