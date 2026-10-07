// ---- GIVEN ----
const s = "learning javascript today";
// ---------------

const words = s.split(' ');
const titled = words.map((word) => {
  return word[0].toUpperCase() + word.slice(1);
});
console.log(titled.join(' '));
