import { test } from 'node:test';
import assert from 'node:assert/strict';
import { factorial } from './10-factorial.ts';

test('factorial', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});
