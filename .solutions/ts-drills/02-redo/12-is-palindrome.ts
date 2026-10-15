export function isPalindrome(s: string): boolean {
  function check(left: number, right: number): boolean {
    if (left >= right) return true;
    if (s[left] !== s[right]) return false;
    return check(left + 1, right - 1);
  }
  return check(0, s.length - 1);
}