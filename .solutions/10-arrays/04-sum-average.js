// ---- GIVEN ----
const arr = [4, 8, 15, 16, 23, 42];
// ---------------

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);
console.log((sum / arr.length).toFixed(2));
