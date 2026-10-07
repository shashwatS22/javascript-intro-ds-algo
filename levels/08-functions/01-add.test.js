import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from './01-add.js';

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, 1), 0);
  assert.equal(add(0, 0), 0);
});
