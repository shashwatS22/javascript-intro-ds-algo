// ---- GIVEN ----
const n = 946213;
// ---------------

let count = 0;
let num = n;
while (num > 0) {
  count++;
  num = Math.floor(num / 10);
}
console.log(count);
