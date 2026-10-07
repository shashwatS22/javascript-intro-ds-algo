import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeMultiplier } from './08-make-multiplier.js';

test('creates a multiplier function', () => {
  const double = makeMultiplier(2);
  const triple = makeMultiplier(3);
  assert.equal(double(5), 10);
  assert.equal(triple(4), 12);
});
