// ---- GIVEN ----
const arr = [2, 7, 11, 15];
const target = 9;
// ---------------

const seen = new Map();
let result = null;
for (let i = 0; i < arr.length; i++) {
  const need = target - arr[i];
  if (seen.has(need)) {
    result = [seen.get(need), i];
    break;
  }
  seen.set(arr[i], i);
}
console.log(result.join(' '));
