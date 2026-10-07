// ---- GIVEN ----
const s = "swiss";
// ---------------

const counts = new Map();
for (const ch of s) {
  counts.set(ch, (counts.get(ch) ?? 0) + 1);
}
let result = 'none';
for (const ch of s) {
  if (counts.get(ch) === 1) {
    result = ch;
    break;
  }
}
console.log(result);
