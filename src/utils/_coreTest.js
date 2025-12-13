import { _TypeClass } from "../_TypeClass";
import { _typeof } from "./shared/_typeof";
import { _error } from "./_error";

const _ALLOWED_TYPES = [
  "array",
  "bigint",
  "boolean",
  "function",
  "null",
  "number",
  "object",
  "string",
  "symbol",
  "undefined",
];

/**
 * Use in following cases to test input:
 * - `ESTest()`
 * - `unsSafeESTest()`
 * - `ESTestForLibrary()`
 * @param {*} input
 * @param {string} type
 * @param {string} message
 * @param {boolean} isUnSafe
 * @returns {object} sucesses
 * @throws {Error} failed
 */
export function _coreTest(
  input,
  type,
  message = globalThis.__ESCSS_ESTEST__.message,
  isUnSafe,
) {
  if (_typeof(message) !== "string") {
    if (!_ALLOWED_TYPES.includes(type)) {
      _error(input, "undefined", message, isUnSafe, "_errorLogArg3");
      return new _TypeClass.undefined();
    }

    _error(input, type, message, isUnSafe, "_errorLogArg3");
    return new _TypeClass[type](input, type, message, isUnSafe);
  }

  if (!_ALLOWED_TYPES.includes(type)) {
    _error(input, "undefined", message, isUnSafe, "_errorLogArg2");
    return new _TypeClass.undefined();
  }

  if (
    _typeof(input) === "number" &&
    !(Number.MIN_SAFE_INTEGER <= input && input <= Number.MAX_SAFE_INTEGER)
  ) {
    _error(input, type, message, isUnSafe, "_errorLogNumber");
    return new _TypeClass[type](input, type, message, isUnSafe);
  }

  if (_typeof(input) !== type) {
    _error(input, type, message, isUnSafe, "_errorLogArg1");
    return new _TypeClass[type](input, type, message, isUnSafe);
  }

  // return an object for chaining. e.g., ESTest(1, 'number').min(0).max(10)
  return new _TypeClass[type](input, type, message, isUnSafe);
}
