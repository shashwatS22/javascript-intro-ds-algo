// ---- GIVEN ----
const a = 3;
const b = 4;
const c = 8;
// ---------------

if (a + b > c && a + c > b && b + c > a) {
  console.log('valid');
} else {
  console.log('invalid');
}
