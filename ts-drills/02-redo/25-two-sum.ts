/**
 * ts-drills / 02-redo / 25-two-sum
 *
 * TASK
 * Type `arr` and `target`. Print indices space-separated using a Map.
 *
 * EXPECTED OUTPUT
 * 0 1
 */

const arr: number[] = [2, 7, 11, 15];
const target: number = 9;
const seen = new Map<number, number>();
let result: [number, number] | null = null;
for (let i = 0; i < arr.length; i++) {
  const need = target - arr[i];
  if (seen.has(need)) {
    result = [seen.get(need)!, i];
    break;
  }
  seen.set(arr[i], i);
}
console.log(result!.join(' '));