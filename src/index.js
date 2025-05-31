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
  analysis: {
    ESTest: {
      _count: 0,
    },
    unSafeESTest: {
      _count: 0,
    },
    _Common: {
      _count: 0,
      description: 0,
    },
    _String: {
      _count: 0,
      max: 0,
      min: 0,
      length: 0,
      email: 0,
      uuid4: 0,
      uuid7: 0,
      regexp: 0,
      base64: 0,
      base64url: 0,
      ip4: 0,
      ip6: 0,
      cidr4: 0,
      cidr6: 0,
      emoji: 0,
      e164: 0,
      lowercase: 0,
    },
    _Number: {
      _count: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      integer: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
    },
    _Array: {
      _count: 0,
      min: 0,
      max: 0,
      length: 0,
    },
    _Object: {
      _count: 0,
    },
    _Boolean: {
      _count: 0,
    },
    _Date: {
      _count: 0,
    },
    _BigInt: {
      _count: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
    },
    _Undefined: {
      _count: 0,
    },
    _Null: {
      _count: 0,
    },
    _NaN: {
      _count: 0,
    },
    _Symbol: {
      _count: 0,
    },
    _Function: {
      _count: 0,
    },
    _RegExp: {
      _count: 0,
    },
  },
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
    globalThis.__ESCSS_ESTEST__.analysis._Common._count += 1;
  }

  description(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Common.description += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String._count += 1;
    }

    max(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._String.max += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.min += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.length += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.email += 1;

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
      globalThis.__ESCSS_ESTEST__.analysis._String.uuid4 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.uuid7 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.regexp += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.base64 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.base64url += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.ip4 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.ip6 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.cidr4 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.cidr6 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.emoji += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.e164 += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._String.lowercase += 1;

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
      globalThis.__ESCSS_ESTEST__.analysis._Number._count += 1;
    }

    less(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.less += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Number.max += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Number.greater += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Number.min += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Number.integer += 1;
      if (Number.isInteger(this.input) === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "integer");
      }

      return this;
    }

    positive() {
      globalThis.__ESCSS_ESTEST__.analysis._Number.positive += 1;
      if (this.input > 0 === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      globalThis.__ESCSS_ESTEST__.analysis._Number.negative += 1;
      if (this.input < 0 === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.multiple += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Array._count += 1;
    }

    min(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Array.min += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Array.max += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Array.length += 1;
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
  object: class _Object extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Object._count += 1;
    }
  },
  boolean: class _Boolean extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Boolean._count += 1;
    }
  },
  date: class _Date extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Date._count += 1;
    }
  },
  bigint: class _BigInt extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._BigInt._count += 1;
    }

    less(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.less += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.max += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.greater += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.min += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.positive += 1;
      if (this.input > 0n === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "positive");
      }

      return this;
    }

    negative() {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.negative += 1;
      if (this.input < 0n === false) {
        _error(this.input, this.type, this.message, this.isUnSafe, "negative");
      }

      return this;
    }

    multiple(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.multiple += 1;
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
      globalThis.__ESCSS_ESTEST__.analysis._Undefined._count += 1;
    }
  },
  null: class _Null extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Null._count += 1;
    }
  },
  nan: class _NaN extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._NaN._count += 1;
    }
  },
  symbol: class _Symbol extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Symbol._count += 1;
    }
  },
  function: class _Function extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Function._count += 1;
    }
  },
  regexp: class _RegExp extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._RegExp._count += 1;
    }
  },
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
      console[logType](` \n ❌ The input is invalid \n Received:`, input),

    less: (logType) =>
      console[logType](
        ` \n ✅ Expected: input < ${isBigint} \n ❌ Received input:`,
        input,
      ),
    max: (logType) =>
      console[logType](
        ` \n ✅ Expected: input <= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    min: (logType) =>
      console[logType](
        ` \n ✅ Expected: input >= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    greater: (logType) =>
      console[logType](
        ` \n ✅ Expected: input > ${isBigint} \n ❌ Received input:`,
        input,
      ),
    multiple: (logType) =>
      console[logType](
        ` \n ✅ Expected: input % ${isBigint} === 0 \n ❌ Received input:`,
        input,
      ),
    length: (logType) =>
      console[logType](
        ` \n ✅ Expected: input === ${inputValue} \n ❌ Received input:`,
        input,
      ),
    integer: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is an integer \n ❌ Received input:`,
        input,
      ),
    positive: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a positive number/bigint \n ❌ Received input:`,
        input,
      ),
    negative: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a negative number/bigint \n ❌ Received input:`,
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

    less: `[unSafeESTest(input).less()] Expected: input < ${isBigint}`,
    max: `[unSafeESTest(input).max()] Expected: input <= ${isBigint}`,
    min: `[unSafeESTest(input).min()] Expected: input >= ${isBigint}`,
    greater: `[unSafeESTest(input).greater()] Expected: input > ${isBigint}`,
    multiple: `[unSafeESTest(input).multiple()] Expected: input % ${isBigint} === 0`,
    length: `[unSafeESTest(input).length()] Expected: input === ${inputValue}`,
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

  globalThis.__ESCSS_ESTEST__.analysis.ESTest._count += 1;

  // console.error()
  return _test(input, type, message, false);
}

function unSafeESTest(input, type, message) {
  globalThis.__ESCSS_ESTEST__.analysis.unSafeESTest._count += 1;

  // throw new Error()
  return _test(input, type, message, true);
}

function baseESTest(input, type, message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) return;

  // update globalThis
  globalThis.__ESCSS_ESTEST__.message = message;
  globalThis.__ESCSS_ESTEST__.analysis.ESTest._count += 1;

  // console.error()
  return _test(input, type, message, false);
}

export { ESTest, unSafeESTest, baseESTest };
