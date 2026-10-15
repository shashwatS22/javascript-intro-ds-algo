/**
 * ts-drills / 02-redo / 26-callback-steps
 *
 * TASK
 * Type `repeat` and callback. Print three steps.
 *
 * EXPECTED OUTPUT
 * step 0
 * step 1
 * step 2
 */

const times: number = 3;
function repeat(count: number, cb: (i: number) => void): void {
  for (let i = 0; i < count; i++) cb(i);
}
repeat(times, (i) => console.log(`step ${i}`));