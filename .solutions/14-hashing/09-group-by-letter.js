// ---- GIVEN ----
const words = ["apple", "avocado", "banana", "blueberry", "cherry"];
// ---------------

const groups = new Map();
for (const word of words) {
  const letter = word[0];
  if (!groups.has(letter)) groups.set(letter, []);
  groups.get(letter).push(word);
}
for (const [letter, list] of groups) {
  console.log(`${letter}: ${list.join(', ')}`);
}
