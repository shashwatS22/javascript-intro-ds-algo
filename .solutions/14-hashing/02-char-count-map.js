// ---- GIVEN ----
const s = "banana";
// ---------------

const counts = new Map();
for (const ch of s) {
  counts.set(ch, (counts.get(ch) ?? 0) + 1);
}
console.log([...counts.entries()].map(([ch, count]) => `${ch}:${count}`).join(' '));
