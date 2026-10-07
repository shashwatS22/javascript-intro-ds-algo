// ---- GIVEN ----
const arr = [1, 2, 2, 5, 9];
// ---------------

let sorted = true;
for (let i = 1; i < arr.length; i++) {
  if (arr[i] < arr[i - 1]) {
    sorted = false;
    break;
  }
}
console.log(sorted);
