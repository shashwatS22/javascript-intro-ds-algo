function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
