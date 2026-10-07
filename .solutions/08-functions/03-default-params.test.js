import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greet } from './03-default-params.js';

test('greets with default greeting', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
});

test('greets with custom greeting', () => {
  assert.equal(greet('Riya', 'Hi'), 'Hi, Riya!');
});
