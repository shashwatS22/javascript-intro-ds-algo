// ---- GIVEN ----
const user = { name: "Ada", age: 36 };
// ---------------

user.city = 'London';
user.age = 37;
delete user.age;
console.log(Object.keys(user).join(' '));
