// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= n; j++) {
    if (i === 1 || i === n || j === 1 || j === n) {
      line += '*';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}
