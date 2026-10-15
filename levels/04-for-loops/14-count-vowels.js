/**
 * 04-for-loops / 14-count-vowels
 *
 * TASK
 * Loop over the characters and print the vowel count.
 *
 * DO NOT CHANGE the GIVEN values.
 *
 * EXPECTED OUTPUT
 * 6
 */

// ---- GIVEN ----
const s = "javascript is fun";
// ---------------
let count = 0
// Your code below 👇
for (let i = 0; i < s.length; i++){
    if (s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u') {
        count++;
    }
    
}
console.log(count)