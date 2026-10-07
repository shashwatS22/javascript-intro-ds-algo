try {
  JSON.parse('not json');
} catch {
  console.log('caught an error');
}
console.log('still running');
