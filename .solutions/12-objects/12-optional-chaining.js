// ---- GIVEN ----
const user = { name: "Ada" };
// ---------------

console.log(user.address?.city);
console.log(user.address?.city ?? 'unknown');
