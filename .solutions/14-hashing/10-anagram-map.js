// ---- GIVEN ----
const a = "anagram";
const b = "nagaram";
// ---------------

function countChars(s) {
  const counts = new Map();
  for (const ch of s) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }
  return counts;
}

function mapsEqual(mapA, mapB) {
  if (mapA.size !== mapB.size) return false;
  for (const [key, value] of mapA) {
    if (mapB.get(key) !== value) return false;
  }
  return true;
}

console.log(mapsEqual(countChars(a), countChars(b)));
