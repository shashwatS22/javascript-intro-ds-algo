import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, compareOutput, buildDiff } from '../grade.js';

test('exact match', () => {
  assert.equal(compareOutput('hello', 'hello'), true);
});

test('trailing whitespace per line is ignored', () => {
  assert.equal(compareOutput('hello   \nworld  ', 'hello\nworld'), true);
});

test('Windows line endings are normalised', () => {
  assert.equal(compareOutput('a\r\nb', 'a\nb'), true);
});

test('trailing blank lines are stripped', () => {
  assert.equal(compareOutput('hello\n\n\n', 'hello'), true);
});

test('empty actual fails against non-empty expected', () => {
  assert.equal(compareOutput('', 'hello'), false);
});

test('longer actual than expected fails', () => {
  assert.equal(compareOutput('hello\nextra', 'hello'), false);
});

test('buildDiff marks first difference', () => {
  const diff = buildDiff('a\nb\nc', 'a\nx\nc');
  assert.equal(diff.firstDiffIndex, 1);
  assert.equal(diff.rows[1].isFirstDiff, true);
});

test('normalize strips trailing whitespace and newlines', () => {
  assert.equal(normalize('  hi  \n'), '  hi');
});
