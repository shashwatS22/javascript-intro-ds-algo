// ---- GIVEN ----
const times = 3;
// ---------------

function repeat(times, callback) {
  for (let i = 0; i < times; i++) {
    callback(i);
  }
}

repeat(times, (i) => {
  console.log(`step ${i}`);
});
