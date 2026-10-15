/**
 * ts-drills / 02-redo / 24-char-count
 *
 * TASK
 * Type frequency map. Print count for `a`.
 *
 * EXPECTED OUTPUT
 * 3
 */

const s: string = 'banana';
const freq: Record<string, number> = {};
for (const ch of s) {
  freq[ch] = (freq[ch] ?? 0) + 1;
}
console.log(freq['a']);