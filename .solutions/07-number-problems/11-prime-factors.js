// ---- GIVEN ----
const n = 360;
// ---------------

let num = n;
const factors = [];
let d = 2;
while (num > 1) {
  while (num % d === 0) {
    factors.push(d);
    num = Math.floor(num / d);
  }
  d++;
}
console.log(factors.join(' '));
