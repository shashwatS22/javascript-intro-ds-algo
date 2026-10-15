/**
 * ts-drills / 02-redo / 12-is-palindrome
 *
 * TASK
 * Re-do `13-recursion/07-is-palindrome`. Replace every `any` with proper types.
 *
 *
 * EXPORT
 * Same exports as the JS version.

 * EXPECTED OUTPUT
 * All tests pass
 */

export function isPalindrome(s: any): any {
  function check(left: any, right: any): any {
    if (left >= right) return true;
    if (s[left] !== s[right]) return false;
    return check(left + 1, right - 1);
  }
  return check(0, s.length - 1);
}