// ---- GIVEN ----
const arr = [1, 3, 3, 5, 3];
const target = 3;
// ---------------

let count = 0;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    count++;
  }
}
console.log(count);
