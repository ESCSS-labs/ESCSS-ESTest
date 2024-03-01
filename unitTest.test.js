import { expect, test, describe } from 'bun:test'
import { es } from './unitTest'

describe('mode: type', () => {
  test('undefined', ()=> {
    expect(es.unitTest(undefined, 'undefined')).toBe('undefined')
  })

  test('null', ()=> {
    expect(es.unitTest(null, 'null')).toBe('null')
  })

  test('array', ()=> {
    expect(es.unitTest([], 'array')).toBe('array')
  })

  test('object', ()=> {
    expect(es.unitTest({}, 'object')).toBe('object')
  })

  test('boolean', ()=> {
    expect(es.unitTest(true, 'boolean')).toBe('boolean')
  })

  test('NaN', ()=> {
    expect(es.unitTest(NaN, 'NaN')).toBe('NaN')
  })

  test('number', ()=> {
    expect(es.unitTest(123, 'number')).toBe('number')
  })

  test('bigint', ()=> {
    expect(es.unitTest(123n, 'bigint')).toBe('bigint')
  })

  test('string', ()=> {
    expect(es.unitTest('Hello World', 'string')).toBe('string')
  })

  test('symbol', ()=> {
    expect(es.unitTest(Symbol(), 'symbol')).toBe('symbol')
  })

  test('function', ()=> {
    expect(es.unitTest(function () {}, 'function')).toBe('function')
  })
})

describe('mode: operator', () => {
  test('1 < 5', ()=> {
    expect(es.unitTest(1, '<', 5)).toBe(true)
  })

  test('1 <= 5', ()=> {
    expect(es.unitTest(1, '<=', 5)).toBe(true)
  })

  test('5 > 1', ()=> {
    expect(es.unitTest(5, '>', 1)).toBe(true)
  })

  test('5 >= 1', ()=> {
    expect(es.unitTest(5, '>=', 1)).toBe(true)
  })

  test('1 === 1', ()=> {
    expect(es.unitTest(1, '===', 1)).toBe(true)
  })

  test('-1 !== 1', ()=> {
    expect(es.unitTest(-1, '!==', 1)).toBe(true)
  })

  test('error message', ()=> {
    expect(es.unitTest(-1, '!==', 1, 'word')).toBe(true)
  })
})

describe('error situation', () => {
  test('no params', ()=> {
    expect(() => es.unitTest()).toThrow()
  })
  
  test('wrong 2nd argument', ()=> {
    expect(() => es.unitTest(1, 123)).toThrow()
    expect(() => es.unitTest(1, 's')).toThrow()
    expect(() => es.unitTest(1, [])).toThrow()
    expect(() => es.unitTest(1, '==')).toThrow()
    expect(() => es.unitTest(1, '!=')).toThrow()
  })
  
  test('operator input is not number type', ()=> {
    expect(() => es.unitTest([], '<', 's')).toThrow()
  })

  test('4th argument is not string type', ()=> {
    expect(() => es.unitTest(10, '<', 1, 999)).toThrow()
  })
})
