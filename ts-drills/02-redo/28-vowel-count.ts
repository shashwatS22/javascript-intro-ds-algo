/**
 * ts-drills / 02-redo / 28-vowel-count
 *
 * TASK
 * Type string. Print vowels then consonants.
 *
 * EXPECTED OUTPUT
 * 2
 * 3
 */

const s: string = 'hello';
const vowels = 'aeiou';
let v = 0;
let c = 0;
for (const ch of s) {
  if (vowels.includes(ch)) v++;
  else c++;
}
console.log(v);
console.log(c);