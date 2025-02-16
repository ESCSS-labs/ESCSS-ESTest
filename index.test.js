import { ESTest, unsafeESTest } from '.';

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

describe('unsafeESTest', () => {
  describe('return object', () => {
    test('Undefined', () => {
      expect(typeof unsafeESTest(undefined, 'undefined')).toBe('object')
    })

    test('Null', () => {
      expect(typeof unsafeESTest(null, 'null')).toBe('object')
    })

    test('Array', () => {
      expect(typeof unsafeESTest([1, 2, 3], 'array')).toBe('object')
    })

    test('Date', () => {
      expect(typeof unsafeESTest(new Date(), 'date')).toBe('object')
    })

    test('object', () => {
      expect(typeof unsafeESTest({}, 'object')).toBe('object')
    })

    test('Boolean', () => {
      expect(typeof unsafeESTest(true, 'boolean')).toBe('object')
    })

    test('NaN', () => {
      expect(typeof unsafeESTest(NaN, 'NaN')).toBe('object')
    })

    test('Number', () => {
      expect(typeof unsafeESTest(1, 'number')).toBe('object')
    })

    test('Bigint', () => {
      expect(typeof unsafeESTest(1n, 'bigint')).toBe('object')
    })

    test('string', () => {
      expect(typeof unsafeESTest('Hello World', 'string')).toBe('object')
    })

    test('Symbol', () => {
      expect(typeof unsafeESTest(Symbol('foo'), 'symbol')).toBe('object')
    })

    test('Function', () => {
      expect(typeof unsafeESTest(function test() { }, 'function')).toBe('object')
    })

    test('Regex', () => {
      expect(typeof unsafeESTest(/foo/, 'regex')).toBe('object')
    })
  })
})