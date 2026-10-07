const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 10));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 20));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 30));

Promise.all([p1, p2, p3]).then((results) => console.log(results.join(' ')));
