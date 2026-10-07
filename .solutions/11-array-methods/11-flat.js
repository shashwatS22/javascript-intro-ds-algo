// ---- GIVEN ----
const arr = [1, [2, 3], [4, [5]]];
// ---------------

console.log(arr.flat().join(' '));
console.log(arr.flat(2).join(' '));
