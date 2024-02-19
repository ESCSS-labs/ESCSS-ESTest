import { expect, test, describe } from 'bun:test'
import { unitTest } from './unitTest'

describe('mode: type', () => {
  test('undefined', ()=> {
    expect(unitTest(undefined, 'undefined')).toBe('undefined')
  })

  test('null', ()=> {
    expect(unitTest(null, 'null')).toBe('null')
  })

  test('[]', ()=> {
    expect(unitTest([], 'array')).toBe('array')
  })

  test('{}', ()=> {
    expect(unitTest({}, 'object')).toBe('object')
  })

  test('boolean(true)', ()=> {
    expect(unitTest(true, 'boolean')).toBe('boolean')
  })

  test('boolean(false)', ()=> {
    expect(unitTest(false, 'boolean')).toBe('boolean')
  })

  test('NaN', ()=> {
    expect(unitTest(NaN, 'NaN')).toBe('NaN')
  })

  test('number', ()=> {
    expect(unitTest(123, 'number')).toBe('number')
  })

  test('123n', ()=> {
    expect(unitTest(123n, 'bigint')).toBe('bigint')
  })

  test('Hello World', ()=> {
    expect(unitTest('Hello World', 'string')).toBe('string')
  })

  test('Symbol()', ()=> {
    expect(unitTest(Symbol(), 'symbol')).toBe('symbol')
  })

  test('function () {}', ()=> {
    expect(unitTest(function () {}, 'function')).toBe('function')
  })

  test('Symbol()', ()=> {
    expect(unitTest(Symbol(), 'symbol')).toBe('symbol')
  })
})

describe('mode: operator', () => {
  test('1 < 5', ()=> {
    expect(unitTest(1, '<', 5)).toBe(true)
  })

  test('1 <= 5', ()=> {
    expect(unitTest(1, '<=', 5)).toBe(true)
  })

  test('5 > 1', ()=> {
    expect(unitTest(5, '>', 1)).toBe(true)
  })

  test('5 >= 1', ()=> {
    expect(unitTest(5, '>=', 1)).toBe(true)
  })

  test('1 === 1', ()=> {
    expect(unitTest(1, '===', 1)).toBe(true)
  })

  test('-1 !== 1', ()=> {
    expect(unitTest(-1, '!==', 1)).toBe(true)
  })

  test('error message', ()=> {
    expect(unitTest(-1, '!==', 1, 'word')).toBe(true)
  })
})

describe('error situation', () => {
  test('no params', ()=> {
    expect(() => unitTest()).toThrow()
  })
  
  test('wrong 2nd argument', ()=> {
    expect(() => unitTest(1, 123)).toThrow()
    expect(() => unitTest(1, 's')).toThrow()
    expect(() => unitTest(1, [])).toThrow()
    expect(() => unitTest(1, '==')).toThrow()
    expect(() => unitTest(1, '!=')).toThrow()
  })
  
  test('operator input is not number type', ()=> {
    expect(() => unitTest([], '<', 's')).toThrow()
  })

  test('4th argument is not string type', ()=> {
    expect(() => unitTest(10, '<', 1, 999)).toThrow()
  })
})
