/**
 * 04-for-loops / 04-sum-to-n
 *
 * TASK
 * Print the sum of 1 to n.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 5050
 */

// ---- GIVEN ----
const n = 100;
// ---------------

// Your code below 👇
let sum = 0;
for (let i = 1; i <= n; i++){
    sum = sum + i;
}
console.log(sum)
