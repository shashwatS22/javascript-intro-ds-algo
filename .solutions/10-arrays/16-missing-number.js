// ---- GIVEN ----
const arr = [0, 1, 2, 4, 5];
const n = 5;
// ---------------

const expectedSum = (n * (n + 1)) / 2;
let actualSum = 0;
for (let i = 0; i < arr.length; i++) {
  actualSum += arr[i];
}
console.log(expectedSum - actualSum);
