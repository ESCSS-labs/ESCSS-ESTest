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
 * esTest(1, 'number')
 * esTest(1n, 'bigint')
 * esTest('foo', 'string')
 * esTest(true, 'boolean')
 * esTest([], 'array')
 * esTest({}, 'object')
 * esTest(NaN, 'NaN')
 * esTest(null, 'null')
 * esTest(undefined, 'undefined')
 * esTest(Symbol(), 'symbol')
 * esTest(function () {}, 'function')
 * esTest(1, 'object') // error
 * esTest(1, 'object', 'foo') // error & message
 *
 * // operator mode
 * esTest(1, '<', 5)
 * esTest(5, '>', 1)
 * esTest(1, '<=', 5)
 * esTest(5, '>=', 1)
 * esTest(1, '!==', 2)
 * esTest(1, '===', 1)
 * esTest(1, '===', 100) // error
 * esTest(1, '===', 100, 'foo') // error & message
 * ```
 */
export function esTest(
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
 * Note: to get the correctest report esTest should be used in function, not outside(test in Vue 3)
 */
export function getReport(): void;
