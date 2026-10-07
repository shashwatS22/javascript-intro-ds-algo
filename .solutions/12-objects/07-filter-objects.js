// ---- GIVEN ----
const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];
// ---------------

console.log(
  people
    .filter((person) => person.age > 30)
    .map((person) => person.name)
    .join(', '),
);
