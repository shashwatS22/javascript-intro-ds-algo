import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isEven } from './04-is-even.js';

test('detects even and odd numbers', () => {
  assert.equal(isEven(4), true);
  assert.equal(isEven(7), false);
  assert.equal(isEven(0), true);
});
