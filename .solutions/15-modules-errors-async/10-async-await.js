async function run() {
  const value = await new Promise((resolve) => {
    setTimeout(() => resolve('done'), 10);
  });
  console.log(value);
}

run();
