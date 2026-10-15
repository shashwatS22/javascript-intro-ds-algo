/**
 * ts-drills / 02-redo / 15-sum-digits
 *
 * TASK
 * Re-do `13-recursion/10-sum-digits`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function sumDigits(n: any): any {
  if (n === 0) return 0;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}