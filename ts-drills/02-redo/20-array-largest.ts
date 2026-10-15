/**
 * ts-drills / 02-redo / 20-array-largest
 *
 * TASK
 * Type the array. Print the largest value.
 *
 * EXPECTED OUTPUT
 * 9
 */

const nums: number[] = [4, 9, 2, 7];
let best = nums[0];
for (const n of nums) {
  if (n > best) best = n;
}
console.log(best);