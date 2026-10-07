// ---- GIVEN ----
const people = [
  { name: "Ada", age: 36, city: "London" },
  { name: "Raman", age: 42, city: "Kolkata" },
  { name: "Meera", age: 29, city: "Pune" },
];
// ---------------

console.log(
  [...people]
    .sort((a, b) => a.age - b.age)
    .map((person) => person.name)
    .join(' '),
);
