// ---- GIVEN ----
const s = "programming";
// ---------------

let result = '';
for (let i = 0; i < s.length; i++) {
  if (!result.includes(s[i])) {
    result += s[i];
  }
}
console.log(result);
