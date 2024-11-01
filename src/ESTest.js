// true: visible data and log detail
// false: hidden data and log detail to protect information
const isLogVisible = false; 
const customErrMsg = "Undefined Error Message";
let internalTestToken = '';
const types = [
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
    `❌ Internal Error from fixType, please send issue back. input: ${input}.`
  );
}

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
    // display array detail '[1, 'hello', [2, 3], {a: 1}]'
    let result = "";
  
    input.forEach((item) => {
      result += `${fixTextInLog(item)}, `;
    });
  
    // Remove , and space
    // '[1, 'hello',[2, 3], {a: 1}], ' --> '[1, 'hello',[2, 3], {a: 1}]'
    result = `[${result.trim().slice(0, -1)}]`;
    return result;
  }
  
  function fix_ObjectInLog() {
    // display object detail '{a: 1, b: {c: 1}, d: [1, [2]]}'
    let result = "";
  
    for (const [key, value] of Object.entries(input)) {
      result += `${key}: ${fixTextInLog(value)}, `;
    }
  
    // Remove , and space
    // '{a: 1, b: {c: 1}, d: [1, [2]]}, ' --> '{a: 1, b: {c: 1}, d: [1, [2]]}'
    result = `{${result.trim().slice(0, -1)}}`;
    return result;
  }  
}

function ESTest(input, type, errMsg = customErrMsg) {
  if (!types.includes(type)) {
    if (!isLogVisible) {
      throw new Error(
        "isLogVisible: false. Log details cannot be displayed. (To display during development, set it to true in _modules/.vite/deps/ESTest.js and restart the development server)",
      );
    }

    throw new Error(
      `
        ✅ Expected 2nd Argument: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
        ❌ Received: ${fixTextInLog(type)}
        `,
    );
  } else if (!["undefined", "string"].includes(typeof errMsg)) {
    if (!isLogVisible) {
      throw new Error(
        "isLogVisible: false. Log details cannot be displayed. (To display during development, set it to true in _modules/.vite/deps/ESTest.js and restart the development server)",
      );
    }
    throw new Error(
      `
        ✅ Expected Error Message: 'string' type
        ❌ Received: '${fixType(errMsg)}' type
        📦 ${fixTextInLog(errMsg)}
        `,
    );
  } else if (fixType(input) !== type) {
    if (!isLogVisible) {
      throw new Error(
        "isLogVisible: false. Log details cannot be displayed. (To display during development, set it to true in _modules/.vite/deps/ESTest.js and restart the development server)",
      );
    }
    throw new Error(
      `
        ❗ ${errMsg}
        ❌ Error Type -> Expected: ${fixTextInLog(type)}, Received: '${fixType(input)}'
        📦 ${fixTextInLog(input)}
        `,
    );
  }

  // Internal testing purpose, does not affect production.
  internalTestToken = type;
}

export { internalTestToken, isLogVisible, ESTest };