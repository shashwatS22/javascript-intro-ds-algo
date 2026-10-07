import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sumTo } from './04-sum-to-n.js';

test('sumTo adds 1 through n', () => {
  assert.equal(sumTo(5), 15);
  assert.equal(sumTo(1), 1);
  assert.equal(sumTo(0), 0);
});
