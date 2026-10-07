// ---- GIVEN ----
const n = 12321;
// ---------------

let num = n;
let reversed = 0;
let temp = num;
while (temp > 0) {
  reversed = reversed * 10 + (temp % 10);
  temp = Math.floor(temp / 10);
}
if (reversed === n) {
  console.log('palindrome');
} else {
  console.log('not palindrome');
}
