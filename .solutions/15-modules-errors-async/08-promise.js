const promise = new Promise((resolve) => {
  setTimeout(() => resolve('done'), 10);
});

promise.then((value) => console.log(value));
