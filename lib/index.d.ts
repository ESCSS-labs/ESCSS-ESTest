declare type _ALLOWED_TYPES =
  | "string"
  | "number"
  | "array"
  | "object"
  | "boolean"
  | "date"
  | "bigint"
  | "undefined"
  | "null"
  | "NaN"
  | "symbol"
  | "function"
  | "regex";

declare type _Chain<T extends _ALLOWED_TYPES> = T extends "string"
  ? _String
  : T extends "number"
    ? _Number
    : T extends "array"
      ? _Array
      : T extends "object"
        ? _Object
        : T extends "boolean"
          ? _Boolean
          : T extends "date"
            ? _Date
            : T extends "bigint"
              ? _Bigint
              : T extends "undefined"
                ? _Undefined
                : T extends "null"
                  ? _Null
                  : T extends "NaN"
                    ? _NaN
                    : T extends "symbol"
                      ? _Symbol
                      : T extends "function"
                        ? _Function
                        : T extends "regex"
                          ? _Regex
                          : never;

declare interface _Common<T extends _ALLOWED_TYPES> {
  /**
   * @example
   * // more information, doesn't do anything
   * ESTest('foo', 'string').description('a helpful information')
   */
  description(): _Chain<T>;
}

declare interface _String extends _Common<"string"> {
  /**
   * @example
   * // 'foo'.length <= 10
   * ESTest('foo', 'string').max(10) // pass
   */
  max(): _Chain<"string">;

  /**
   * @example
   * // 'foo'.length >= 10
   * ESTest('foo', 'string').min(10) // pass
   */
  min(): _Chain<"string">;

  /**
   * @example
   * // 'foo'.length === 10
   * ESTest('foo', 'string').length(10) // pass
   */
  length(): _Chain<"string">;

  /**
   * @example
   * ESTest('foobar@gmail.com', 'string').email() // pass
   */
  email(): _Chain<"string">;

  /**
   * @example
   * ESTest(crypto.randomUUID(), 'string').uuid() // pass
   */
  uuid(): _Chain<"string">;

  /**
   * @example
   * ESTest('foo bar', 'string').regex(/(foo|bar)/) // pass
   */
  regex(): _Chain<"string">;

  /**
   * @example
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  base64(): _Chain<"string">;

  /**
   * @example
   * ESTest('192.168.1.1', 'string').ip() // pass ipv4
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip() // pass ipv6
   */
  ip(): _Chain<"string">;
}

declare interface _Number extends _Common<"number"> {
  /**
   * @example
   * // 5 < 10
   * ESTest(5, 'number').less(10) // pass
   */
  less(): _Chain<"number">;

  /**
   * @example
   * // 5 <= 10
   * ESTest(5, 'number').max(10) // pass
   */
  max(): _Chain<"number">;

  /**
   * @example
   * // 15 > 10
   * ESTest(15, 'number').greater(10) // pass
   */
  greater(): _Chain<"number">;

  /**
   * @example
   * // 15 >= 10
   * ESTest(15, 'number').min(10) // pass
   */
  min(): _Chain<"number">;

  /**
   * @example
   * // Number.isInteger(15)
   * ESTest(15, 'number').integer() // pass
   */
  integer(): _Chain<"number">;

  /**
   * @example
   * // 15 > 0
   * ESTest(15, 'number').positive() // pass
   */
  positive(): _Chain<"number">;

  /**
   * @example
   * // -15 < 0
   * ESTest(-15, 'number').negative() // pass
   */
  negative(): _Chain<"number">;

  /**
   * @example
   * // 15 % 3 === 0
   * ESTest(15, 'number').multiple(3) // pass
   */
  multiple(): _Chain<"number">;
}

declare interface _Array extends _Common<"array"> {
  /**
   * @example
   * // [1, 2, 3].length >= 3
   * ESTest([1, 2, 3], 'array').min(3) // pass
   */
  min(): _Chain<"array">;

  /**
   * @example
   * // [1, 2, 3].length <= 3
   * ESTest([1, 2, 3], 'array').max(3) // pass
   */
  max(): _Chain<"array">;

  /**
   * @example
   * // [1, 2, 3].length === 3
   * ESTest([1, 2, 3], 'array').length(3) // pass
   */
  length(): _Chain<"array">;
}

declare interface _Object {}

declare interface _Boolean {}

declare interface _Date {}

declare interface _Bigint {}

declare interface _Undefined {}

declare interface _Null {}

declare interface _NaN {}

declare interface _Symbol {}

declare interface _Function {}

declare interface _Regex {}

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
export declare function ESTest<T extends _ALLOWED_TYPES>(
  input: unknown,
  type: T,
  pubMsg?: string,
): _Chain<T>;

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
export declare function unSafeESTest<T extends _ALLOWED_TYPES>(
  input: unknown,
  type: T,
  pubMsg?: string,
): _Chain<T>;

declare global {
  var __ESCSS_ESTEST__: {
    /**
     * @example
     * // A template message to get feedback from others
     *
     * // for library author:
     * '[libraryName] welcomes you to submit the issue at [link].'
     *
     * // for company:
     * 'Please note when the issue occurred and send the details to [link].'
     */
    publicMessage: string;
    /**
     * To disable ESTest / unSafeESTest, return undefined
     */
    isDisabled: boolean;
  };
}
