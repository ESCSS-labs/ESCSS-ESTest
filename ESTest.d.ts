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
 * ESTest(1, 'number')
 * ESTest(1n, 'bigint')
 * ESTest('foo', 'string')
 * ESTest(true, 'boolean')
 * ESTest([], 'array')
 * ESTest({}, 'object')
 * ESTest(NaN, 'NaN')
 * ESTest(null, 'null')
 * ESTest(undefined, 'undefined')
 * ESTest(Symbol(), 'symbol')
 * ESTest(function () {}, 'function')
 * ESTest(1, 'object') // error
 * ESTest(1, 'object', 'mike 09062024 1') // The error message should provide a unique ID for troubleshooting
 *
 * // operator mode
 * ESTest(1, '<', 5)
 * ESTest(5, '>', 1)
 * ESTest(1, '<=', 5)
 * ESTest(5, '>=', 1)
 * ESTest(1, '!==', 2)
 * ESTest(1, '===', 1)
 * ESTest(1, '===', 100) // error
 * ESTest(1, '===', 100, 'mike 09062024 1') // The error message should provide a unique ID for troubleshooting
 *
 * // Get console.log report (Ｕse it in the root component)
 * getReport();
 * ```
 */
export function ESTest(
  input: unknown,
  mode: Mode,
  input2?: unknown,
  msg?: string,
): void | Error;

/**
 * The order of steps 1-3 is a concern regarding async/await.
 * 1. start your dev server
 * 2. use getReport() under root component
 * 3. hit save for hot reload(Vite)
 * 4. get a correctly console.log report in browser
 *
 * Note: For reference only, complete protection your codebase requires E2E
 */
export function getReport(): void;
