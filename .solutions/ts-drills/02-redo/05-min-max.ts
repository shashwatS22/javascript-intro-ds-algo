export function minMax(numbers: number[]): { min: number; max: number } {
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}