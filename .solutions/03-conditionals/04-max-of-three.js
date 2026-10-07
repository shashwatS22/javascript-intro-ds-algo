// ---- GIVEN ----
const a = 12;
const b = 45;
const c = 45;
// ---------------

let max = a;
if (b > max) max = b;
if (c > max) max = c;
console.log(max);
