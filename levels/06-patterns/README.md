# Level 06 — Patterns

## What you'll learn
- How to print shapes row by row using nested loops
- How to build each row as a string, then print it once
- How to control spaces and stars for triangles and pyramids
- How to use an outer loop for rows and an inner loop for columns
- How to lay out numbers in patterns like Floyd's triangle

## Concepts

### The pattern for every exercise

**Build a line string. Print one `console.log` per row.** Do not print character by character with multiple logs inside the inner loop.

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    line += "*";
  }
  console.log(line);
}
// *
// **
// ***
```

The outer loop picks the row number. The inner loop adds characters to `line`. After the inner loop finishes, you print the whole row at once.

This is the pattern every exercise in this level expects.

### Solid square

Same number of stars on every row:

```js
const n = 3;
for (let i = 0; i < n; i++) {
  let line = "";
  for (let j = 0; j < n; j++) {
    line += "*";
  }
  console.log(line);
}
// ***
// ***
// ***
```

### Left-aligned star triangle

Row `i` has `i` stars:

```js
const n = 4;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    line += "*";
  }
  console.log(line);
}
// *
// **
// ***
// ****
```

### Number triangle

Row `i` prints numbers 1 through `i`, with spaces between:

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += " ";
    line += j;
  }
  console.log(line);
}
// 1
// 1 2
// 1 2 3
```

### Same number on each row

Row `i` prints the digit `i` repeated `i` times:

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    line += i;
  }
  console.log(line);
}
// 1
// 22
// 333
```

### Inverted triangle

Start from `n` and count down:

```js
const n = 3;
for (let i = n; i >= 1; i--) {
  let line = "";
  for (let j = 0; j < i; j++) {
    line += "*";
  }
  console.log(line);
}
// ***
// **
// *
```

### Floyd's triangle

Numbers continue across rows — 1, then 2 3, then 4 5 6:

```js
const n = 3;
let num = 1;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    if (j > 0) line += " ";
    line += num;
    num++;
  }
  console.log(line);
}
// 1
// 2 3
// 4 5 6
```

Use one counter (`num`) that increases across the whole triangle.

### Centred pyramid

Each row needs leading spaces, then stars with spaces between:

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let s = 0; s < n - i; s++) {
    line += " ";
  }
  for (let j = 0; j < i; j++) {
    if (j > 0) line += " ";
    line += "*";
  }
  console.log(line);
}
//   *
//  * *
// * * *
```

Note the leading spaces on each line. The first inner loop adds spaces. The second inner loop adds stars.

### Hollow square

Print stars on the border only. Inside cells are spaces:

```js
const n = 4;
for (let i = 0; i < n; i++) {
  let line = "";
  for (let j = 0; j < n; j++) {
    const isBorder = i === 0 || i === n - 1 || j === 0 || j === n - 1;
    line += isBorder ? "*" : " ";
  }
  console.log(line);
}
// ****
// *  *
// *  *
// ****
```

### Alphabet triangle

Row `i` prints letters from A up to the i-th letter:

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    if (j > 0) line += " ";
    line += String.fromCharCode(65 + j);
  }
  console.log(line);
}
// A
// A B
// A B C
```

`65` is the code for `"A"`. Adding `j` gives `"B"`, `"C"`, and so on.

### Multiplication grid with padding

Use `.padStart(4)` so columns line up:

```js
const n = 3;
for (let i = 1; i <= n; i++) {
  let line = "";
  for (let j = 1; j <= n; j++) {
    line += String(i * j).padStart(4);
  }
  console.log(line);
}
//    1   2   3
//    2   4   6
//    3   6   9
```

Each number is padded to width 4, so the first column has three leading spaces.

## Common mistakes
- **Multiple `console.log` calls inside the inner loop.** Build the full row in `line` first, then log once per row.
- **Wrong number of spaces.** Count spaces carefully in pyramids. Row `i` often needs `n - i` leading spaces.
- **Off-by-one in loop bounds.** A 5-row triangle usually uses `i` from 1 to 5 or `i` from 0 to 4 — match what the exercise asks.
- **Forgetting spaces between numbers or stars.** Read the expected output in the exercise comment. Some patterns need `" "` between items; some need stars packed together.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change `n` and predict the shape before you run it again.

## Exercises
Work through `01-star-square.js` to `16-multiplication-grid.js` in order. Save each file to check it. Remember: build each line into a string, then one `console.log` per row.
