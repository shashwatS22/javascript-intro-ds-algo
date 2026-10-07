// ---- GIVEN ----
const s = "bareilly";
// ---------------

let reversed = '';
for (let i = s.length - 1; i >= 0; i--) {
  reversed += s[i];
}
console.log(reversed);
