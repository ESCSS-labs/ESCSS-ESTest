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

  test('Array', () => {
    expect(_typeof(ESTest([1, 2, 3], 'array'))).toBe('object')
  })

  test('Boolean', () => {
    expect(_typeof(ESTest([], 'array'))).toBe('object')
  })

  test('Undefined', () => {
    expect(_typeof(ESTest(undefined, 'undefined'))).toBe('object')
  })

  test('Null', () => {
    expect(_typeof(ESTest(null, 'null'))).toBe('object')
  })

  test('Date', () => {
    expect(_typeof(ESTest(new Date(), 'date'))).toBe('object')
  })

  test('object', () => {
    expect(_typeof(ESTest({}, 'object'))).toBe('object')
  })
  
  test('NaN', () => {
    expect(_typeof(ESTest(NaN, 'NaN'))).toBe('object')
  })

  test('Bigint', () => {
    expect(_typeof(ESTest(1n, 'bigint'))).toBe('object')
  })

  test('Symbol', () => {
    expect(_typeof(ESTest(Symbol('test'), 'symbol'))).toBe('object')
  })

  test('Function', () => {
    expect(_typeof(ESTest(function test() {}, 'function'))).toBe('object')
  })

  test('Regex', () => {
    expect(_typeof(ESTest(/foo/, 'regex'))).toBe('object')
  })
})