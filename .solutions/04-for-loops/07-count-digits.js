// ---- GIVEN ----
const n = 74821;
// ---------------

let count = 0;
for (let num = n; num > 0; num = Math.floor(num / 10)) {
  count++;
}
console.log(count);
