// ---- GIVEN ----
const s = " the quick  brown fox ";
// ---------------

const trimmed = s.trim();
const words = trimmed.split(/\s+/);
console.log(words.length);
