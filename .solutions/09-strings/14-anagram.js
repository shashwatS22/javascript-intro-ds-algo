// ---- GIVEN ----
const a = "listen";
const b = "silent";
// ---------------

const sortedA = a.split('').sort().join('');
const sortedB = b.split('').sort().join('');
console.log(sortedA === sortedB);
