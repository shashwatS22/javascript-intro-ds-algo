const s: string = 'level';
let left = 0;
let right = s.length - 1;
let ok = true;
while (left < right) {
  if (s[left] !== s[right]) ok = false;
  left++;
  right--;
}
console.log(ok ? 'yes' : 'no');