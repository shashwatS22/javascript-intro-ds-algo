// ---- GIVEN ----
const s = "javascript is fun";
// ---------------

let count = 0;
for (let i = 0; i < s.length; i++) {
  if ('aeiou'.includes(s[i])) {
    count++;
  }
}
console.log(count);
