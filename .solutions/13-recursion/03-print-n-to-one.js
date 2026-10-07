// ---- GIVEN ----
const n = 5;
// ---------------

function printNToOne(current) {
  if (current === 0) return;
  console.log(current);
  printNToOne(current - 1);
}
printNToOne(n);
