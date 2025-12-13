import { _typeof } from "./shared/_typeof";
import { _error } from "./_error";

/**
 * Use in following cases to validate input:
 * - `ESTest(input, 'object').schema({...})`
 * - `ESTest(input, 'array').schema({...})`
 * @param {*} input
 * @param {string} type
 * @param {string} message
 * @param {boolean} isUnSafe
 * @param {object | array} schema
 * @param {string} path
 * @returns {object} sucesses
 * @throws {Error} failed
 */
export function _validate(input, type, message, isUnSafe, schema, path) {
  if (_typeof(path) !== "string") {
    throw new Error(
      `[Internal Error] path should be 'string', received ${path}`,
    );
  }

  if (!["object", "array"].includes(_typeof(input))) {
    return _error(input, type, message, isUnSafe, "_errorLogOnlyObjOrArr");
  }

  const newInput = _typeof(input) === "array" ? input[0] : input;
  const newSchema = _typeof(schema) === "array" ? schema[0] : schema;
  const newPath = _typeof(input) === "array" ? `${path}[0]` : `${path}`;

  if (
    _typeof(input) === "array" &&
    _typeof(input.at(0)) !== "object" &&
    _typeof(input.at(-1)) !== "object"
  ) {
    return _error(
      input,
      type,
      message,
      isUnSafe,
      "_errorLogSchemaMismatch",
      path,
    );
  }

  Object.keys(newSchema).forEach((key) => {
    const inputValue = key.endsWith("?")
      ? newInput[key.slice(0, -1)]
      : newInput[key];
    const schemaValue = newSchema[key];
    const pathway = key.endsWith("?")
      ? `${newPath}.${key.slice(0, -1)}`
      : `${newPath}.${key}`;

    if (inputValue === undefined) {
      // 'name?' - no check
      if (key.endsWith("?")) return;

      // 'name' - property missing
      return _error(
        input,
        type,
        message,
        isUnSafe,
        "_errorLogPropertyMissing",
        pathway,
      );
    }

    // recursion
    if (_typeof(schemaValue) === "array" || _typeof(schemaValue) === "object") {
      return _validate(
        inputValue,
        type,
        message,
        isUnSafe,
        schemaValue,
        pathway,
      );
    }

    if (_typeof(inputValue) !== schemaValue) {
      return _error(
        input,
        type,
        message,
        isUnSafe,
        "_errorLogTypeMismatch",
        pathway,
        _typeof(inputValue),
        schemaValue,
      );
    }
  });
}
