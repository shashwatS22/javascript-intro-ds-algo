/**
 * ts-drills / 02-redo / 17-string-reverse
 *
 * TASK
 * Type `s: string`. Reverse with a loop.
 *
 * EXPECTED OUTPUT
 * yllierab
 */

const s: string = 'bareilly';
let out = '';
for (let i = s.length - 1; i >= 0; i--) {
  out += s[i];
}
console.log(out);