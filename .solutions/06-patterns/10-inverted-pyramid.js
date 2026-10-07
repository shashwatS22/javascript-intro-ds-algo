// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = n; i >= 1; i--) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}
