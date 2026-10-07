import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum } from './06-rest-sum.js';

test('sums numbers', () => {
  assert.equal(sum(1, 2, 3), 6);
  assert.equal(sum(10), 10);
  assert.equal(sum(), 0);
});
