import { test } from 'node:test';
import assert from 'node:assert/strict';
import { factorial } from './05-factorial.js';

test('factorial', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});
