/**
 * ts-drills / 02-redo / 21-reduce-sum
 *
 * TASK
 * Type `nums` and print sum via `reduce`.
 *
 * EXPECTED OUTPUT
 * 10
 */

const nums: number[] = [1, 2, 3, 4];
console.log(nums.reduce((a, b) => a + b, 0));