type TYPES = 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
/**
 * A runtime testing library inspired by TDD and TypeScript to achieve 100% coverage
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
 * ESTest(1, 'object') // error
 * ESTest(1, 'object', 'foo') // error & message "foo"
 * ```
 */
export declare function ESTest(input: unknown, type: TYPES, errMsg?: string): void