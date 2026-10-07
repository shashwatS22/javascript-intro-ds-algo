// ---- GIVEN ----
const arr = [10, 9, 100, 2];
// ---------------

// Plain .sort() compares values as strings, so 100 comes before 2.
console.log([...arr].sort((a, b) => a - b).join(' '));
console.log([...arr].sort((a, b) => b - a).join(' '));
