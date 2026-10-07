// ---- GIVEN ----
const s = "hello world";
// ---------------

let vowels = 0;
let consonants = 0;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  if (ch === ' ') continue;
  if ('aeiou'.includes(ch)) {
    vowels++;
  } else {
    consonants++;
  }
}
console.log(`vowels: ${vowels}`);
console.log(`consonants: ${consonants}`);
