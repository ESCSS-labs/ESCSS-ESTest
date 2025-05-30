globalThis.__ESCSS_ESTEST__ = {
  information: `
   ========================================================================
   | name: escss-estest                                                   |
   | version: 2.1.5                                                       |
   | license: AGPL-3.0-only OR Commercial                                 ｜
   | author: Mike Lee                                                     |
   ========================================================================
  `,
  message: "Set 'globalThis.__ESCSS_ESTEST__.message' for customize message",
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
  "nan",
  "symbol",
  "function",
  "regexp",
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
   * @param {string} message
   * @param {boolean} isUnSafe
   */
  constructor(input, type, message, isUnSafe) {
    this.input = input;
    this.type = type;
    this.message = message;
    this.isUnSafe = isUnSafe;
  }

  description(value) {
    if (typeof value !== "string") {
      _error(
        this.input,
        this.type,
        this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
          this.isUnSafe,
          "length",
          value,
        );
      }

      return this;
    }

    email(value) {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts

      let email = "";

      switch (value) {
        /** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
        case "html5Email":
          email =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          break;

        /** The classic emailregex.com regex for RFC 5322-compliant emails */
        case "rfc5322Email":
          email =
            // eslint-disable-next-line no-useless-escape
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          break;

        /** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
        case "unicodeEmail":
          email = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
          break;

        /** Zod's default email regex (Gmail rules) */
        default:
          email =
            // eslint-disable-next-line no-useless-escape
            /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
      }

      if (email.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    uuid4() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const uuid4 =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

      if (uuid4.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    uuid7() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const uuid7 =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[7][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

      if (uuid7.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    regexp(value) {
      if (_typeof(value) !== "regexp") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "typeCheck",
          value,
          "regexp",
        );
      }

      if (value.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    base64() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const base64 =
        /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;

      if (base64.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    base64url() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const base64url = /^[A-Za-z0-9_-]*$/;

      if (base64url.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    ip4() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const ip4 =
        /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;

      if (ip4.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    ip6() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const ip6 =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;

      if (ip6.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    cidr4() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const cidr4 =
        /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;

      if (cidr4.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    cidr6() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const cidr6 =
        /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;

      if (cidr6.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    emoji() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const emoji = /^(?:\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;

      if (emoji.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    e164() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;

      if (e164.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
        );
      }

      return this;
    }

    lowercase() {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
      // regex for string with no uppercase letters
      const lowercase = /^[^A-Z]*$/;

      if (lowercase.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input <= value === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          value,
        );
      }

      return this;
    }

    // >
    greater(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
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
          this.message,
          this.isUnSafe,
          "typeCheck",
          value,
          "number",
        );
      }

      if (this.input >= value === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          value,
        );
      }

      return this;
    }

    integer() {
      if (Number.isInteger(this.input) === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "integer");
      }

      return this;
    }

    positive() {
      if (this.input > 0 === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      if (this.input < 0 === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(value) {
      if (typeof value !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
          this.message,
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
  bigint: class _BigInt extends _Common {
    constructor(...args) {
      super(...args);
    }

    less(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
          this.isUnSafe,
          "less",
          value,
        );
      }

      return this;
    }

    max(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input <= value === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          value,
        );
      }

      return this;
    }

    greater(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
          this.isUnSafe,
          "greater",
          value,
        );
      }

      return this;
    }

    min(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "typeCheck",
          value,
          "bigint",
        );
      }

      if (this.input >= value === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          value,
        );
      }

      return this;
    }

    positive() {
      if (this.input > 0n === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      if (this.input < 0n === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(value) {
      if (typeof value !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
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
          this.message,
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
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    min() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    length() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    email() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    uuid4() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    uuid7() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    regexp() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    base64() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    base64url() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    ip4() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    ip6() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    cidr4() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    cidr6() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    emoji() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    e164() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    lowercase() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    less() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    greater() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    integer() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    positive() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    negative() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }

    multiple() {
      _error(this.input, this.type, this.message, this.isUnSafe, "undefined");

      return this;
    }
  },
  null: class _Null extends _Common {},
  nan: class _NaN extends _Common {},
  symbol: class _Symbol extends _Common {},
  function: class _Function extends _Common {},
  regexp: class _RegExp extends _Common {},
};

function _typeof(input) {
  /* 
  // the idea is from [object Null]、[object String]..., based on typeof (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

  [object Class]    from typeof (vanilla JS)       output type
  -------------------------------------------------------------------------------------------------------
  String             'string'
  Number             'number'
  Array              'object'          ->        change to 'array'
  Object             'object'
  Boolean            'boolean'
  Date               'object'          ->        change to 'date'
  BigInt             'bigint'
  Undefined          'undefined'
  Null               'object'          ->        change to 'null'
  Number (NaN)       'number'          ->        change to 'nan'
  Symbol             'symbol'
  Function           'function'
  RegExp             'object'          ->        change to 'regexp'

  */

  let newType;

  switch (typeof input) {
    case "number":
      if (Number.isNaN(input)) {
        newType = "nan";
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
        newType = "date";
      } else if (Object.prototype.toString.call(input) === "[object RegExp]") {
        newType = "regexp";
      } else {
        newType = "object";
      }
      break;
    default:
      newType = typeof input;
  }

  return newType;
}

function _error(input, type, message, isUnSafe, logToken, value, value2) {
  // bigint in Template strings will be changed: `1n` -> `1`, so add "n" back
  const isBigint = typeof value === "bigint" ? value + "n" : value;

  const _ESTestLog = {
    hiddenInformation: (logType) =>
      console[logType](
        `🚫 Information hidden for security purposes. Verify in development mode.`,
      ),
    invalidNumber: (logType) =>
      console[logType](
        ` \n ✅ Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint') \n ❌ Received input: ${input} (Invalid number) \n`,
      ),
    invalidDate: (logType) =>
      console[logType](
        ` \n ✅ Expected: 'date' \n ❌ Received: 'Invalid Date' \n`,
      ),
    errArg1: (logType) =>
      console[logType](
        ` \n ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received ESTest() 1st Argument: '${_typeof(input)}' \n`,
        input,
      ),
    errArg2: (logType) =>
      console[logType](
        ` \n ✅ Expected 2nd Argument: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'nan' | 'symbol' | 'function' | 'regexp' | 'string?' | 'number?' | 'array?' | 'object?' | 'boolean?' \n`,
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
    invalidNumber: `Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint')`,
    invalidDate: `Expected: 'date', Received: 'Invalid Date'`,
    errArg1: `The value must be a/an '${type}'`,
    errArg2: `Expected 2nd Argument: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'nan' | 'symbol' | 'function' | 'regexp' | 'string?' | 'number?' | 'array?' | 'object?' | 'boolean?'`,
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

  // For ESTest
  if (isUnSafe === false) {
    console.error(` 📝 Message: ${message}`);

    // production situation
    if (process.env.NODE_ENV === "production") {
      _ESTestLog.hiddenInformation("error");
    }

    // development situation
    else {
      // browser
      if (typeof window === "object") {
        _ESTestLog[logToken]("error");
      }

      // node / webworker
      else {
        _ESTestLog[logToken]("trace");
      }
    }
  }

  // For unSafeESTest
  else {
    // Use the default error message if the third argument (message) is not provided
    if (message === globalThis.__ESCSS_ESTEST__.message) {
      throw new Error(_unSafeESTestLog[logToken]);
    }

    // customized error message
    else {
      throw new Error(message);
    }
  }
}

function _test(input, type, message, isUnSafe) {
  // Unhappy path (validation)
  {
    // invalid type
    if (!_ALLOWED_TYPES.includes(type)) {
      type = "undefined";

      if (typeof message !== "string") {
        _error(input, type, message, isUnSafe, "errArg3");
      }

      _error(input, type, message, isUnSafe, "errArg2");
    }

    // valid type
    else {
      // is a valid number?
      if (
        _typeof(input) === "number" &&
        !(Number.MIN_SAFE_INTEGER <= input && input <= Number.MAX_SAFE_INTEGER)
      ) {
        _error(input, type, message, isUnSafe, "invalidNumber");
      }

      // is a valid date?
      if (input instanceof Date && isNaN(input)) {
        _error(input, type, message, isUnSafe, "invalidDate");
      }

      // is a valid message?
      if (typeof message !== "string") {
        _error(input, type, message, isUnSafe, "errArg3");
      }

      // "string?" case
      if (type.endsWith("?")) {
        // "number" !== "string?" case
        if (input !== undefined && _typeof(input) !== type.slice(0, -1)) {
          _error(input, type, message, isUnSafe, "errArg1");
        }

        type = type.slice(0, -1);
      }

      // "string" case
      else {
        // "number" !== "string" case
        if (_typeof(input) !== type) {
          _error(input, type, message, isUnSafe, "errArg1");
        }
      }
    }
  }

  // Happy path (return an object for chaining methods) e.g., ESTest(1, 'number').max(10)
  return new _chain[type](input, type, message, isUnSafe);
}

function ESTest(
  input,
  type = "null",
  message = globalThis.__ESCSS_ESTEST__.message,
) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // console.error()
  return _test(input, type, message, false);
}

function unSafeESTest(
  input,
  type = "null",
  message = globalThis.__ESCSS_ESTEST__.message,
) {
  // throw new Error()
  return _test(input, type, message, true);
}

function baseESTest(input, type = "null", message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // update globalThis
  globalThis.__ESCSS_ESTEST__.message = message;

  // console.error()
  return _test(input, type, message, false);
}

export { ESTest, unSafeESTest, baseESTest };
