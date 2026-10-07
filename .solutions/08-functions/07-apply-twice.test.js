import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyTwice } from './07-apply-twice.js';

test('applies a function twice', () => {
  assert.equal(applyTwice((x) => x + 1, 5), 7);
  assert.equal(applyTwice((x) => x * 2, 3), 12);
});
