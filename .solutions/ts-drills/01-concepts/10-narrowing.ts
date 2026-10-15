function describe(value: string | number): string {
  if (typeof value === 'string') {
    return `word: ${value.length}`;
  }
  return `num: ${value}`;
}

console.log(describe('hi'));
console.log(describe(7));