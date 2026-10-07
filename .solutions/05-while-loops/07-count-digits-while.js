// ---- GIVEN ----
const n = 1000000;
// ---------------

let num = n;
let count = 0;
while (num > 0) {
  count++;
  num = Math.floor(num / 10);
}
console.log(count);
