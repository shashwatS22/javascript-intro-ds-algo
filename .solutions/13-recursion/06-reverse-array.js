export function reverse(arr) {
  if (arr.length === 0) return [];
  return reverse(arr.slice(1)).concat(arr[0]);
}
