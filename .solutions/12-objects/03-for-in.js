// ---- GIVEN ----
const scores = { math: 90, science: 85, art: 72 };
// ---------------

for (const key in scores) {
  console.log(`${key}: ${scores[key]}`);
}
