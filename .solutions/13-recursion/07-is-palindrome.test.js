import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPalindrome } from './07-is-palindrome.js';

test('isPalindrome', () => {
  assert.equal(isPalindrome('racecar'), true);
  assert.equal(isPalindrome('hello'), false);
  assert.equal(isPalindrome('a'), true);
});
