/**
 * ts-drills / 02-redo / 10-factorial
 *
 * TASK
 * Re-do `13-recursion/05-factorial`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function factorial(n: any): any {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}