// ---- GIVEN ----
const n = 1223334444;
// ---------------

const s = String(n);
const freq = {};
for (const ch of s) {
  freq[ch] = (freq[ch] || 0) + 1;
}
const digits = Object.keys(freq).sort();
const parts = digits.map((d) => `${d}:${freq[d]}`);
console.log(parts.join(' '));
