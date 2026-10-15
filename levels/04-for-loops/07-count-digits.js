/**
 * 04-for-loops / 07-count-digits
 *
 * TASK
 * Print how many digits it has, using a loop (not `.toString()`).
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 5
 */

// ---- GIVEN ----
const n = 74821;
// ---------------

// Your code below 👇
let count = 0;
for (let i = n; i > 0; i = Math.floor(i / 10)){
    count++;
} 
console.log(count);