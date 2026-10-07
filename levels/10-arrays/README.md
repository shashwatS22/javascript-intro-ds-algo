# Level 10 — Arrays

## What you'll learn
- How to create arrays and read elements by index
- How to add and remove items with `push`, `pop`, `shift`, and `unshift`
- How to loop with a classic `for` and with `for...of`
- How to search, reverse, rotate, and solve common array problems

## Concepts

### Array basics
An array holds a list of values in order. The first item is at index `0`. The last item is at index `length - 1`.

```js
const arr = [10, 20, 30];
console.log(arr.length);
console.log(arr[0]);
console.log(arr[arr.length - 1]);
// 3
// 10
// 30
```

### Adding and removing items
`push` and `unshift` add items. `pop` and `shift` remove items.

```js
const arr = [2, 3];
arr.push(4);
arr.unshift(1);
console.log(arr.join(" "));
arr.pop();
arr.shift();
console.log(arr.join(" "));
// 1 2 3 4
// 2 3
```

### Two ways to loop
A classic `for` uses an index. `for...of` gives you each value directly.

```js
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (const item of arr) {
  console.log(item);
}
// a
// b
// c
// a
// b
// c
```

### Sum and average
Walk the array and add each number. Divide the sum by the length for the average.

```js
const arr = [4, 8, 15, 16, 23, 42];
let sum = 0;
for (const n of arr) {
  sum += n;
}
console.log(sum);
console.log((sum / arr.length).toFixed(2));
// 108
// 18.00
```

### Finding the largest value
Keep a `max` variable. Update it whenever you see a bigger number.

```js
const arr = [3, 41, 7, 41, 19];
let max = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > max) max = arr[i];
}
console.log(max);
// 41
```

### Reverse in place with two pointers
Swap the first and last, then move both pointers toward the middle.

```js
const arr = [1, 2, 3, 4, 5];
let left = 0;
let right = arr.length - 1;
while (left < right) {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
  left++;
  right--;
}
console.log(arr.join(" "));
// 5 4 3 2 1
```

### Linear search
Walk the array and return the index when you find the target.

```js
const arr = [7, 3, 9, 1];
const target = 9;
let index = -1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    index = i;
    break;
  }
}
console.log(index);
// 2
```

### Printing arrays cleanly
`console.log(arr)` shows brackets. Use `.join(" ")` for a clean single line of values.

```js
const arr = [1, 2, 3];
console.log(arr.join(" "));
// 1 2 3
```

## Common mistakes
- Using index `arr.length` — the last valid index is `arr.length - 1`.
- Forgetting that `push` and `pop` change the original array — they do not return a new array.
- Comparing arrays with `===` — two arrays are only equal if they are the **same** object, not if they have the same items.
- Off-by-one errors in loops — `i < arr.length` is correct; `i <= arr.length` goes one step too far.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a number and predict what happens before you run it again.

## Exercises
Work through `01-` to `16-` in order. Save each file to check it.
