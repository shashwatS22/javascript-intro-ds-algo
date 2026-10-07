// ---- GIVEN ----
const n = 36;
// ---------------

const divisors = [];
for (let i = 1; i <= n; i++) {
  if (n % i === 0) {
    divisors.push(i);
  }
}
console.log(divisors.join(' '));
