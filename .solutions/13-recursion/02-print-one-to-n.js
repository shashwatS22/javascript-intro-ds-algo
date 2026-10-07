// ---- GIVEN ----
const n = 5;
// ---------------

function printOneToN(i) {
  if (i > n) return;
  console.log(i);
  printOneToN(i + 1);
}
printOneToN(1);
