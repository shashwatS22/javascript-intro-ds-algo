// ---- GIVEN ----
const n = 48291;
// ---------------

let num = n;
let sum = 0;
while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}
console.log(sum);
