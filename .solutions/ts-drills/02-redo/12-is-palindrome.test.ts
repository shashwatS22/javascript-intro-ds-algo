import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPalindrome } from './12-is-palindrome.ts';

test('isPalindrome', () => {
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('hello'), false);
  assert.equal(isPalindrome('a'), true);
});
