// Run test command: bun test
import { describe, test, expect } from 'bun:test';
import { ESTest, _tokenTypeof, isDisabledLibrary } from '.';

describe('Normal Cases', () => {  
  test('String', () => {
    expect(_tokenTypeof(ESTest('Hello World', 'String'))).toBe('Object')
  })
})

describe('Default Setting', () => {
  test('isDisabledLibrary should be false', () => {
    expect(isDisabledLibrary).toBe(false);
  })
})