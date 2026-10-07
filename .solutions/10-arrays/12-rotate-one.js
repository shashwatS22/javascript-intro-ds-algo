// ---- GIVEN ----
const arr = [1, 2, 3, 4, 5];
// ---------------

const first = arr.shift();
arr.push(first);
console.log(arr.join(' '));
