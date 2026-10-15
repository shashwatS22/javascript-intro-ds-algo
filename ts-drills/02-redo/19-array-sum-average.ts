/**
 * ts-drills / 02-redo / 19-array-sum-average
 *
 * TASK
 * Type `nums: number[]`. Print sum then average.
 *
 * EXPECTED OUTPUT
 * 60
 * 20
 */

const nums: number[] = [10, 20, 30];
let sum = 0;
for (const n of nums) sum += n;
console.log(sum);
console.log(sum / nums.length);