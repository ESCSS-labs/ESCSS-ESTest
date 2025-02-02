// Run test command: bun test
import { describe, test, expect } from 'bun:test';
import { ESTest, _typeof } from '.';

describe('Normal Cases', () => {  
  test('String', () => {
    expect(_typeof(ESTest('Hello World', 'string'))).toBe('object')
  })
})