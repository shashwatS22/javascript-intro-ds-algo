/**
 * 04-for-loops / 12-fibonacci
 *
 * TASK
 * Print the first n Fibonacci numbers starting `0, 1`, one per line.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * See 12-fibonacci.expected.txt
 */

// ---- GIVEN ----
const n = 10;
// ---------------

// Your code below 👇
let a = 0 
let b = 1
let c = 0
console.log(a)
console.log(b)
for (let i = 0; i < n - 2; i++){
    c = a + b;
    console.log(c)
    a = b;
    b = c;
}