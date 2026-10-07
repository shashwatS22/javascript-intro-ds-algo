// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = n; i >= 1; i--) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += j;
  }
  console.log(line);
}
