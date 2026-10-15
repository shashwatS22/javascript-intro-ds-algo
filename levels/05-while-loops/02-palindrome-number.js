/**
 * 05-while-loops / 02-palindrome-number
 *
 * TASK
 * Print `palindrome` or `not palindrome`.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * palindrome
 */

// ---- GIVEN ----
const n = 12321;
// ---------------

// Your code below 👇
let i = n;
let rev = 0;
while (i > 0) {
    let digit = i % 10;
    rev = (rev * 10) + digit;
    i = Math.floor(i / 10);
}
if (rev == n) {
  console.log("palindrome");
} else {
    console.log("not palindrome");
}
