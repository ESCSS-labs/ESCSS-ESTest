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

  description(inputValue) {
    if (typeof inputValue !== "string") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "invalidType",
        inputValue,
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

    max(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length <= inputValue === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length >= inputValue === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          inputValue,
        );
      }

      return this;
    }

    length(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if ((this.input?.length === inputValue) === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "length",
          inputValue,
        );
      }

      return this;
    }

    email(inputValue) {
      // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts

      let email = "";

      switch (inputValue) {
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
          null,
          `email(${inputValue})`,
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
          null,
          "uuid4",
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
          null,
          "uuid7",
        );
      }

      return this;
    }

    regexp(inputValue) {
      if (_typeof(inputValue) !== "regexp") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "regexp",
        );
      }

      if (inputValue.test(this.input) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidInput",
          null,
          "regexp",
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
          null,
          "base64",
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
          null,
          "base64url",
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
          null,
          "ip4",
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
          null,
          "ip6",
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
          null,
          "cidr4",
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
          null,
          "cidr6",
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
          null,
          "emoji",
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
          null,
          "e164",
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
          null,
          "lowercase",
        );
      }

      return this;
    }
  },
  number: class _Number extends _Common {
    constructor(...args) {
      super(...args);
    }

    less(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input < inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "less",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input <= inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          inputValue,
        );
      }

      return this;
    }

    greater(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input > inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "greater",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input >= inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          inputValue,
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

    multiple(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if ((this.input % inputValue === 0) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "multiple",
          inputValue,
        );
      }

      return this;
    }
  },
  array: class _Array extends _Common {
    constructor(...args) {
      super(...args);
    }

    min(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length >= inputValue === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length <= inputValue === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          inputValue,
        );
      }

      return this;
    }

    length(inputValue) {
      if (typeof inputValue !== "number") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "number",
        );
      }

      if ((this.input?.length === inputValue) === false) {
        _error(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "length",
          inputValue,
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

    less(inputValue) {
      if (typeof inputValue !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "bigint",
        );
      }

      if (this.input < inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "less",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      if (typeof inputValue !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "bigint",
        );
      }

      if (this.input <= inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "max",
          inputValue,
        );
      }

      return this;
    }

    greater(inputValue) {
      if (typeof inputValue !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "bigint",
        );
      }

      if (this.input > inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "greater",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      if (typeof inputValue !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "bigint",
        );
      }

      if (this.input >= inputValue === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "min",
          inputValue,
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

    multiple(inputValue) {
      if (typeof inputValue !== "bigint") {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "invalidType",
          inputValue,
          "bigint",
        );
      }

      if ((this.input % inputValue === 0n) === false) {
        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "multiple",
          inputValue,
        );
      }

      return this;
    }
  },
  undefined: class _Undefined extends _Common {
    constructor(...args) {
      super(...args);
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

function _error(
  input,
  type,
  message,
  isUnSafe,
  logToken,
  inputValue,
  inputValue2,
) {
  // bigint in Template strings will be changed: `1n` -> `1`, so add "n" back
  const isBigint =
    typeof inputValue === "bigint" ? inputValue + "n" : inputValue;

  const _ESTestLog = {
    hiddenInformation: (logType) =>
      console[logType](
        `🚫 Information hidden for security purposes. Verify in development mode.`,
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

    invalidNumber: (logType) =>
      console[logType](
        ` \n ✅ Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint') \n ❌ Received input: ${input} (Invalid number) \n`,
      ),
    invalidDate: (logType) =>
      console[logType](
        ` \n ✅ Expected: 'date' \n ❌ Received: 'Invalid Date' \n`,
      ),
    invalidType: (logType) =>
      console[logType](
        ` \n ✅ Expected input type: '${inputValue2}' \n ❌ Received input type: '${_typeof(inputValue)}'`,
        inputValue,
      ),
    invalidInput: (logType) =>
      console[logType](` \n ❌ The input is invalid, got:`, input),

    less: (logType) =>
      console[logType](
        ` \n ✅ Expected: input < ${isBigint} \n ❌ Received:`,
        input,
      ),
    max: (logType) =>
      console[logType](
        ` \n ✅ Expected: input <= ${isBigint} \n ❌ Received:`,
        input,
      ),
    min: (logType) =>
      console[logType](
        ` \n ✅ Expected: input >= ${isBigint} \n ❌ Received:`,
        input,
      ),
    greater: (logType) =>
      console[logType](
        ` \n ✅ Expected: input > ${isBigint} \n ❌ Received:`,
        input,
      ),
    multiple: (logType) =>
      console[logType](
        ` \n ✅ Expected: input % ${isBigint} === 0 \n ❌ Received:`,
        input,
      ),
    length: (logType) =>
      console[logType](
        ` \n ✅ Expected: input === ${inputValue} \n ❌ Received:`,
        input,
      ),
    integer: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is an integer \n ❌ Received:`,
        input,
      ),
    positive: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a positive number/bigint \n ❌ Received:`,
        input,
      ),
    negative: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a negative number/bigint \n ❌ Received:`,
        input,
      ),
  };

  const _unSafeESTestLog = {
    errArg1: `[unSafeESTest(input, type, message)] Expected 1st Argument '${type}'`,
    errArg2: `[unSafeESTest(input, type, message)] Expected 2nd Argument: 'string' | 'number' | 'array' | 'object' | 'boolean' | 'date' | 'bigint' | 'undefined' | 'null' | 'nan' | 'symbol' | 'function' | 'regexp' | 'string?' | 'number?' | 'array?' | 'object?' | 'boolean?'`,
    errArg3: `[unSafeESTest(input, type, message)] Expected 3rd Argument: 'string'`,

    invalidNumber: `[unSafeESTest(input)] Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint')`,
    invalidDate: `[unSafeESTest(input)] Expected: 'date', Received: 'Invalid Date'`,
    invalidType: `[unSafeESTest().method(input)] Expected input type: '${inputValue2}'`,
    invalidInput: `[unSafeESTest().${inputValue2}(input)] The input is invalid`,

    less: `[unSafeESTest().less(input)] Expected: input < ${isBigint}`,
    max: `[unSafeESTest().max(input)] Expected: input <= ${isBigint}`,
    min: `[unSafeESTest().min(input)] Expected: input >= ${isBigint}`,
    greater: `[unSafeESTest().greater(input)] Expected: input > ${isBigint}`,
    multiple: `[unSafeESTest().multiple(input)] Expected: input % ${isBigint} === 0`,
    length: `[unSafeESTest().length(input)] Expected: input === ${inputValue}`,
    integer: `[unSafeESTest(input).integer()] Expected: input is an integer`,
    positive: `[unSafeESTest(input).integer()] Expected: input is a positive number/bigint`,
    negative: `[unSafeESTest(input).integer()] Expected: input is a negative number/bigint`,
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

function _test(
  input,
  type = "undefined",
  message = globalThis.__ESCSS_ESTEST__.message,
  isUnSafe,
) {
  // Unhappy path (validation)
  {
    // invalid type
    if (!_ALLOWED_TYPES.includes(type)) {
      type = "undefined";

      // is a valid message?
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

function ESTest(input, type, message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // console.error()
  return _test(input, type, message, false);
}

function unSafeESTest(input, type, message) {
  // throw new Error()
  return _test(input, type, message, true);
}

function baseESTest(input, type, message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // update globalThis
  globalThis.__ESCSS_ESTEST__.message = message;

  // console.error()
  return _test(input, type, message, false);
}

export { ESTest, unSafeESTest, baseESTest };
