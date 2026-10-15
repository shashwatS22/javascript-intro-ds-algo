function makeCounter(): () => number {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}
const c = makeCounter();
console.log(c());
console.log(c());
console.log(c());