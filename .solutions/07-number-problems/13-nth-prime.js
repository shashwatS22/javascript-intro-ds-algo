// ---- GIVEN ----
const k = 20;
// ---------------

let count = 0;
let candidate = 2;
while (count < k) {
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(candidate); j++) {
    if (candidate % j === 0) {
      isPrime = false;
      break;
    }
  }
  if (isPrime) {
    count++;
    if (count === k) {
      console.log(candidate);
      break;
    }
  }
  candidate++;
}
