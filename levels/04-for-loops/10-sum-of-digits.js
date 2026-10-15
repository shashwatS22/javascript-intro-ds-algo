/**
 * 04-for-loops / 10-sum-of-digits
 *
 * TASK
 * Print the sum of its digits.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 24
 */

// ---- GIVEN ----
const n = 9375;
// ---------------

// Your code below 👇
let sum = 0;
for (let i = n; i >0; i = Math.floor(i /10)){
    let digit = i % 10;
    sum = sum + digit
    
}
console.log(sum)