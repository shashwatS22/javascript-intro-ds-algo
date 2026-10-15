/**
 * ts-drills / 02-redo / 03-greet
 *
 * TASK
 * Re-do `08-functions/03-default-params`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function greet(name: any, greeting = 'Hello'): any {
  return `${greeting}, ${name}!`;
}