type ALLOWED_TOKEN_TYPES = 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' | 'RegExp'
/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * ```js
 * ESTest(NaN, 'NaN')
 * ESTest([], 'Array')
 * ESTest(null, 'Null')
 * ESTest(undefined, 'Undefined')
 * ESTest(new Date(), 'Date')
 * ESTest(new RegExp(), 'RegExp')
 * ESTest(1, 'Number')
 * ESTest('foo', 'String')
 * ESTest(true, 'Boolean')
 * ESTest({}, 'Object')
 * ESTest(1n, 'BigInt')
 * ESTest(Symbol(), 'Symbol')
 * ESTest(function () {}, 'Function')
 * ESTest(1, 'Object') // error
 * ESTest(1, 'Object', 'foo') // public message "foo"
 * ```
 */
export declare function ESTest(input: unknown, tokenType: ALLOWED_TOKEN_TYPES, pubMsg?: string): void