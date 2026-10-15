export function sumDigits(n: number): number {
  if (n === 0) return 0;
  return (n % 10) + sumDigits(Math.floor(n / 10));
}