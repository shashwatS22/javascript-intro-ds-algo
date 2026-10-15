/**
 * ts-drills / 02-redo / 14-power
 *
 * TASK
 * Re-do `13-recursion/09-power`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function power(base: any, exp: any): any {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}