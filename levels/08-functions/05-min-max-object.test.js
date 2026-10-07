import { test } from 'node:test';
import assert from 'node:assert/strict';
import { minMax } from './05-min-max-object.js';

test('finds min and max', () => {
  assert.deepEqual(minMax([3, 1, 4, 1, 5]), { min: 1, max: 5 });
  assert.deepEqual(minMax([-2, -8, -1]), { min: -8, max: -1 });
});
