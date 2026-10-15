/**
 * ts-drills / 02-redo / 13-fibonacci
 *
 * TASK
 * Re-do `13-recursion/08-fibonacci`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function fib(n: any): any {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fib(n - 1) + fib(n - 2);
}