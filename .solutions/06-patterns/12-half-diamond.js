// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = 1; i <= n; i++) {
  let line = '*'.repeat(i);
  console.log(line);
}
for (let i = n - 1; i >= 1; i--) {
  let line = '*'.repeat(i);
  console.log(line);
}
