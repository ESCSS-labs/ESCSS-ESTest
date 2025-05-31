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
  | "nan"
  | "symbol"
  | "function"
  | "regexp"
  // optional(?)
  | "string?"
  | "number?"
  | "array?"
  | "object?"
  | "boolean?"
  | "bigint?";

declare type _Chain<T extends _ALLOWED_TYPES> = T extends "string" | "string?"
  ? _String
  : T extends "number" | "number?"
    ? _Number
    : T extends "array" | "array?"
      ? _Array
      : T extends "object" | "object?"
        ? _Object
        : T extends "boolean" | "boolean?"
          ? _Boolean
          : T extends "date"
            ? _Date
            : T extends "bigint" | "bigint?"
              ? _BigInt
              : T extends "undefined"
                ? _Undefined
                : T extends "null"
                  ? _Null
                  : T extends "nan"
                    ? _NaN
                    : T extends "symbol"
                      ? _Symbol
                      : T extends "function"
                        ? _Function
                        : T extends "regexp"
                          ? _RegExp
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
   * // Zod's default email regex (Gmail rules)
   * ESTest("foo@gmail.com", "string").email(); // pass
   *
   * // Equivalent to the HTML5 input[type=email] validation implemented by browsers.
   * ESTest("john.doe+@example-domain.com", "string").email("html5Email"); // pass
   *
   * // The classic emailregex.com regex for RFC 5322-compliant emails
   * ESTest("user.tag+filter@sub.example-domain.co.uk", "string").email("rfc5322Email"); // pass
   *
   * // A loose regex that allows Unicode characters, enforces length limits, and that's about it.
   * ESTest("user.name123@example-domain.com", "string").email("unicodeEmail"); // pass
   */
  email(): _Chain<"string">;

  /**
   * @example
   * ESTest('550e8400-e29b-41d4-a716-446655440000', 'string').uuid4() // pass
   */
  uuid4(): _Chain<"string">;

  /**
   * @example
   * ESTest('0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d', 'string').uuid7() // pass
   */
  uuid7(): _Chain<"string">;

  /**
   * @example
   * ESTest('foo bar', 'string').regexp(/(foo|bar)/) // pass
   */
  regexp(): _Chain<"string">;

  /**
   * @example
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  base64(): _Chain<"string">;

  /**
   * @example
   * ESTest('Zm9vYmFyXzEyMw', 'string').base64url() // pass
   */
  base64url(): _Chain<"string">;

  /**
   * @example
   * ESTest('192.168.1.1', 'string').ip4() // pass
   */
  ip4(): _Chain<"string">;

  /**
   * @example
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip6() // pass
   */
  ip6(): _Chain<"string">;

  /**
   * @example
   * ESTest('192.168.0.0/16', 'string').cidr4() // pass
   */
  cidr4(): _Chain<"string">;

  /**
   * @example
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334/16', 'string').cidr6() // pass
   */
  cidr6(): _Chain<"string">;

  /**
   * @example
   * ESTest('🌀', 'string').emoji() // pass
   */
  emoji(): _Chain<"string">;

  /**
   * @example
   * // international phone
   * ESTest('+886912345678', 'string').e164() // pass
   * ESTest('+14151234567', 'string').e164() // pass
   *
   */
  e164(): _Chain<"string">;

  /**
   * @example
   * ESTest('foobar', 'string').lowercase() // pass
   */
  lowercase(): _Chain<"string">;
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

declare interface _BigInt extends _Common<"bigint"> {
  /**
   * @example
   * // 5n < 10n
   * ESTest(5n, 'bigint').less(10n) // pass
   */
  less(): _Chain<"number">;

  /**
   * @example
   * // 5n <= 10n
   * ESTest(5n, 'bigint').max(10n) // pass
   */
  max(): _Chain<"number">;

  /**
   * @example
   * // 15n > 10n
   * ESTest(15n, 'bigint').greater(10n) // pass
   */
  greater(): _Chain<"number">;

  /**
   * @example
   * // 15n >= 10n
   * ESTest(15n, 'bigint').min(10n) // pass
   */
  min(): _Chain<"number">;

  /**
   * @example
   * // 15n > 0n
   * ESTest(15n, 'bigint').positive() // pass
   */
  positive(): _Chain<"number">;

  /**
   * @example
   * // -15n < 0n
   * ESTest(-15n, 'bigint').negative() // pass
   */
  negative(): _Chain<"number">;

  /**
   * @example
   * // 15n % 3n === 0n
   * ESTest(15n, 'bigint').multiple(3n) // pass
   */
  multiple(): _Chain<"number">;
}

declare interface _Undefined extends _Common<"undefined"> {}

declare interface _Null extends _Common<"null"> {}

declare interface _NaN extends _Common<"nan"> {}

declare interface _Symbol extends _Common<"symbol"> {}

declare interface _Function extends _Common<"function"> {}

declare interface _RegExp extends _Common<"regexp"> {}

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
 * @example
 *
 * // Same as ESTest just used for "library" to wrap default message
 * function ESTest(input, type, pubMsg = "[libraryName] your message for others to help debugging") {
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
     * library information
     */
    information: string;

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
    message: string;

    /**
     * // Note: unSafeESTest won't be disabled (security reason).
     * @example
     * // To disable ESTest (default: false)
     * globalThis.__ESCSS_ESTEST__.isESTestDisabled = true
     */
    isESTestDisabled: boolean;

    /**
     * show usage report
     */
    analysis: object;
  };
}
