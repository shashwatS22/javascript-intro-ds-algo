const nums: number[] = [1, 2, 3, 4];
let ok = true;
for (let i = 1; i < nums.length; i++) {
  if (nums[i] < nums[i - 1]) ok = false;
}
console.log(ok ? 'sorted' : 'not sorted');