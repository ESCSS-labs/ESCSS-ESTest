import { ESTest, unSafeESTest, config } from '.';

/* test command:
  - npm install bun --global
  - bun test
*/

describe('ESTest', () => {
  describe('return object', () => {
    test('Undefined', () => {
      expect(typeof ESTest(undefined, 'undefined')).toBe('object')
    })

    test('Null', () => {
      expect(typeof ESTest(null, 'null')).toBe('object')
    })

    test('Array', () => {
      expect(typeof ESTest([1, 2, 3], 'array')).toBe('object')
    })

    test('Date', () => {
      expect(typeof ESTest(new Date(), 'date')).toBe('object')
    })

    test('object', () => {
      expect(typeof ESTest({}, 'object')).toBe('object')
    })

    test('Boolean', () => {
      expect(typeof ESTest(true, 'boolean')).toBe('object')
    })

    test('NaN', () => {
      expect(typeof ESTest(NaN, 'NaN')).toBe('object')
    })

    test('Number', () => {
      expect(typeof ESTest(1, 'number')).toBe('object')
    })

    test('Bigint', () => {
      expect(typeof ESTest(1n, 'bigint')).toBe('object')
    })

    test('string', () => {
      expect(typeof ESTest('Hello World', 'string')).toBe('object')
    })

    test('Symbol', () => {
      expect(typeof ESTest(Symbol('foo'), 'symbol')).toBe('object')
    })

    test('Function', () => {
      expect(typeof ESTest(function test() { }, 'function')).toBe('object')
    })

    test('Regex', () => {
      expect(typeof ESTest(/foo/, 'regex')).toBe('object')
    })
  })
})

describe('unSafeESTest', () => {
  describe('return object', () => {
    test('Undefined', () => {
      expect(typeof unSafeESTest(undefined, 'undefined')).toBe('object')
    })

    test('Null', () => {
      expect(typeof unSafeESTest(null, 'null')).toBe('object')
    })

    test('Array', () => {
      expect(typeof unSafeESTest([1, 2, 3], 'array')).toBe('object')
    })

    test('Date', () => {
      expect(typeof unSafeESTest(new Date(), 'date')).toBe('object')
    })

    test('object', () => {
      expect(typeof unSafeESTest({}, 'object')).toBe('object')
    })

    test('Boolean', () => {
      expect(typeof unSafeESTest(true, 'boolean')).toBe('object')
    })

    test('NaN', () => {
      expect(typeof unSafeESTest(NaN, 'NaN')).toBe('object')
    })

    test('Number', () => {
      expect(typeof unSafeESTest(1, 'number')).toBe('object')
    })

    test('Bigint', () => {
      expect(typeof unSafeESTest(1n, 'bigint')).toBe('object')
    })

    test('string', () => {
      expect(typeof unSafeESTest('Hello World', 'string')).toBe('object')
    })

    test('Symbol', () => {
      expect(typeof unSafeESTest(Symbol('foo'), 'symbol')).toBe('object')
    })

    test('Function', () => {
      expect(typeof unSafeESTest(function test() { }, 'function')).toBe('object')
    })

    test('Regex', () => {
      expect(typeof unSafeESTest(/foo/, 'regex')).toBe('object')
    })
  })
})

describe('config', () => {
  test('publicMessage', () => {
    expect(config.publicMessage).toBe('Customize your public message, visible in development / production.')
  })
})