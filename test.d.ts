type Mode =
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
  | "function"
  | "==="
  | "!=="
  | "<"
  | "<="
  | ">="
  | ">";

/**
 * 100% function coverage makes your life easier.
 * ```js
 * // type mode
 * test(1, 'number')
 * test(1n, 'bigint')
 * test('foo', 'string')
 * test(true, 'boolean')
 * test([], 'array')
 * test({}, 'object')
 * test(NaN, 'NaN')
 * test(null, 'null')
 * test(undefined, 'undefined')
 * test(Symbol(), 'symbol')
 * test(function () {}, 'function')
 * test(1, 'object') // error
 * test(1, 'object', 'foo') // error & message
 *
 * // operator mode
 * test(1, '<', 5)
 * test(5, '>', 1)
 * test(1, '<=', 5)
 * test(5, '>=', 1)
 * test(1, '!==', 2)
 * test(1, '===', 1)
 * test(1, '===', 100) // error
 * test(1, '===', 100, 'Sep 05 2024 Mike 001') // The error message should provide a unique ID for troubleshooting
 * ```
 */
export function test(
  input: unknown,
  mode: Mode,
  input2?: unknown,
  msg?: string,
): void | Error;

/**
 * 1. start your dev server
 * 2. use getReport() under root component
 * 3. hit save for hot reload(Vite)
 * 4. get a correctly console.log report in browser (step 1 - 3 async/await concern)
 *
 * Note: to get the correctest report test should be used in function, not outside(test in Vue 3)
 */
export function getReport(): void;
