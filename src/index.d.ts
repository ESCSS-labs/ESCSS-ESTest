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
  | "regex"
  // optional(?)
  | "string?"
  | "number?"
  | "array?"
  | "object?"
  | "boolean?"
  | "bigint?";

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

declare interface _Object extends _Common<"object"> {}

declare interface _Boolean extends _Common<"boolean"> {}

declare interface _Date extends _Common<"date"> {}

declare interface _Bigint extends _Common<"bigint"> {}

declare interface _Undefined extends _Common<"undefined"> {}

declare interface _Null extends _Common<"null"> {}

declare interface _NaN extends _Common<"NaN"> {}

declare interface _Symbol extends _Common<"symbol"> {}

declare interface _Function extends _Common<"function"> {}

declare interface _Regex extends _Common<"regex"> {}

/**
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function ESTest<T extends _ALLOWED_TYPES>(
  input: unknown,
  type: T,
  pubMsg?: string,
): _Chain<T>;

/**
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function unSafeESTest<T extends _ALLOWED_TYPES>(
  input: unknown,
  type: T,
  pubMsg?: string,
): _Chain<T>;

/**
 * - // Same as ESTest just used for "library" to wrap default public message
 * @example
 *
 * export function ESTest(input, type, pubMsg = "[libraryName] your message for others to help debugging") {
 *  return baseESTest(input, type, pubMsg)
 * }
 *
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function baseESTest<T extends _ALLOWED_TYPES>(
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
     * // Example 1: for library author:
     * '[libraryName] welcomes you to submit the issue at [link].'
     *
     * // Example 2: for company:
     * 'Please note when the issue occurred and send the details to [link].'
     */
    publicMessage: string;
    /**
     * // Note: unSafeESTest won't be disabled (security reason).
     * @example
     * // To disable ESTest (default: false)
     * globalThis.__ESCSS_ESTEST__.isESTestDisabled = true
     */
    isESTestDisabled: boolean;
    /**
     * library information
     */
    information: string;
  };
}
