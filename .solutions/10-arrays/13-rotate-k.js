// ---- GIVEN ----
const arr = [1, 2, 3, 4, 5, 6, 7];
const k = 3;
// ---------------

for (let i = 0; i < k; i++) {
  const first = arr.shift();
  arr.push(first);
}
console.log(arr.join(' '));
