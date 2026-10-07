import { test } from 'node:test';
import assert from 'node:assert/strict';
import { multiply } from './02-arrow-multiply.js';

test('multiplies two numbers', () => {
  assert.equal(multiply(3, 4), 12);
  assert.equal(multiply(-2, 5), -10);
  assert.equal(multiply(0, 99), 0);
});
