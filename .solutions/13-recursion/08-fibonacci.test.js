import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fib } from './08-fibonacci.js';

test('fibonacci', () => {
  assert.equal(fib(0), 0);
  assert.equal(fib(1), 1);
  assert.equal(fib(6), 8);
});
