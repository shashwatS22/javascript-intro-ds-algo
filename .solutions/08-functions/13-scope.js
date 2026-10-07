if (true) {
  let inner = 'block';
  console.log(inner);
}

let outer = 'function';
console.log(outer);

// Printing inner outside the block would throw ReferenceError
// because let is block-scoped and inner does not exist here.
