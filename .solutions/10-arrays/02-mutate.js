// ---- GIVEN ----
const arr = [2, 3];
// ---------------

arr.push(4);
arr.unshift(1);
console.log(arr.join(' '));
arr.pop();
arr.shift();
console.log(arr.join(' '));
