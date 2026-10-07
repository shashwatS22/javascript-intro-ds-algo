// ---- GIVEN ----
const arr = [0, 1, 0, 3, 12];
// ---------------

const nonZero = [];
let zeroCount = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) {
    zeroCount++;
  } else {
    nonZero.push(arr[i]);
  }
}
for (let i = 0; i < zeroCount; i++) {
  nonZero.push(0);
}
console.log(nonZero.join(' '));
