// ---- GIVEN ----
const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];
// ---------------

const json = JSON.stringify(people[0]);
console.log(json);
console.log(JSON.parse(json).name);
