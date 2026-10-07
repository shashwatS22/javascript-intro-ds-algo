export function applyTwice(fn, value) {
  return fn(fn(value));
}
