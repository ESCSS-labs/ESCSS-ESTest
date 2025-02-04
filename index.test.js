// Run test command: bun test
import { describe, test, expect } from 'bun:test';
import { ESTest, _typeof } from '.';

describe('Normal Cases', () => {  
  test('string', () => {
    expect(_typeof(ESTest('Hello World', 'string'))).toBe('object')
  })

  test('Number', () => {
    expect(_typeof(ESTest(1, 'number'))).toBe('object')
  })
})