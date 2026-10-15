export function makeMultiplier(n: number): (value: number) => number {
  return (value) => value * n;
}