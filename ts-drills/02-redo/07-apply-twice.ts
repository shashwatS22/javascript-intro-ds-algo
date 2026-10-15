/**
 * ts-drills / 02-redo / 07-apply-twice
 *
 * TASK
 * Re-do `08-functions/07-apply-twice`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function applyTwice(fn: any, value: any): any {
  return fn(fn(value));
}