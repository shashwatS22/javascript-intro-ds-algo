// ---- GIVEN ----
const n = 5;
// ---------------

let num = 1;
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    if (j > 1) line += ' ';
    line += num;
    num++;
  }
  console.log(line);
}
