// ---- GIVEN ----
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// ---------------

const result = arr
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .reduce((sum, n) => sum + n, 0);
console.log(result);
