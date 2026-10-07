import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reverse } from './06-reverse-array.js';

test('reverse returns a new reversed array', () => {
  const original = [1, 2, 3];
  const result = reverse(original);
  assert.deepEqual(result, [3, 2, 1]);
  assert.deepEqual(original, [1, 2, 3]);
});
