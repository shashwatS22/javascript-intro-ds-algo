// ---- GIVEN ----
const arr = [10, 5, 10, 15, 10, 5];
// ---------------

const counts = new Map();
for (const value of arr) {
  counts.set(value, (counts.get(value) ?? 0) + 1);
}
let highest = null;
let lowest = null;
let maxCount = -1;
let minCount = Infinity;
for (const [value, count] of counts) {
  if (count > maxCount) {
    maxCount = count;
    highest = value;
  }
  if (count < minCount) {
    minCount = count;
    lowest = value;
  }
}
console.log(`highest: ${highest}`);
console.log(`lowest: ${lowest}`);
