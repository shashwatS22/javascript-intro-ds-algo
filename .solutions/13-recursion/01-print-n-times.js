function printNTimes(n) {
  if (n === 0) return;
  console.log('learning');
  printNTimes(n - 1);
}
printNTimes(4);
