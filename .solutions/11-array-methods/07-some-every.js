// ---- GIVEN ----
const arr = [2, 4, 6, 7];
// ---------------

const isOdd = (n) => n % 2 !== 0;
const isEven = (n) => n % 2 === 0;
console.log(arr.some(isOdd));
console.log(arr.every(isEven));
