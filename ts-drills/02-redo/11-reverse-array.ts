/**
 * ts-drills / 02-redo / 11-reverse-array
 *
 * TASK
 * Re-do `13-recursion/06-reverse-array`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function reverse(arr: any): any {
  if (arr.length === 0) return [];
  return reverse(arr.slice(1)).concat(arr[0]);
}