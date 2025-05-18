globalThis.__ESCSS_ESTEST__ = {
  name: "escss-estest",
  version: "2.1.5",
  license: "Copyright (c) 2024 Mike Lee, AGPL-3.0-only OR Commercial",
  publicMessage:
    "Set 'globalThis.__ESCSS_ESTEST__.publicMessage' for customize message",
  isESTestDisabled: false,
};

const _ALLOWED_TYPES = [
  "string",
  "number",
  "array",
  "object",
  "boolean",
  "date",
  "bigint",
  "undefined",
  "null",
  "NaN",
  "symbol",
  "function",
  "regex",
  // optional(?)
  "string?",
  "number?",
  "array?",
  "object?",
  "boolean?",
  "bigint?",
];

class _Common {
  /**
   * @param {string} input
   * @param {string} type
   * @param {string} pubMsg
   * @param {boolean} isUnSafe
   */
  constructor(input, type, pubMsg, isUnSafe) {
    this.input = input;
    this.type = type;
    this.pubMsg = pubMsg;
    this.isUnSafe = isUnSafe;
  }

  // for user to description more info
  description(value) {
    if (typeof value !== "string") {
      _error(
        this.input,
        this.type,
        this.pubMsg,
        this.isUnSafe,
        "typeCheck",
        value,
        "string",
      );
    }

    return this;
  }
}

const _chain = {
  string: class _String extends _Common {
    constructor(...args) {
      super(...args);
    }

    max(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input?.length <= value === false) {
        console.log(this.input);
        console.log(this.input?.length);
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "max",
          value,
        );
      }

      return this;
    }

    min(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input?.length >= value === false) {
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "min",
          value,
        );
      }

      return this;
    }

    length(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if ((this.input?.length === value) === false) {
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "length",
          value,
        );
      }

      return this;
    }

    email() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const emailRegex =
        /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\\-]*\.)+[A-Z]{2,}$/i;

      if (emailRegex.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    uuid() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      // Changed: removed \b (not necessary)
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

      if (uuidRegex.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    regex(value) {
      if (_typeof(value) !== "regex") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "regex",
        );
      }

      if (value.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    base64() {
      // https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
      const base64Regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

      if (base64Regex.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    ip() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const ipv4Regex =
        /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
      const ipv6Regex =
        /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

      if (
        ipv4Regex.test(this.input) === false &&
        ipv6Regex.test(this.input) === false
      ) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }
  },
  number: class _Number extends _Common {
    constructor(...args) {
      super(...args);
    }

    // <
    less(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input < value === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "less",
          value,
        );
      }

      return this;
    }

    // <=
    max(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input <= value === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "max", value);
      }

      return this;
    }

    // >
    greater(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input > value === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "greater",
          value,
        );
      }

      return this;
    }

    // >=
    min(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input >= value === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "min", value);
      }

      return this;
    }

    integer() {
      if (Number.isInteger(this.input) === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "integer");
      }

      return this;
    }

    positive() {
      if (this.input > 0 === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      if (this.input < 0 === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if ((this.input % value === 0) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "multiple",
          value,
        );
      }

      return this;
    }
  },
  array: class _Array extends _Common {
    constructor(...args) {
      super(...args);
    }

    min(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input?.length >= value === false) {
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "min",
          value,
        );
      }

      return this;
    }

    max(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input?.length <= value === false) {
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "max",
          value,
        );
      }

      return this;
    }

    length(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if ((this.input?.length === value) === false) {
        _error(
          this.input?.length,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "length",
          value,
        );
      }

      return this;
    }
  },
  object: class _Object extends _Common {},
  boolean: class _Boolean extends _Common {},
  date: class _Date extends _Common {},
  bigint: class _Bigint extends _Common {
    constructor(...args) {
      super(...args);
    }

    // <
    less(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input < value === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "less",
          value,
        );
      }

      return this;
    }

    // <=
    max(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input <= value === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "max", value);
      }

      return this;
    }

    // >
    greater(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input > value === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "greater",
          value,
        );
      }

      return this;
    }

    // >=
    min(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input >= value === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "min", value);
      }

      return this;
    }

    positive() {
      if (this.input > 0 === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      if (this.input < 0 === false) {
        _error(this.input, this.type, this.pubMsg, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if ((this.input % value === 0n) === false) {
        _error(
          this.input,
          this.type,
          this.pubMsg,
          this.isUnSafe,
          "multiple",
          value,
        );
      }

      return this;
    }
  },
  // collect all _chain[type] methods to prevent crazy usage to break the program
  undefined: class _Undefined extends _Common {
    constructor(...args) {
      super(...args);
    }

    max() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    min() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    length() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    email() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    uuid() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    regex() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    base64() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    ip() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    less() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    greater() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    integer() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    positive() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    negative() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }

    multiple() {
      _error(this.input, this.type, this.pubMsg, this.isUnSafe, "undefined");

      return this;
    }
  },
  null: class _Null extends _Common {},
  NaN: class _NaN extends _Common {},
  symbol: class _Symbol extends _Common {},
  function: class _Function extends _Common {},
  regex: class _Regex extends _Common {},
};

function _typeof(input) {
  /* 
  // based on typeof (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
  
  Undefined          'undefined'
  Null               'object'      ->    change to 'null'
  Boolean            'boolean'
  Number             'number'      ->    change to 'NaN' | 'number'
  BigInt             'bigint'
  String             'string'
  Symbol             'symbol'
  Function           'function'
  Any other object   'object'      ->    change to 'null' | 'array' | 'date' | 'regex' | 'object'
  */

  let newType;

  switch (typeof input) {
    case "number":
      if (Number.isNaN(input)) {
        newType = "NaN";
      }
      // check if it is a valid number
      else if (
        (Number.MIN_SAFE_INTEGER <= input &&
          input <= Number.MAX_SAFE_INTEGER) === false
      ) {
        throw new Error(
          `Expected: -9007199254740991 <= [input] <= 9007199254740991 (or try 'bigint')`,
        );
      } else {
        newType = "number";
      }
      break;
    case "object":
      if (Array.isArray(input)) {
        newType = "array";
      } else if (input === null) {
        newType = "null";
      } else if (Object.prototype.toString.call(input) === "[object Date]") {
        // check valid date
        if (Number.isNaN(input.getTime()))
          throw new Error(`Expected: 'date', Received: 'Invalid Date'`);
        else newType = "date";
      } else if (Object.prototype.toString.call(input) === "[object RegExp]") {
        newType = "regex";
      } else {
        newType = "object";
      }
      break;

    // 'undefined' | 'boolean' | 'bigint' | 'string' | 'symbol' | 'function'
    default:
      newType = typeof input;
      break;
  }

  return newType;
}

function _error(input, type, pubMsg, isUnSafe, logToken, value, value2) {
  // bigint in Template strings will be changed: `1n` -> `1`, so add "n" back
  const isBigint = typeof value === "bigint" ? value + "n" : value;

  const _ESTestLog = {
    hiddenMsg: (logType) =>
      console[logType](`🚫 Details hidden for security. Check in dev mode.`),
    errArg1: (logType) =>
      console[logType](
        ` \n ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received ESTest() 1st Argument: '${_typeof(input)}' \n`,
        input,
      ),
    errArg2: (logType) =>
      console[logType](
        ` \n ✅ Expected 2nd Argument: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'NaN' | 'symbol' | 'function' | 'regex' | 'string?' | 'number?' | 'array?' | 'object?' | 'boolean?' \n`,
      ),
    errArg3: (logType) =>
      console[logType](` \n ✅ Expected 3rd Argument: 'string' \n`),
    undefined: (logType) =>
      console[logType](
        ` \n 💩 Tried undefined.method() — safely blocked to prevent a crash. Check the correct usage: https://github.com/ESCSS-labs/ESCSS-ESTest \n`,
      ),
    typeCheck: (logType) =>
      console[logType](
        ` \n ❌ Expected ESTest().method(value) value type: '${value2}', got: '${_typeof(value)}'`,
        value,
      ),
    less: (logType) =>
      console[logType](` \n ❌ Must be < ${isBigint}, got:`, input),
    max: (logType) =>
      console[logType](` \n ❌ Must be <= ${isBigint}, got:`, input),
    min: (logType) =>
      console[logType](` \n ❌ Must be >= ${isBigint}, got:`, input),
    greater: (logType) =>
      console[logType](` \n ❌ Must be > ${isBigint}, got:`, input),
    multiple: (logType) =>
      console[logType](` \n ❌ Must be a multiple of ${isBigint}, got:`, input),
    length: (logType) =>
      console[logType](` \n ❌ Must be === ${value}, got:`, input),
    invalidInput: (logType) =>
      console[logType](` \n ❌ Invalid input, got:`, input),
    integer: (logType) =>
      console[logType](` \n ❌ Must be an integer, got:`, input),
    positive: (logType) =>
      console[logType](` \n ❌ Must be a positive number, got:`, input),
    negative: (logType) =>
      console[logType](` \n ❌ Must be a negative number, got:`, input),
  };

  const _unSafeESTestLog = {
    errArg1: `The value must be a/an '${type}'`,
    errArg2: `Expected 2nd Argument: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'NaN' | 'symbol' | 'function' | 'regex' | 'string?' | 'number?' | 'array?' | 'object?' | 'boolean?'`,
    errArg3: `Expected 3rd Argument: 'string'`,
    typeCheck: `Expected unSafeESTest().method(value), value type: '${value2}'`,
    less: `The value must be less than ${isBigint}`,
    max: `The value must be less than or equal to ${isBigint}`,
    min: `The value must be greater or equal to ${isBigint}`,
    greater: `The value must be greater than ${isBigint}`,
    multiple: `The value must be a multiple of ${isBigint}`,
    length: `The value must be exactly equal to ${value}`,
    invalidInput: `The value is invalid input`,
    integer: `The value must be an integer`,
    positive: `The value must be a positive number`,
    negative: `The value must be a negative number`,
  };

  // For performance: ESTest(...) (isUnSafe is false) used often
  if (isUnSafe === false) {
    /* === public message === */
    console.error(` 📝 Public Message: ${pubMsg}`);

    /* === private message === */
    // production
    if (process.env.NODE_ENV === "production") {
      _ESTestLog.hiddenMsg("error");
    }
    // browser
    else if (typeof window === "object") {
      _ESTestLog[logToken]("error");
    }
    // node / webworker
    else {
      _ESTestLog[logToken]("trace");
    }
  } else {
    // default error message
    if (pubMsg === globalThis.__ESCSS_ESTEST__.publicMessage) {
      throw new Error(_unSafeESTestLog[logToken]);
    }
    // customized error message
    else {
      throw new Error(pubMsg);
    }
  }
}

function _baseTest(input, type, pubMsg, isUnSafe) {
  // Unhappy path
  {
    // fail type -> undefined (handle all edge cases)
    if (!_ALLOWED_TYPES.includes(type)) {
      type = "undefined";
      _error(input, type, pubMsg, isUnSafe, "errArg2");

      if (typeof pubMsg !== "string") {
        _error(input, type, pubMsg, isUnSafe, "errArg3");
      }
    }

    // string?
    else if (type.endsWith("?")) {
      // string === string? || undefined === string?
      if (_typeof(input) === type.slice(0, -1) || input === undefined) {
        // invalid pubMsg
        if (typeof pubMsg !== "string") {
          _error(input, type, pubMsg, isUnSafe, "errArg3");
        }

        type = type.slice(0, -1);
      }

      // string !== number?
      else if (_typeof(input) !== type) {
        // invalid pubMsg
        if (typeof pubMsg !== "string") {
          _error(input, type, pubMsg, isUnSafe, "errArg3");
        }

        _error(input, type, pubMsg, isUnSafe, "errArg1");
        type = type.slice(0, -1);
      }
    }

    // string
    else {
      // string === string
      if (_typeof(input) === type) {
        if (typeof pubMsg !== "string") {
          _error(input, type, pubMsg, isUnSafe, "errArg3");
        }
      }

      // string !== number
      if (_typeof(input) !== type) {
        // invalid pubMsg
        if (typeof pubMsg !== "string") {
          _error(input, type, pubMsg, isUnSafe, "errArg3");
        }

        _error(input, type, pubMsg, isUnSafe, "errArg1");
      }
    }
  }

  // Happy path
  // return an object for chaining methods
  return new _chain[type](input, type, pubMsg, isUnSafe);
}

function ESTest(
  input,
  type = "null",
  pubMsg = globalThis.__ESCSS_ESTEST__.publicMessage,
) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // console.error()
  return _baseTest(input, type, pubMsg, false);
}

function unSafeESTest(
  input,
  type = "null",
  pubMsg = globalThis.__ESCSS_ESTEST__.publicMessage,
) {
  // throw new Error()
  return _baseTest(input, type, pubMsg, true);
}

function baseESTest(input, type = "null", pubMsg) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // update globalThis
  globalThis.__ESCSS_ESTEST__.publicMessage = pubMsg;

  // console.error()
  return _baseTest(input, type, pubMsg, false);
}

export { ESTest, unSafeESTest, baseESTest };
