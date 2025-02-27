declare type _ALLOWED_TYPES = 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex'


declare type ChainType<T extends _ALLOWED_TYPES> =
  T extends 'undefined' ? typeof chainUndefined
  : T extends 'null' ? typeof chainNull
  : T extends 'array' ? typeof chainArray
  : T extends 'date' ? typeof chainDate
  : T extends 'object' ? typeof chainObject
  : T extends 'boolean' ? typeof chainBoolean
  : T extends 'NaN' ? typeof chainNaN
  : T extends 'number' ? typeof chainNumber
  : T extends 'bigint' ? typeof chainBigint
  : T extends 'string' ? typeof chainString
  : T extends 'symbol' ? typeof chainSymbol
  : T extends 'function' ? typeof chainFunction
  : T extends 'regex' ? typeof chainRegex
  : never

declare class chainUndefined {
}

declare class chainNull {
}

declare class chainArray {
  /**
   * @example 
   * // [1, 2, 3].length >= 3
   * ESTest([1, 2, 3], 'array').min(3) // pass
   */
  static min(): ChainType<'array'>

  /**
   * @example 
   * // [1, 2, 3].length <= 3
   * ESTest([1, 2, 3], 'array').max(3) // pass
   */
  static max(): ChainType<'array'>

  /**
   * @example 
   * // [1, 2, 3].length === 3
   * ESTest([1, 2, 3], 'array').length(3) // pass
   */
  static length(): ChainType<'array'>

}

declare class chainDate {
}

declare class chainObject {
}

declare class chainBoolean {
}

declare class chainNaN {
}

declare class chainNumber {
  /**
   * @example 
   * // 5 < 10
   * ESTest(5, 'number').less(10) // pass
   */
  static less(): ChainType<'number'>

  /**
   * @example 
   * // 5 <= 10
   * ESTest(5, 'number').max(10) // pass
   */
  static max(): ChainType<'number'>

  /**
   * @example 
   * // 15 > 10
   * ESTest(15, 'number').greater(10) // pass
   */
  static greater(): ChainType<'number'>

  /**
   * @example 
   * // 15 >= 10
   * ESTest(15, 'number').min(10) // pass
   */
  static min(): ChainType<'number'>

  /**
   * @example 
   * // Number.isInteger(15)
   * ESTest(15, 'number').integer // pass 
   */
  static integer(): ChainType<'number'>

  /**
   * @example 
   * // 15 > 0
   * ESTest(15, 'number').positive // pass 
   */
  static positive(): ChainType<'number'>

  /**
   * @example 
   * // -15 < 0
   * ESTest(-15, 'number').negative // pass 
   */
  static negative(): ChainType<'number'>

  /**
   * @example 
   * // 15 % 3 === 0
   * ESTest(15, 'number').multiple(3) // pass 
   */
  static multiple(): ChainType<'number'>
}

declare class chainBigint {
}

declare class chainString {
  /**
   * @example 
   * // 'foo'.length <= 10
   * ESTest('foo', 'string').max(10) // pass
   */
  static max(): ChainType<'string'>

  /**
   * @example 
   * // 'foo'.length >= 10
   * ESTest('foo', 'string').min(10) // pass
   */
  static min(): ChainType<'string'>

  /**
   * @example 
   * // 'foo'.length === 10
   * ESTest('foo', 'string').length(10) // pass
   */
  static length(): ChainType<'string'>

  /**
   * @example 
   * ESTest('foobar@gmail.com', 'string').email() // pass
   */
  static email(): ChainType<'string'>

  /**
   * @example 
   * ESTest(crypto.randomUUID(), 'string').uuid() // pass
   */
  static uuid(): ChainType<'string'>

  /**
   * @example 
   * ESTest('foo bar', 'string').regex(/(foo|bar)/) // pass
   */
  static regex(): ChainType<'string'>

  /**
   * @example 
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  static base64(): ChainType<'string'>

  /**
   * @example 
   * ESTest('192.168.1.1', 'string').ip() // pass ipv4
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip() // pass ipv6
   */
  static ip(): ChainType<'string'>
}

declare class chainSymbol {
}

declare class chainFunction {
}

declare class chainRegex {
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

export declare const config: { 
  /**
   * Designed to help debug
   * @example 
   * // for library author
   * [libraryName] welcomes you to submit the issue at [target].
   * 
   * @example
   * // for company (PMs or non-tech users)
   * Please note when the issue occurred and send the details to [target].
   */
  publicMessage: string 
}