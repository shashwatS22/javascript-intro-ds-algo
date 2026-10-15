import { test } from 'node:test';
import assert from 'node:assert/strict';
import { power } from './14-power.ts';

test('power', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(5, 0), 1);
  assert.equal(power(3, 4), 81);
});
