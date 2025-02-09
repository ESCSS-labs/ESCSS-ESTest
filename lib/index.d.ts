declare type ALLOWED_TOKEN_TYPES = 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex'
/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * ```js
 * ESTest(NaN, 'NaN')
 * ESTest([], 'array')
 * ESTest(null, 'null')
 * ESTest(undefined, 'undefined')
 * ESTest(new Date(), 'date')
 * ESTest(new RegExp(), 'regex')
 * ESTest(1, 'number')
 * ESTest('foo', 'string')
 * ESTest(true, 'boolean')
 * ESTest({}, 'object')
 * ESTest(1n, 'bigint')
 * ESTest(Symbol(), 'symbol')
 * ESTest(function () {}, 'function')
 * ESTest(1, 'object') // error
 * ESTest(1, 'object', 'foo')  // public message 'foo'
 * ```
 */

declare class chainString {
  /**
   * @example 
   * // 'foo'.length <= 10
   * ESTest('foo', 'string').max(10) // pass
   */
  static max(): void

  /**
   * @example 
   * // 'foo'.length >= 10
   * ESTest('foo', 'string').min(10) // pass
   */
  static min(): void

  /**
   * @example 
   * // 'foo'.length === 10
   * ESTest('foo', 'string').length(10) // pass
   */
  static length(): void

  /**
   * @example 
   * ESTest('foobar@gmail.com', 'string').email() // pass
   */
  static email(): void

  /**
   * @example 
   * ESTest(crypto.randomUUID(), 'string').uuid() // pass
   */
  static uuid(): void

  /**
   * @example 
   * ESTest('foo bar', 'string').regex(/(foo|bar)/) // pass
   */
  static regex(): void

  /**
   * @example 
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  static base64(): void

  /**
   * @example 
   * ESTest('192.168.1.1', 'string').ip() // pass ipv4
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip() // pass ipv6
   */
  static ip(): void
}

declare class chainNumber {
  /**
   * @example 
   * // 5 < 10
   * ESTest(5, 'number').less(10) // pass
   */
  static less(): void

  /**
   * @example 
   * // 5 <= 10
   * ESTest(5, 'number').max(10) // pass
   */
  static max(): void

  /**
   * @example 
   * // 15 > 10
   * ESTest(15, 'number').greater(10) // pass
   */
  static greater(): void

  /**
   * @example 
   * // 15 >= 10
   * ESTest(15, 'number').min(10) // pass
   */
  static min(): void

  /**
   * @example 
   * // Number.isInteger(15)
   * ESTest(15, 'number').integer // pass 
   */
  static integer(): void

  /**
   * @example 
   * // 15 > 0
   * ESTest(15, 'number').positive // pass 
   */
  static positive(): void

  /**
   * @example 
   * // -15 < 0
   * ESTest(-15, 'number').negative // pass 
   */
  static negative(): void

  /**
   * @example 
   * // 15 % 3 === 0
   * ESTest(15, 'number').multiple(3) // pass 
   */
  static multiple(): void
}

declare class chainArray {
  /**
   * @example 
   * // [1, 2, 3].length >= 3
   * ESTest([1, 2, 3], 'array').min(3) // pass
   */
  static min(): void

  /**
   * @example 
   * // [1, 2, 3].length <= 3
   * ESTest([1, 2, 3], 'array').max(3) // pass
   */
  static max(): void

  /**
   * @example 
   * // [1, 2, 3].length === 3
   * ESTest([1, 2, 3], 'array').length(3) // pass
   */
  static length(): void

}

declare class chainBoolean {
}

declare class chainUndefined {
}

declare class chainNull {
}

declare class chainDate {
}

declare class chainObject {
}

declare class chainNaN {
}

declare class chainBigint {
}

declare class chainSymbol {
}

declare class chainFunction {
}

declare class chainRegex {
}

declare class C {
  static test3(): void;
}

type ReturnClassType<T extends ALLOWED_TOKEN_TYPES> = T extends 'string'
  ? typeof chainString
  : T extends 'number'
  ? typeof chainNumber
  : T extends 'array'
  ? typeof chainArray
  : T extends 'boolean'
  ? typeof chainBoolean
  : T extends 'undefined'
  ? typeof chainUndefined
  : T extends 'null'
  ? typeof chainNull
  : T extends 'date'
  ? typeof chainDate
  : T extends 'object'
  ? typeof chainObject
  : T extends 'NaN'
  ? typeof chainNaN
  : T extends 'bigint'
  ? typeof chainBigint
  : T extends 'symbol'
  ? typeof chainSymbol
  : T extends 'function'
  ? typeof chainFunction
  : T extends 'regex'
  ? typeof chainRegex
  : never;

declare function ESTest<T extends ALLOWED_TOKEN_TYPES>(input: string, type: T, pubMsg?: string): ReturnClassType<T>;

