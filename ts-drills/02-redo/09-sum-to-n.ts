/**
 * ts-drills / 02-redo / 09-sum-to-n
 *
 * TASK
 * Re-do `13-recursion/04-sum-to-n`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function sumTo(n: any): any {
  if (n <= 0) return 0;
  return n + sumTo(n - 1);
}