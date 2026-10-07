const promise = new Promise((_, reject) => {
  setTimeout(() => reject('failed'), 10);
});

promise.catch((reason) => console.log(reason));
