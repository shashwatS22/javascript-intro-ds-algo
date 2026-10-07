import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumDigits } from './10-sum-digits.js';

test('sumDigits', () => {
  assert.equal(sumDigits(123), 6);
  assert.equal(sumDigits(0), 0);
  assert.equal(sumDigits(9375), 24);
});
