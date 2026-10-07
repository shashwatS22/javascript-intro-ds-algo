// ---- GIVEN ----
const arr = [7, 3, 9, 1];
const target = 9;
// ---------------

let index = -1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    index = i;
    break;
  }
}
console.log(index);
