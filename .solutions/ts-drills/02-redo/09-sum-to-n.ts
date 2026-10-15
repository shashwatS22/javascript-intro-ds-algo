export function sumTo(n: number): number {
  if (n <= 0) return 0;
  return n + sumTo(n - 1);
}