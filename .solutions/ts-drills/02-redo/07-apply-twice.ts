export function applyTwice(fn: (x: number) => number, value: number): number {
  return fn(fn(value));
}