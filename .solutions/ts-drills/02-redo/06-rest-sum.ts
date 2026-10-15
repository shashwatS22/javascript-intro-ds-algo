export function sum(...numbers: number[]): number {
  return numbers.reduce((t, n) => t + n, 0);
}