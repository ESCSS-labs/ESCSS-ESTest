declare type _ALLOWED_TYPES = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'NaN' | 'symbol' | 'function' | 'regex'


declare type ChainType<T extends _ALLOWED_TYPES> =
  T extends 'undefined' ? ChainUndefined
  : T extends 'null' ? ChainNull
  : T extends 'array' ? ChainArray
  : T extends 'date' ? ChainDate
  : T extends 'object' ? ChainObject
  : T extends 'boolean' ? ChainBoolean
  : T extends 'NaN' ? ChainNaN
  : T extends 'number' ? ChainNumber
  : T extends 'bigint' ? ChainBigint
  : T extends 'string' ? ChainString
  : T extends 'symbol' ? ChainSymbol
  : T extends 'function' ? ChainFunction
  : T extends 'regex' ? ChainRegex
  : never

declare interface ChainUndefined {
}

declare interface ChainNull {
}

declare interface ChainArray {
  /**
   * @example 
   * // [1, 2, 3].length >= 3
   * ESTest([1, 2, 3], 'array').min(3) // pass
   */
  min(): ChainType<'array'>

  /**
   * @example 
   * // [1, 2, 3].length <= 3
   * ESTest([1, 2, 3], 'array').max(3) // pass
   */
  max(): ChainType<'array'>

  /**
   * @example 
   * // [1, 2, 3].length === 3
   * ESTest([1, 2, 3], 'array').length(3) // pass
   */
  length(): ChainType<'array'>

}

declare interface ChainDate {
}

declare interface ChainObject {
}

declare interface ChainBoolean {
}

declare interface ChainNaN {
}

declare interface ChainNumber {
  /**
   * @example 
   * // 5 < 10
   * ESTest(5, 'number').less(10) // pass
   */
  less(): ChainType<'number'>

  /**
   * @example 
   * // 5 <= 10
   * ESTest(5, 'number').max(10) // pass
   */
  max(): ChainType<'number'>

  /**
   * @example 
   * // 15 > 10
   * ESTest(15, 'number').greater(10) // pass
   */
  greater(): ChainType<'number'>

  /**
   * @example 
   * // 15 >= 10
   * ESTest(15, 'number').min(10) // pass
   */
  min(): ChainType<'number'>

  /**
   * @example 
   * // Number.isInteger(15)
   * ESTest(15, 'number').integer // pass 
   */
  integer(): ChainType<'number'>

  /**
   * @example 
   * // 15 > 0
   * ESTest(15, 'number').positive // pass 
   */
  positive(): ChainType<'number'>

  /**
   * @example 
   * // -15 < 0
   * ESTest(-15, 'number').negative // pass 
   */
  negative(): ChainType<'number'>

  /**
   * @example 
   * // 15 % 3 === 0
   * ESTest(15, 'number').multiple(3) // pass 
   */
  multiple(): ChainType<'number'>
}

declare interface ChainBigint {
}

declare interface ChainString {
  /**
   * @example 
   * // 'foo'.length <= 10
   * ESTest('foo', 'string').max(10) // pass
   */
  max(): ChainType<'string'>

  /**
   * @example 
   * // 'foo'.length >= 10
   * ESTest('foo', 'string').min(10) // pass
   */
  min(): ChainType<'string'>

  /**
   * @example 
   * // 'foo'.length === 10
   * ESTest('foo', 'string').length(10) // pass
   */
  length(): ChainType<'string'>

  /**
   * @example 
   * ESTest('foobar@gmail.com', 'string').email() // pass
   */
  email(): ChainType<'string'>

  /**
   * @example 
   * ESTest(crypto.randomUUID(), 'string').uuid() // pass
   */
  uuid(): ChainType<'string'>

  /**
   * @example 
   * ESTest('foo bar', 'string').regex(/(foo|bar)/) // pass
   */
  regex(): ChainType<'string'>

  /**
   * @example 
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  base64(): ChainType<'string'>

  /**
   * @example 
   * ESTest('192.168.1.1', 'string').ip() // pass ipv4
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip() // pass ipv6
   */
  ip(): ChainType<'string'>
}

declare interface ChainSymbol {
}

declare interface ChainFunction {
}

declare interface ChainRegex {
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * ```js
 * // core
 * Water filter: handle filter error and proceed with the happy path
 * ESTest(): console.error(...) // for general usage to achieve 100% coverage
 * unSafeESTest(): throw new Error(...) // for backend API validation. (try... catch)
 * 
 * // basic usage
 * ESTest(1, 'number')
 * ESTest('foo', 'string')
 * ESTest({}, 'object')
 * ESTest([], 'array')
 * ...
 * 
 * // advance usage
 * ESTest(1, 'number').min(1)
 * ESTest(1, 'number').min(1).max(10)
 * ESTest(1, 'string').email()
 * ESTest(1, 'string').regex(/foo/)
 * ...
 *
 * // Received feedback (public message will be visible in both dev and prod.)
 * ESTest(input, 'string', 'secret number: 12345') // custom you want
 * ESTest(input, 'string', '[libraryName] welcomes you to submit the issue at [target].') // for library author to get feedback
 * ESTest(input, 'string', 'Please note when the issue occurred and send the details to [target].') // for PM or non-tech users to get feedback
 * 
 * // use case (general usage)
 * function sum(a, b) {
 *  {
 *    ESTest(a, 'number')
 *    ESTest(a, 'number') 
 *  }
 * 
 *  return a + b
 * }
 * 
 */
export declare function ESTest<T extends _ALLOWED_TYPES>(input: unknown, type: T, pubMsg?: string): ChainType<T>

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * ```js
 * // core
 * Water filter: handle filter error and proceed with the happy path
 * ESTest(): console.error(...) // for general usage to achieve 100% coverage
 * unSafeESTest(): throw new Error(...) // for backend API validation. (try... catch)
 * 
 * // basic usage
 * ESTest(1, 'number')
 * ESTest('foo', 'string')
 * ESTest({}, 'object')
 * ESTest([], 'array')
 * ...
 * 
 * // advance usage
 * ESTest(1, 'number').min(1)
 * ESTest(1, 'number').min(1).max(10)
 * ESTest(1, 'string').email()
 * ESTest(1, 'string').regex(/foo/)
 * ...
 *
 * // Received feedback (public message will be visible in both dev and prod.)
 * ESTest(input, 'string', 'secret number: 12345') // custom you want
 * ESTest(input, 'string', '[libraryName] welcomes you to submit the issue at [target].') // for library author to get feedback
 * ESTest(input, 'string', 'Please note when the issue occurred and send the details to [target].') // for PM or non-tech users to get feedback
 * 
 * // use case (API validation)
 * app.post('/validate', async (req, res) => {
 *  try {
 *    const data = req.body
 *    {
 *      unSafeESTest(data.name, 'string').min(3) // default public message
 *      unSafeESTest(data.email, 'string').email() 
 *      unSafeESTest(data.age, 'number', 'Age must be at least 18').min(18) // custom public message
 *    }
 * 
 *    res.json({ message: 'Validation passed' })
 *  } catch (error) {
 *    res.status(400).json({ errors: error }) // public message(error message) from try {}
 *  }
 * })
 * 
 */
export declare function unSafeESTest<T extends _ALLOWED_TYPES>(input: unknown, type: T, pubMsg?: string): ChainType<T>