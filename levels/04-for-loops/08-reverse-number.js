/**
 * 04-for-loops / 08-reverse-number
 *
 * TASK
 * Print the number reversed, as a number.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 54321
 */

// ---- GIVEN ----
const n = 12345;
// ---------------

// Your code below 👇
let rev = 0;

for (let i = n; i > 0; i = Math.floor(i/10)){
    let digit = i % 10;
    rev =( rev * 10) + digit;
    
}
console.log(rev);