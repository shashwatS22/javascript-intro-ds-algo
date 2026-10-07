// ---- GIVEN ----
const n = 371;
// ---------------

let temp = n;
let digits = 0;
while (temp > 0) {
  digits++;
  temp = Math.floor(temp / 10);
}
temp = n;
let sum = 0;
while (temp > 0) {
  const d = temp % 10;
  sum += d ** digits;
  temp = Math.floor(temp / 10);
}
console.log(sum === n);
