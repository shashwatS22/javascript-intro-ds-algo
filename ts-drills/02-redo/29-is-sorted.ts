/**
 * ts-drills / 02-redo / 29-is-sorted
 *
 * TASK
 * Type array. Print `sorted` or `not sorted`.
 *
 * EXPECTED OUTPUT
 * sorted
 */

const nums: number[] = [1, 2, 3, 4];
let ok = true;
for (let i = 1; i < nums.length; i++) {
  if (nums[i] < nums[i - 1]) ok = false;
}
console.log(ok ? 'sorted' : 'not sorted');