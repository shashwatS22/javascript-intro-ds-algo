// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += j;
  }
  console.log(line);
}
