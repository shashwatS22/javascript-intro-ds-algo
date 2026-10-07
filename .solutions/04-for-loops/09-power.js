// ---- GIVEN ----
const base = 3;
const exp = 5;
// ---------------

let result = 1;
for (let i = 0; i < exp; i++) {
  result *= base;
}
console.log(result);
