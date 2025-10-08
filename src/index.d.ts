declare type _ALLOWED_TYPES =
  | "undefined"
  | "null"
  | "boolean"
  | "number"
  | "bigint"
  | "string"
  | "symbol"
  | "function"
  | "object"
  | "array";

type _ArraySchema<Type> = Type extends (infer U)[] ? U : Type;

type _ObjectSchema<Type> = {
  [P in keyof Type]: Type[P] extends (infer U)[]
    ? [U extends object ? _ObjectSchema<U> : _ALLOWED_TYPES]
    : Type[P] extends object
      ? _ObjectSchema<Type[P]>
      : _ALLOWED_TYPES;
};

declare type _ClassType<
  Type extends _ALLOWED_TYPES,
  Input,
> = Type extends "undefined"
  ? _Undefined
  : Type extends "null"
    ? _Null
    : Type extends "boolean"
      ? _Boolean
      : Type extends "number"
        ? _Number
        : Type extends "bigint"
          ? _BigInt
          : Type extends "string"
            ? _String
            : Type extends "symbol"
              ? _Symbol
              : Type extends "function"
                ? _Function
                : Type extends "object"
                  ? _Object<Input extends object ? Input : object> // <-- 傳遞 INPUT，並確保它是物件
                  : Type extends "array"
                    ? _Array<Input>
                    : never;

declare interface _Common<Type extends _ALLOWED_TYPES, Input = unknown> {
  /**
   * @example
   * // more information, doesn't do anything
   * ESTest('foo', 'string').describe('a helpful information')
   */
  describe(): _ClassType<Type, Input>;
}

declare interface _Undefined extends _Common<"undefined"> {}

declare interface _Null extends _Common<"null"> {}

declare interface _Boolean extends _Common<"boolean"> {}

declare interface _Number extends _Common<"number"> {
  /**
   * @example
   * // 5 < 10
   * ESTest(5, 'number').less(10) // pass
   */
  less(): _Number;

  /**
   * @example
   * // 5 <= 10
   * ESTest(5, 'number').max(10) // pass
   */
  max(): _Number;

  /**
   * @example
   * // 15 > 10
   * ESTest(15, 'number').greater(10) // pass
   */
  greater(): _Number;

  /**
   * @example
   * // 15 >= 10
   * ESTest(15, 'number').min(10) // pass
   */
  min(): _Number;

  /**
   * @example
   * // Number.isInteger(15)
   * ESTest(15, 'number').integer() // pass
   */
  integer(): _Number;

  /**
   * @example
   * // 15 > 0
   * ESTest(15, 'number').positive() // pass
   */
  positive(): _Number;

  /**
   * @example
   * // -15 < 0
   * ESTest(-15, 'number').negative() // pass
   */
  negative(): _Number;

  /**
   * @example
   * // 15 % 3 === 0
   * ESTest(15, 'number').multiple(3) // pass
   */
  multiple(): _Number;
}

declare interface _BigInt extends _Common<"bigint"> {
  /**
   * @example
   * // 5n < 10n
   * ESTest(5n, 'bigint').less(10n) // pass
   */
  less(): _BigInt;

  /**
   * @example
   * // 5n <= 10n
   * ESTest(5n, 'bigint').max(10n) // pass
   */
  max(): _BigInt;

  /**
   * @example
   * // 15n > 10n
   * ESTest(15n, 'bigint').greater(10n) // pass
   */
  greater(): _BigInt;

  /**
   * @example
   * // 15n >= 10n
   * ESTest(15n, 'bigint').min(10n) // pass
   */
  min(): _BigInt;

  /**
   * @example
   * // 15n > 0n
   * ESTest(15n, 'bigint').positive() // pass
   */
  positive(): _BigInt;

  /**
   * @example
   * // -15n < 0n
   * ESTest(-15n, 'bigint').negative() // pass
   */
  negative(): _BigInt;

  /**
   * @example
   * // 15n % 3n === 0n
   * ESTest(15n, 'bigint').multiple(3n) // pass
   */
  multiple(): _BigInt;
}

declare interface _String extends _Common<"string"> {
  /**
   * @example
   * // 'foo'.length <= 10
   * ESTest('foo', 'string').max(10) // pass
   */
  max(): _String;

  /**
   * @example
   * // 'foo'.length >= 10
   * ESTest('foo', 'string').min(10) // pass
   */
  min(): _String;

  /**
   * @example
   * // 'foo'.length === 10
   * ESTest('foo', 'string').length(10) // pass
   */
  length(): _String;

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
  email(): _String;

  /**
   * @example
   * ESTest('550e8400-e29b-41d4-a716-446655440000', 'string').uuid4() // pass
   */
  uuid4(): _String;

  /**
   * @example
   * ESTest('0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d', 'string').uuid7() // pass
   */
  uuid7(): _String;

  /**
   * @example
   * ESTest('foo bar', 'string').regex(/(foo|bar)/) // pass
   */
  regex(): _String;

  /**
   * @example
   * ESTest('SGVsbG8gd29ybGQh', 'string').base64() // pass
   */
  base64(): _String;

  /**
   * @example
   * ESTest('Zm9vYmFyXzEyMw', 'string').base64url() // pass
   */
  base64url(): _String;

  /**
   * @example
   * ESTest('192.168.1.1', 'string').ip4() // pass
   */
  ip4(): _String;

  /**
   * @example
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'string').ip6() // pass
   */
  ip6(): _String;

  /**
   * @example
   * ESTest('192.168.0.0/16', 'string').cidr4() // pass
   */
  cidr4(): _String;

  /**
   * @example
   * ESTest('2001:0db8:85a3:0000:0000:8a2e:0370:7334/16', 'string').cidr6() // pass
   */
  cidr6(): _String;

  /**
   * @example
   * ESTest('🌀', 'string').emoji() // pass
   */
  emoji(): _String;

  /**
   * @example
   * // international phone
   * ESTest('+886912345678', 'string').e164() // pass
   * ESTest('+14151234567', 'string').e164() // pass
   *
   */
  e164(): _String;

  /**
   * @example
   * ESTest('foobar', 'string').lowercase() // pass
   */
  lowercase(): _String;
}

declare interface _Symbol extends _Common<"symbol"> {}

declare interface _Function extends _Common<"function"> {}

declare interface _Object<Input extends object = object>
  extends _Common<"object", Input> {
  /**
   * @example
   * // Note: schema() only accepts 'object'.
   *
   * ESTest(data, 'object', 'demo is {}').schema({
   *   a: 'string',
   *   demo: {
   *     x: 'number',
   *     'y?': 'number',
   *   }
   * })
   *
   * ESTest(data, 'object', 'demo is {}[]').schema({
   *   a: 'string',
   *   demo: [{
   *     x: 'number',
   *     'y?': 'number',
   *   }]
   * })
   */
  schema(arg: _ObjectSchema<Input>): _Object<Input>;

  /**
   * @example
   * // "single case" cross field validation
   *
   * const data = {
   *   password: '123',
   *   checkPassword: '123'
   * }
   *
   * // pass
   * ESTest(data, 'object')
   *  .schema({
   *    password: 'string',
   *    checkPassword: 'string',
   *  })
   *  .refine(val => val.password === val.checkPassword, 'password mismatch')
   */
  refine(fn: (arg: Input) => boolean, message: string): void;

  /**
   * @example
   * // "multiple cases" cross field validation
   *
   * const data = {
   *   name: 'mike',
   *   checkName: 'mike',
   *   password: '123',
   *   checkPassword: '123'
   * }
   *
   * // pass
   * ESTest(data, 'object')
   *  .schema({
   *    name: 'string',
   *    checkName: 'string',
   *    password: 'string',
   *    checkPassword: 'string',
   *  })
   *  .superRefine((val, ctx) => {
   *    // case 1
   *    if (val.name !== val.checkName) {
   *      ctx.addIssue('name mismatch') // create an error msg
   *    }
   *
   *    // case 2
   *    if (val.password !== val.checkPassword) {
   *      ctx.addIssue('password mismatch') // create an error msg
   *    }
   *  })
   */
  superRefine(
    fn: (
      arg: Input,
      ctx: {
        /**
         * create an error msg
         */
        addIssue: (message: string) => void;
      },
    ) => void,
  ): void;
}

declare interface _Array<Input> extends _Common<"array", Input> {
  /**
   * @example
   * // [1, 2, 3].length >= 3
   * ESTest([1, 2, 3], 'array').min(3) // pass
   */
  min(): _Array<Input>;

  /**
   * @example
   * // [1, 2, 3].length <= 3
   * ESTest([1, 2, 3], 'array').max(3) // pass
   */
  max(): _Array<Input>;

  /**
   * @example
   * // [1, 2, 3].length === 3
   * ESTest([1, 2, 3], 'array').length(3) // pass
   */
  length(): _Array<Input>;

  /**
   * @example
   * // Note: schema() only accepts 'object'.
   *
   * ESTest(data, 'array', 'custom error msg').schema({
   *   name: 'string',
   *   'msg?': 'string',
   *   more: {
   *     a: 'number',
   *     'b?': 'number',
   *   }
   * })
   *
   * ESTest(data, 'array', 'custom error msg').schema({
   *   name: 'string',
   *   'msg?': 'string',
   *   more: [{
   *     a: 'number',
   *     'b?': 'number',
   *   }]
   * })
   */
  schema(
    arg: _ArraySchema<Input> extends object
      ? _ObjectSchema<_ArraySchema<Input>>
      : never,
  ): _Array<Input>;

  /**
   * @example
   * // "single case" cross field validation
   *
   * const data = [{
   *   password: '123',
   *   checkPassword: '123'
   * }]
   *
   * // pass
   * ESTest(data, 'array')
   *  .schema({
   *    password: 'string',
   *    checkPassword: 'string',
   *  })
   *  .refine(val => val[0].password === val[0].checkPassword, 'password mismatch')
   */
  refine(fn: (arg: Input) => boolean, message: string): void;

  /**
   * @example
   * // "multiple cases" cross field validation
   *
   * const data = [{
   *   name: 'mike',
   *   checkName: 'mike',
   *   password: '123',
   *   checkPassword: '123'
   * }]
   *
   * // pass
   * ESTest(data, 'array')
   *  .schema({
   *    name: 'string',
   *    checkName: 'string',
   *    password: 'string',
   *    checkPassword: 'string',
   *  })
   *  .superRefine((val, ctx) => {
   *    // case 1
   *    if (val[0].name !== val[0].checkName) {
   *      ctx.addIssue('name mismatch')
   *    }
   *
   *    // case 2
   *    if (val[0].password !== val[0].checkPassword) {
   *      ctx.addIssue('password mismatch')
   *    }
   *  })
   */
  superRefine(
    fn: (
      arg: Input,
      ctx: {
        addIssue: (message: string) => void;
      },
    ) => void,
  ): void;
}

/**
 * Non-breaking error logging via console.error(...)
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function ESTest<Type extends _ALLOWED_TYPES, Input>(
  input: Input,
  type: Type,
  message?: string,
): _ClassType<Type, Input>;

/**
 * Breaking error throwing via throw new Error(...)
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function unSafeESTest<Type extends _ALLOWED_TYPES, Input>(
  input: Input,
  type: Type,
  message?: string,
): _ClassType<Type, Input>;

/**
 * @example
 *
 * // provide default error message for library
 * function ESTest(input, type, message = "[libraryName] your message for others to help debugging") {
 *  return ESTestForLibrary(input, type, message)
 * }
 *
 * @see https://github.com/ESCSS-labs/ESCSS-ESTest
 */
export declare function ESTestForLibrary<Type extends _ALLOWED_TYPES, Input>(
  input: Input,
  type: Type,
  message?: string,
): _ClassType<Type, Input>;

declare global {
  var __ESCSS_ESTEST__: {
    /**
     * @example
     * globalThis.__ESCSS_ESTEST__.message = "Please report this issue to ...";
     *
     * @see https://github.com/ESCSS-labs/ESCSS-ESTest
     */
    message: string;

    /**
     *  - true: Enables a high-performance mode for production use.
     *  - false (default): Logs detailed errors for debugging.
     *
     * Note: unSafeESTest() will not be affected (for security reasons)*
     *
     * @see https://github.com/ESCSS-labs/ESCSS-ESTest
     */
    isESTestDisabled: boolean;

    /**
     * Show usage reports
     * @see https://github.com/ESCSS-labs/ESCSS-ESTest
     */
    analysis: object;
  };
}
