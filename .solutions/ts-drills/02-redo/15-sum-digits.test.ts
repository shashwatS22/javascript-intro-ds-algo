import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumDigits } from './15-sum-digits.ts';

test('sumDigits', () => {
  assert.equal(sumDigits(123), 6);
  assert.equal(sumDigits(0), 0);
  assert.equal(sumDigits(9375), 24);
});
