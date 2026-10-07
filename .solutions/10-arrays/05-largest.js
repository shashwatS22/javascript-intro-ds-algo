// ---- GIVEN ----
const arr = [3, 41, 7, 41, 19];
// ---------------

let largest = arr[0];
for (let i = 1; i < arr.length; i++) {
  if (arr[i] > largest) {
    largest = arr[i];
  }
}
console.log(largest);
