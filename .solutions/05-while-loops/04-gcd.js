// ---- GIVEN ----
const a = 48;
const b = 18;
// ---------------

let x = a;
let y = b;
while (y !== 0) {
  const rem = x % y;
  x = y;
  y = rem;
}
console.log(x);
