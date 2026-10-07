// ---- GIVEN ----
const arr = [12, 35, 1, 10, 34, 35];
// ---------------

let largest = -Infinity;
let second = -Infinity;
for (let i = 0; i < arr.length; i++) {
  const n = arr[i];
  if (n > largest) {
    second = largest;
    largest = n;
  } else if (n > second && n < largest) {
    second = n;
  }
}
console.log(second);
