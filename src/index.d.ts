type TYPES =
| "undefined"
| "null"
| "array"
| "object"
| "boolean"
| "NaN"
| "number"
| "bigint"
| "string"
| "symbol"
| "function";

/**
 * ```js
 * ESTest(NaN, 'NaN')
 * ESTest([], 'array')
 * ESTest(null, 'null')
 * ESTest(undefined, 'undefined')
 * ESTest(1, 'number')
 * ESTest('foo', 'string')
 * ESTest(true, 'boolean')
 * ESTest({}, 'object')
 * ESTest(1n, 'bigint')
 * ESTest(Symbol(), 'symbol')
 * ESTest(function () {}, 'function')
 * ESTest(1, 'object') // throw error
 * ESTest(1, 'object', 'foo') // throw error & error message "foo"
 * ```
 */
export function ESTest(input: any, type: TYPES, msg?: string): void;