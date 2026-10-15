/**
 * ts-drills / 02-redo / 16-return-vs-log
 *
 * TASK
 * Type both functions (`number` return vs `void`). Same output as JS.
 *
 * EXPECTED OUTPUT
 * 5
 * 5
 * undefined
 */

function returnsFive(): number {
  return 5;
}

function logsFive(): void {
  console.log(5);
}

console.log(returnsFive());
console.log(logsFive());