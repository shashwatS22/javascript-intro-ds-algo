# Level 09 — Strings

## What you'll learn
- How to read and change text with string properties and methods
- How to loop over characters one at a time
- How to search, slice, split, join, replace, trim, and pad strings
- How to solve common string problems like palindromes and anagrams

## Concepts

### String basics
A string is text inside quotes. You can ask for its length and change its case.

```js
const s = "JavaScript";
console.log(s.length);
console.log(s.toUpperCase());
console.log(s.toLowerCase());
// 10
// JAVASCRIPT
// javascript
```

### Looping over characters
Strings work with `for...of`, just like arrays. Each step gives you one character.

```js
const s = "code";
for (const ch of s) {
  console.log(ch);
}
// c
// o
// d
// e
```

### Reversing a string with a loop
Build a new string from back to front. Add each character to the front of a result string.

```js
const s = "bareilly";
let reversed = "";
for (let i = s.length - 1; i >= 0; i--) {
  reversed += s[i];
}
console.log(reversed);
// yllierab
```

### Checking a palindrome
Compare the string to its reverse. If they match, it reads the same forwards and backwards.

```js
const s = "racecar";
let reversed = "";
for (let i = s.length - 1; i >= 0; i--) {
  reversed += s[i];
}
console.log(reversed === s);
// true
```

### Counting vowels and consonants
Letters `a e i o u` (upper or lower) are vowels. Everything else that is a letter counts as a consonant.

```js
const s = "hello world";
const vowels = "aeiou";
let v = 0;
let c = 0;
for (const ch of s.toLowerCase()) {
  if (vowels.includes(ch)) v++;
  else if (ch >= "a" && ch <= "z") c++;
}
console.log(`vowels: ${v}`);
console.log(`consonants: ${c}`);
// vowels: 3
// consonants: 7
```

### Split and join
`split` breaks a string into an array. `join` puts an array back into one string.

```js
const s = "a,b,c,d";
const parts = s.split(",");
console.log(parts.join(" - "));
// a - b - c - d
```

### Search methods
These return useful true/false or index values without writing a loop.

```js
const s = "javascript";
console.log(s.includes("script"));
console.log(s.startsWith("java"));
console.log(s.endsWith("x"));
console.log(s.indexOf("a"));
// true
// true
// false
// 1
```

### Slice and substring
`slice(start, end)` grabs part of a string. A negative start counts from the end.

```js
const s = "abcdefgh";
console.log(s.slice(2, 5));
console.log(s.slice(-3));
console.log(s.substring(5, 2));
// cde
// fgh
// cde
```

### Replace
`replace` changes the first match. `replaceAll` changes every match.

```js
const s = "cat bat cat";
console.log(s.replace("cat", "dog"));
console.log(s.replaceAll("cat", "dog"));
// dog bat cat
// dog bat dog
```

### Trim and pad
`trim` removes extra spaces at the start and end. `padStart` adds characters on the left until the string reaches a target length.

```js
const s = "  7  ";
const trimmed = s.trim();
console.log(trimmed);
console.log(trimmed.padStart(5, "0"));
// 7
// 00007
```

## Common mistakes
- Using `+` to add numbers that are still strings — `"5" + 1` gives `"51"`, not `6`. Use `Number()` first.
- Forgetting that strings cannot be changed in place — methods like `toUpperCase()` return a **new** string.
- Using `s[i]` without checking the index — if `i` is too large you get `undefined`.
- Calling `.sort()` on split characters and expecting the original string to change — sort the array, then join it back.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a word and predict what happens before you run it again.

## Exercises
Work through `01-` to `14-` in order. Save each file to check it.
