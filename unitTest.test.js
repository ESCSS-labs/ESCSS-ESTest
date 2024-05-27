import { expect, test, describe } from 'bun:test'
import { ESTest } from './unitTest'

describe('mode: type', () => {
  test('undefined', ()=> {
    expect(ESTest(undefined, 'undefined')).toBe('undefined')
  })

  test('null', ()=> {
    expect(ESTest(null, 'null')).toBe('null')
  })

  test('array', ()=> {
    expect(ESTest([], 'array')).toBe('array')
  })

  test('object', ()=> {
    expect(ESTest({}, 'object')).toBe('object')
  })

  test('boolean', ()=> {
    expect(ESTest(true, 'boolean')).toBe('boolean')
  })

  test('NaN', ()=> {
    expect(ESTest(NaN, 'NaN')).toBe('NaN')
  })

  test('number', ()=> {
    expect(ESTest(123, 'number')).toBe('number')
  })

  test('bigint', ()=> {
    expect(ESTest(123n, 'bigint')).toBe('bigint')
  })

  test('string', ()=> {
    expect(ESTest('Hello World', 'string')).toBe('string')
  })

  test('symbol', ()=> {
    expect(ESTest(Symbol(), 'symbol')).toBe('symbol')
  })

  test('function', ()=> {
    expect(ESTest(function () {}, 'function')).toBe('function')
  })

  test('number w/ errMsg', ()=> {
    expect(ESTest(123, 'number', 'number text')).toBe('number')
  })
})

describe('mode: operator', () => {
  test('1 < 5', ()=> {
    expect(ESTest(1, '<', 5)).toBe(true)
  })

  test('1 <= 5', ()=> {
    expect(ESTest(1, '<=', 5)).toBe(true)
  })

  test('5 > 1', ()=> {
    expect(ESTest(5, '>', 1)).toBe(true)
  })

  test('5 >= 1', ()=> {
    expect(ESTest(5, '>=', 1)).toBe(true)
  })

  test('1 === 1', ()=> {
    expect(ESTest(1, '===', 1)).toBe(true)
  })

  test('-1 !== 1', ()=> {
    expect(ESTest(-1, '!==', 1)).toBe(true)
  })

  test('error message', ()=> {
    expect(ESTest(-1, '!==', 1, 'word')).toBe(true)
  })
})

describe('error situation', () => {
  test('no params', ()=> {
    expect(() => ESTest()).toThrow()
  })
  
  test('wrong 2nd argument', ()=> {
    expect(() => ESTest(1, 123)).toThrow()
    expect(() => ESTest(1, 's')).toThrow()
    expect(() => ESTest(1, [])).toThrow()
    expect(() => ESTest(1, '==')).toThrow()
    expect(() => ESTest(1, '!=')).toThrow()
  })

  test('type errMsg 3th argument should be type: string | undefined', ()=> {
    expect(() => ESTest(10, 'number', {})).toThrow()
  })

  test('operator errMsg 4th argument should be type: string | undefined', ()=> {
    expect(() => ESTest(10, '>', 1, {})).toThrow()
  })
})
