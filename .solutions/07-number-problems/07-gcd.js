// ---- GIVEN ----
const a = 120;
const b = 45;
// ---------------

let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
console.log(x);
