const s: string = 'banana';
const freq: Record<string, number> = {};
for (const ch of s) {
  freq[ch] = (freq[ch] ?? 0) + 1;
}
console.log(freq['a']);