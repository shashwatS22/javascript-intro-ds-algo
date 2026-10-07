// ---- GIVEN ----
const n = 12345;
// ---------------

let num = n;
let reversed = 0;
while (num > 0) {
  reversed = reversed * 10 + (num % 10);
  num = Math.floor(num / 10);
}
console.log(reversed);
