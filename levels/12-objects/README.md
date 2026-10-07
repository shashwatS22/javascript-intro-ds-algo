# Level 12 — Objects

## What you'll learn
- How to store named values in objects and read them with dot or bracket notation
- How to add, change, and remove properties
- How to loop over objects with `for...in`
- How to use destructuring, spread, JSON, and optional chaining

## Concepts

### Accessing properties
An object groups related values under names called keys.

```js
const user = { name: "Ada", age: 36 };
console.log(user.name);
console.log(user["age"]);
// Ada
// 36
```

Dot notation (`user.name`) is common when you know the key name. Brackets (`user["age"]`) work when the key is in a variable.

### Modifying objects
You can add, change, and delete properties on an existing object.

```js
const user = { name: "Ada", age: 36 };
user.city = "London";
user.age = 37;
delete user.age;
console.log(Object.keys(user).join(" "));
// name city
```

### Looping with for...in
`for...in` walks each key in an object.

```js
const scores = { math: 90, science: 85, art: 72 };
for (const key in scores) {
  console.log(`${key}: ${scores[key]}`);
}
// math: 90
// science: 85
// art: 72
```

### keys, values, and entries
These helpers turn an object into arrays you can inspect or loop over.

```js
const scores = { math: 90, science: 85, art: 72 };
console.log(Object.keys(scores).join(" "));
console.log(Object.values(scores).join(" "));
console.log(Object.entries(scores).length);
// math science art
// 90 85 72
// 3
```

### Nested objects
Objects can contain other objects. Chain dots to reach deeper values.

```js
const user = {
  name: "Riya",
  address: { city: "Bareilly", pin: 243001 },
};
console.log(user.address.city);
// Bareilly
```

### Arrays of objects
Real data often comes as a list of objects. Loop and read properties on each one.

```js
const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];
for (const person of people) {
  console.log(person.name);
}
// Ada
// Raman
// Meera
```

### Destructuring
Pull properties out into their own variables in one line.

```js
const user = { name: "Ada", age: 36, city: "London" };
const { name, city } = user;
console.log(`${name} — ${city}`);
// Ada — London
```

### Spread merge
Spread copies properties from one object into another. Later keys overwrite earlier ones.

```js
const defaults = { theme: "light", fontSize: 14 };
const custom = { fontSize: 18 };
const merged = { ...defaults, ...custom };
console.log(merged.theme);
console.log(merged.fontSize);
// light
// 18
```

### JSON stringify and parse
`JSON.stringify` turns an object into a string. `JSON.parse` turns it back.

```js
const person = { name: "Ada", age: 36, city: "London" };
const text = JSON.stringify(person);
const copy = JSON.parse(text);
console.log(text);
console.log(copy.name);
// {"name":"Ada","age":36,"city":"London"}
// Ada
```

### Optional chaining
If a nested property might not exist, `?.` stops safely instead of crashing.

```js
const user = { name: "Ada" };
console.log(user.address?.city);
console.log(user.address?.city ?? "unknown");
// undefined
// unknown
```

The `??` operator gives a fallback when the left side is `null` or `undefined`.

## Common mistakes
- Using dot notation with a dynamic key — use brackets: `obj[key]`, not `obj.key`.
- Forgetting that objects are compared by reference — `{a:1} === {a:1}` is `false`.
- Mutating a shared object when you meant to copy — use spread `{...obj}` for a shallow copy.
- Assuming `for...in` gives values — it gives **keys**. Use `scores[key]` to get the value.

## Before you start
Type every example above into `playground/scratch.js` and run it. Change a property and predict what happens before you run it again.

## Exercises
Work through `01-` to `12-` in order. Save each file to check it.
