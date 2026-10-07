// ---- GIVEN ----
const s = "banana";
// ---------------

const counts = {};
for (const ch of s) {
  counts[ch] = (counts[ch] ?? 0) + 1;
}
console.log(Object.entries(counts).map(([ch, count]) => `${ch}:${count}`).join(' '));
