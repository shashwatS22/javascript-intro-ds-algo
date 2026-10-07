// ---- GIVEN ----
const a = [1, 2, 3, 4];
const b = [3, 4, 5];
// ---------------

const union = [...new Set([...a, ...b])];
const setB = new Set(b);
const intersection = a.filter((value) => setB.has(value));
console.log(union.join(' '));
console.log([...new Set(intersection)].join(' '));
