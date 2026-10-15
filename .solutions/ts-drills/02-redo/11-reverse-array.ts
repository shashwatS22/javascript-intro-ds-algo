export function reverse<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];
  return reverse(arr.slice(1)).concat(arr[0]);
}