// ---- GIVEN ----
const arr = ["a", "b", "c"];
// ---------------

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (const item of arr) {
  console.log(item);
}
