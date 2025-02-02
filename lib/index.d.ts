type ALLOWED_TOKEN_TYPES = 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex'
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
 * ESTest(1, 'object', 'foo') // public message "foo"
 * ```
 */
export declare function ESTest(input: unknown, type: ALLOWED_TOKEN_TYPES, pubMsg?: string): void


