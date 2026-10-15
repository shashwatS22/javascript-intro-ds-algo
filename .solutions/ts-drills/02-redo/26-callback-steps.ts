const times: number = 3;
function repeat(count: number, cb: (i: number) => void): void {
  for (let i = 0; i < count; i++) cb(i);
}
repeat(times, (i) => console.log(`step ${i}`));