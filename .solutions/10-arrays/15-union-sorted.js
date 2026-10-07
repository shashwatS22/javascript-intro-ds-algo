// ---- GIVEN ----
const a = [1, 2, 3, 4, 6];
const b = [2, 3, 5];
// ---------------

const set = new Set([...a, ...b]);
const union = [...set].sort((x, y) => x - y);
console.log(union.join(' '));
