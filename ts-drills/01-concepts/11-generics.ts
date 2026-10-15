/**
 * ts-drills / 01-concepts / 11-generics
 *
 * TASK
 * Write `identity<T>(value: T): T`. Print `identity<number>(42)`.
 *
 * EXPECTED OUTPUT
 * 42
 */

function identity(value) {
  return value;
}

console.log(identity(42));