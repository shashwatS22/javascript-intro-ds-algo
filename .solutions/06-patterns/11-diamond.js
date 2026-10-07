// ---- GIVEN ----
const n = 5;
// ---------------

for (let i = 1; i <= n; i++) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}
for (let i = n - 1; i >= 1; i--) {
  let line = '';
  line += ' '.repeat(n - i);
  line += '*'.repeat(2 * i - 1);
  console.log(line);
}
