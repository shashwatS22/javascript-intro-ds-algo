// ---- GIVEN ----
const arr = [10, 5, 10, 15, 10, 5];
// ---------------

const counts = new Map();
for (const value of arr) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
console.log([...counts.entries()].map(([value, count]) => `${value}:${count}`).join(' '));
