// ---- GIVEN ----
const arr = [1, 1, 2, 2, 2, 3, 3];
// ---------------

const unique = [];
for (let i = 0; i < arr.length; i++) {
  if (i === 0 || arr[i] !== arr[i - 1]) {
    unique.push(arr[i]);
  }
}
console.log(unique.join(' '));
