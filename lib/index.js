/* 
  - true: shows data and logs details in console.log.
  - false: shows `isLogVisible: false. Log details cannot be displayed.` in console.log.

  - When you change `isLogVisible`, here are some tips:
    1. Production - for production-ready environment and to project information.
      Change `isLogVisible` in node_modules/escss-estest.js and run `npm run build; npm run preview`.
    
    2. Development - for a development working situation.
      Change `isLogVisible` in `node_modules/.vite/deps/escss-estest.js` and run `npm run dev`.
*/
const isLogVisible = true;
const customErrMsg = "undefined error message";

let _internalTestToken = "";
const _TYPES = [
  "undefined",
  "null",
  "array",
  "object",
  "boolean",
  "NaN",
  "number",
  "bigint",
  "string",
  "symbol",
  "function",
];

/**
 * New types added to typeof in JavaScript. e.g, 'null' 、 'undefined' 、 'array' 、 'NaN'
 * @param {*} input
 * @returns
 */
function fixType(input) {
  const isNull = input === null;
  const isArray = Array.isArray(input);
  const isNaN = Number.isNaN(input);

  const typeMap = {
    undefined: "undefined",
    object: isNull ? "null" : isArray ? "array" : "object",
    boolean: "boolean",
    number: isNaN ? "NaN" : "number",
    bigint: "bigint",
    string: "string",
    symbol: "symbol",
    function: "function",
  };

  return (
    typeMap[typeof input] ||
    `❌ Internal Error from fixType, please send issue https://github.com/ESCSS-labs/ESCSS-ESTest/issues. input: ${input}.`
  );
}

/**
 * Fixed incorrect console.log display. e.g, 1 -> '1' 、 1,2,3 -> [1, 2, 3] 、 [object Object] -> {a: 1, b:{c: 1, d: 2}}
 * @param {*} input
 * @returns
 */
function fixTextInLog(input) {
  switch (fixType(input)) {
    case "array":
      return fix_ArrayInLog();
    case "object":
      return fix_ObjectInLog();
    case "bigint":
      return `${input}n`;
    case "string":
      return `'${input}'`;
    case "symbol":
      return `Symbol(...)`;
    default:
      return input;
  }

  function fix_ArrayInLog() {
    let result = "";

    input.forEach((item) => {
      result += `${fixTextInLog(item)}, `;
    });

    // Remove , and space in the end
    result = `[${result.trim().slice(0, -1)}]`;
    return result;
  }

  function fix_ObjectInLog() {
    let result = "";

    for (const [key, value] of Object.entries(input)) {
      result += `${key}: ${fixTextInLog(value)}, `;
    }

    // Remove , and space in the end
    result = `{${result.trim().slice(0, -1)}}`;
    return result;
  }
}
/**
 * 100% function coverage for easier life. More: https://github.com/ESCSS-labs/ESCSS-ESTest
 * @param {*} input
 * @param { "undefined" | "null" | "array" | "object" | "boolean" | "NaN" | "number" | "bigint" | "string" | "symbol" | "function" } type
 * @param {String} errMsg
 * @example
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
 */
function ESTest(input, type, errMsg = customErrMsg) {
  if (!_TYPES.includes(type)) {
    if (!isLogVisible) {
      throw new Error("isLogVisible: false. Log details cannot be displayed.");
    }

    throw new Error(
      `
        ✅ Expected 2nd Argument type: 
          'undefined' | 'null' | 'array' | 'object' | 'boolean' |
          'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
        ❌ Received: ${fixTextInLog(type)}
      `,
    );
  } else if (!["undefined", "string"].includes(typeof errMsg)) {
    if (!isLogVisible) {
      throw new Error("isLogVisible: false. Log details cannot be displayed.");
    }
    throw new Error(
      `
        ✅ Expected error message type: 'string'
        ❌ Received type: '${fixType(errMsg)}' 
        💣 ${fixTextInLog(errMsg)}
      `,
    );
  } else if (fixType(input) !== type) {
    if (!isLogVisible) {
      throw new Error("isLogVisible: false. Log details cannot be displayed.");
    }
    throw new Error(
      `
        ❗ ${errMsg}
        ✅ Expected type: ${fixTextInLog(type)} 
        ❌ Received type: '${fixType(input)}'     
        💣 ${fixTextInLog(input)}
      `,
    );
  }

  // Internal testing purpose, does not affect production.
  _internalTestToken = type;
}

export { _internalTestToken, isLogVisible, ESTest };
