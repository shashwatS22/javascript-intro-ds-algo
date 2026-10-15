// ---- GIVEN ----
const n = 153;
// ---------------

let num = n;
let sum = 0;
let temp = num;
while (temp > 0) {
  const digit = temp % 10;
  sum += digit * digit * digit;
  temp = Math.floor(temp / 10);
}
if (sum === n) {
  console.log('armstrong');
} else {
  console.log('not armstrong');
}
