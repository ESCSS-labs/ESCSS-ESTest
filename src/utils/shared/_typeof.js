/**
 * - based on [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), change following types:
 * - _typeof(null) will be "null" (before: "object")
 * - _typeof([]) will be "array" (before: "object")
 * @param {*} input
 * @returns {string}
 */
export function _typeof(input) {
  let newType;

  switch (typeof input) {
    // 'string' is used to early return for performance
    case "string":
      newType = "string";
      break;
    case "number":
      if (Number.isNaN(input)) {
        newType = "NaN";
      } else {
        newType = "number";
      }
      break;
    case "object":
      if (Array.isArray(input)) {
        newType = "array";
      } else if (input === null) {
        newType = "null";
      } else {
        newType = "object";
      }
      break;
    default:
      newType = typeof input;
  }

  return newType;
}
