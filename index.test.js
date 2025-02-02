// Run test command: bun test
import { describe, test, expect } from 'bun:test';
import { ESTest, _typeof, isDisabledLibrary } from '.';

describe('Normal Cases', () => {  
  test('String', () => {
    expect(_typeof(ESTest('Hello World', 'string'))).toBe('object')
  })
})

describe('Default Setting', () => {
  test('isDisabledLibrary should be false', () => {
    expect(isDisabledLibrary).toBe(false);
  })
})