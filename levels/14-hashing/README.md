# Level 14 — Hashing

## What you'll learn
- How to count how often things appear using objects and `Map`
- How to use a `Set` for unique values
- How to find pairs and groups quickly with a frequency map
- Why "hashing" here means keeping a lookup table in memory

## Concepts

### What is hashing (in this level)?
We are not building a hash function yet. We are using **objects** and **Maps** as lookup tables: store a key (a character, a number, a word) and remember a value (usually a count). Looking up a key is fast — that is the idea behind hashing.

### Count characters with an object
Use each character as a key. If you have seen it before, add 1. If not, start at 1.

```js
const s = "banana";
const counts = {};
for (const ch of s) {
  counts[ch] = (counts[ch] || 0) + 1;
}
const parts = Object.entries(counts).map(([ch, n]) => `${ch}:${n}`);
console.log(parts.join(" "));
// b:1 a:3 n:2
```

### Count characters with a Map
A `Map` works like an object but is built for keys that change often.

```js
const s = "banana";
const counts = new Map();
for (const ch of s) {
  counts.set(ch, (counts.get(ch) || 0) + 1);
}
const parts = [...counts.entries()].map(([ch, n]) => `${ch}:${n}`);
console.log(parts.join(" "));
// b:1 a:3 n:2
```

### Count values in an array
Same pattern — the key is the array value, the value is how many times it appeared.

```js
const arr = [10, 5, 10, 15, 10, 5];
const counts = new Map();
for (const n of arr) {
  counts.set(n, (counts.get(n) || 0) + 1);
}
const parts = [...counts.entries()].map(([n, c]) => `${n}:${c}`);
console.log(parts.join(" "));
// 10:3 5:2 15:1
```

### Set for unique values
A `Set` stores each value only once. Duplicates are ignored automatically.

```js
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique.join(" "));
console.log(unique.length);
// 1 2 3
// 3
```

### Union and intersection with Sets
Put both arrays into Sets, then combine or filter.

```js
const a = [1, 2, 3, 4];
const b = [3, 4, 5];
const setA = new Set(a);
const setB = new Set(b);
const union = [...new Set([...a, ...b])];
const intersection = [...setA].filter((n) => setB.has(n));
console.log(union.join(" "));
console.log(intersection.join(" "));
// 1 2 3 4 5
// 3 4
```

### First non-repeating character
Count first, then walk the string again and return the first character with count 1.

```js
const s = "swiss";
const counts = {};
for (const ch of s) {
  counts[ch] = (counts[ch] || 0) + 1;
}
let answer = "none";
for (const ch of s) {
  if (counts[ch] === 1) {
    answer = ch;
    break;
  }
}
console.log(answer);
// w
```

### Two-sum with a Map
For each number, check if `target - number` was seen before. Store each value and its index as you go.

```js
const arr = [2, 7, 11, 15];
const target = 9;
const seen = new Map();
let result = "";
for (let i = 0; i < arr.length; i++) {
  const need = target - arr[i];
  if (seen.has(need)) {
    result = `${seen.get(need)} ${i}`;
    break;
  }
  seen.set(arr[i], i);
}
console.log(result);
// 0 1
```

### Anagram check with a frequency map
Two strings are anagrams if every letter appears the same number of times.

```js
function countChars(s) {
  const map = new Map();
  for (const ch of s) {
    map.set(ch, (map.get(ch) || 0) + 1);
  }
  return map;
}
const a = "anagram";
const b = "nagaram";
const mapA = countChars(a);
const mapB = countChars(b);
let same = mapA.size === mapB.size;
if (same) {
  for (const [ch, n] of mapA) {
    if (mapB.get(ch) !== n) {
      same = false;
      break;
    }
  }
}
console.log(same);
// true
```

## Common mistakes
- Forgetting `(counts[ch] || 0) + 1` — without `|| 0`, the first add gives `NaN`.
- Using an object when keys are numbers — object keys become strings. `Map` keeps number keys as numbers.
- Checking for a pair with nested loops when a Map gives O(n) — build the map in one pass.
- Assuming Set order matches insertion for sorting — convert to an array and sort if you need a specific order.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a string and predict the counts before you run it again.

## Exercises
Work through `01-` to `10-` in order. Save each file to check it.
