/**
 * ts-drills / 02-redo / 27-closure-counter
 *
 * TASK
 * Type `makeCounter`. Print three calls.
 *
 * EXPECTED OUTPUT
 * 1
 * 2
 * 3
 */

function makeCounter(): () => number {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}
const c = makeCounter();
console.log(c());
console.log(c());
console.log(c());