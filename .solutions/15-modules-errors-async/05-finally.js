try {
  console.log('try ok');
} catch {
  console.log('caught');
} finally {
  console.log('finally');
}

try {
  throw new Error('fail');
} catch {
  console.log('caught');
} finally {
  console.log('finally');
}
