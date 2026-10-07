// ---- GIVEN ----
const arr = [1, 2, 2, 3, 3, 3];
// ---------------

const unique = [...new Set(arr)];
console.log(unique.join(' '));
console.log(unique.length);
