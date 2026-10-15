/**
 * ts-drills / 02-redo / 22-destructure
 *
 * TASK
 * Destructure `name` and `city` with types. Print both lines.
 *
 * EXPECTED OUTPUT
 * Ada
 * London
 */

const person: { name: string; city: string; age: number } = {
  name: 'Ada',
  city: 'London',
  age: 28,
};
const { name, city } = person;
console.log(name);
console.log(city);