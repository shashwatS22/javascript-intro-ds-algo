/**
 * 04-for-loops / 06-factorial
 *
 * TASK
 * Print n factorial using a loop.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 720
 */

// ---- GIVEN ----
const n = 6;
// ---------------

// Your code below 👇
let f = 1;
for (let i = 1; i <= n; i++){
    f = f * i;
}
console.log(f);
