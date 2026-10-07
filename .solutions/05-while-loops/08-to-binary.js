// ---- GIVEN ----
const n = 25;
// ---------------

let num = n;
let binary = '';
while (num > 0) {
  binary = (num % 2) + binary;
  num = Math.floor(num / 2);
}
console.log(binary);
