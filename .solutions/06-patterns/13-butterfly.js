// ---- GIVEN ----
const n = 4;
// ---------------

for (let i = 1; i <= 2 * n - 1; i++) {
  let line = '';
  const row = i <= n ? i : 2 * n - i;
  const stars = '*'.repeat(row);
  const spaces = ' '.repeat(2 * (n - row));
  line = stars + spaces + stars;
  console.log(line);
}
