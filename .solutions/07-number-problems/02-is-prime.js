// ---- GIVEN ----
const n = 97;
// ---------------

let prime = n >= 2;
for (let i = 2; i <= Math.sqrt(n); i++) {
  if (n % i === 0) {
    prime = false;
    break;
  }
}
console.log(prime ? 'prime' : 'not prime');
