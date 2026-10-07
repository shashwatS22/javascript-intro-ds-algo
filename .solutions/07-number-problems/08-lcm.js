// ---- GIVEN ----
const a = 12;
const b = 18;
// ---------------

let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
const gcd = x;
console.log((a * b) / gcd);
