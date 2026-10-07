// ---- GIVEN ----
const arr = [4, 19, 7, 2];
// ---------------

console.log(arr.reduce((max, n) => (n > max ? n : max), arr[0]));
