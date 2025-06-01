globalThis.__ESCSS_ESTEST__ = {
  information:
    "name: escss-estest, version: 2.3.2, license: AGPL-3.0-only OR Commercial, author: Mike Lee",
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
    _Undefined: {
      _count: 0,
      description: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      integer: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
      length: 0,
      email: 0,
      uuid4: 0,
      uuid7: 0,
      regex: 0,
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
    _Null: {
      _count: 0,
    },
    _Boolean: {
      _count: 0,
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
    _String: {
      _count: 0,
      max: 0,
      min: 0,
      length: 0,
      email: 0,
      uuid4: 0,
      uuid7: 0,
      regex: 0,
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
    _Symbol: {
      _count: 0,
    },
    _Function: {
      _count: 0,
    },
    _Object: {
      _count: 0,
    },
    _Array: {
      _count: 0,
      min: 0,
      max: 0,
      length: 0,
    },
  },
};

const _ALLOWED_TYPES = [
  "undefined",
  "null",
  "boolean",
  "number",
  "bigint",
  "string",
  "symbol",
  "function",
  "object",
  "array",
  // optional(?)
  "boolean?",
  "number?",
  "bigint?",
  "string?",
  "object?",
  "array?",
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
      _err(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errLogType",
        inputValue,
        "string",
      );
    }

    return this;
  }
}

const _chain = {
  // Prevent crashes if globalThis.__ESCSS_ESTEST__.isESTestDisabled = true
  undefined: class _Undefined {
    constructor() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined._count += 1;
    }
    description() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.description += 1;
      return this;
    }

    less() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.less += 1;
      return this;
    }

    max() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.max += 1;
      return this;
    }

    greater() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.greater += 1;
      return this;
    }

    min() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.min += 1;
      return this;
    }

    integer() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.integer += 1;
      return this;
    }

    positive() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.positive += 1;
      return this;
    }

    negative() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.negative += 1;
      return this;
    }

    multiple() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.multiple += 1;
      return this;
    }

    length() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.length += 1;
      return this;
    }

    email() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.email += 1;
      return this;
    }

    uuid4() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.uuid4 += 1;
      return this;
    }

    uuid7() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.uuid7 += 1;
      return this;
    }

    regex() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.regex += 1;
      return this;
    }

    base64() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.base64 += 1;
      return this;
    }

    base64url() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.base64url += 1;
      return this;
    }

    ip4() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.ip4 += 1;
      return this;
    }

    ip6() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.ip6 += 1;
      return this;
    }

    cidr4() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.cidr4 += 1;
      return this;
    }

    cidr6() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.cidr6 += 1;
      return this;
    }

    emoji() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.emoji += 1;
      return this;
    }

    e164() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.e164 += 1;
      return this;
    }

    lowercase() {
      globalThis.__ESCSS_ESTEST__.analysis._Undefined.lowercase += 1;
      return this;
    }
  },
  null: class _Null extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Null._count += 1;
    }
  },
  boolean: class _Boolean extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Boolean._count += 1;
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input < inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogLess",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.max += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input <= inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMax",
          inputValue,
        );
      }

      return this;
    }

    greater(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.greater += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input > inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogGreater",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.min += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input >= inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMin",
          inputValue,
        );
      }

      return this;
    }

    integer() {
      globalThis.__ESCSS_ESTEST__.analysis._Number.integer += 1;
      if (Number.isInteger(this.input) === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInteger",
        );
      }

      return this;
    }

    positive() {
      globalThis.__ESCSS_ESTEST__.analysis._Number.positive += 1;
      if (this.input > 0 === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogPositive",
        );
      }

      return this;
    }

    negative() {
      globalThis.__ESCSS_ESTEST__.analysis._Number.negative += 1;
      if (this.input < 0 === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogNegative",
        );
      }

      return this;
    }

    multiple(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Number.multiple += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if ((this.input % inputValue === 0) === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMultiple",
          inputValue,
        );
      }

      return this;
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "bigint",
        );
      }

      if (this.input < inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogLess",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.max += 1;
      if (typeof inputValue !== "bigint") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "bigint",
        );
      }

      if (this.input <= inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMax",
          inputValue,
        );
      }

      return this;
    }

    greater(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.greater += 1;
      if (typeof inputValue !== "bigint") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "bigint",
        );
      }

      if (this.input > inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogGreater",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.min += 1;
      if (typeof inputValue !== "bigint") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "bigint",
        );
      }

      if (this.input >= inputValue === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMin",
          inputValue,
        );
      }

      return this;
    }

    positive() {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.positive += 1;
      if (this.input > 0n === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogPositive",
        );
      }

      return this;
    }

    negative() {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.negative += 1;
      if (this.input < 0n === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogNegative",
        );
      }

      return this;
    }

    multiple(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._BigInt.multiple += 1;
      if (typeof inputValue !== "bigint") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "bigint",
        );
      }

      if ((this.input % inputValue === 0n) === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMultiple",
          inputValue,
        );
      }

      return this;
    }
  },
  string: class _String extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._String._count += 1;
    }

    max(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._String.max += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length <= inputValue === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMax",
          inputValue,
        );
      }

      return this;
    }

    min(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._String.min += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length >= inputValue === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMin",
          inputValue,
        );
      }

      return this;
    }

    length(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._String.length += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if ((this.input?.length === inputValue) === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogLength",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
          null,
          "uuid7",
        );
      }

      return this;
    }

    regex(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._String.regex += 1;
      if (_typeof(inputValue) !== "object") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "object",
        );
      }

      if (inputValue.test(this.input) === false) {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
          null,
          "object",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogInput",
          null,
          "lowercase",
        );
      }

      return this;
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
  object: class _Object extends _Common {
    constructor(...args) {
      super(...args);
      globalThis.__ESCSS_ESTEST__.analysis._Object._count += 1;
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
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length >= inputValue === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMin",
          inputValue,
        );
      }

      return this;
    }

    max(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Array.max += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if (this.input?.length <= inputValue === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogMax",
          inputValue,
        );
      }

      return this;
    }

    length(inputValue) {
      globalThis.__ESCSS_ESTEST__.analysis._Array.length += 1;
      if (typeof inputValue !== "number") {
        _err(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogType",
          inputValue,
          "number",
        );
      }

      if ((this.input?.length === inputValue) === false) {
        _err(
          this.input?.length,
          this.type,
          this.message,
          this.isUnSafe,
          "_errLogLength",
          inputValue,
        );
      }

      return this;
    }
  },
};

function _typeof(input) {
  /* 
  // the idea is from [object Null]、[object String]..., based on typeof (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

  [object Class]    from typeof (vanilla JS)       output type
  -------------------------------------------------------------------------------------------------------
  Undefined          'undefined'
  Null               'object'          ->        change to 'null'
  Boolean            'boolean'
  Number             'number'
  BigInt             'bigint'
  String             'string'
  Symbol             'symbol'
  Function           'function'
  Object             'object'
  Array              'object'          ->        change to 'array'
  */

  let newType;

  switch (typeof input) {
    // 'string' is used to early return for performance
    case "string":
      newType = "string";
      break;
    case "number":
      if (Number.isNaN(input)) {
        // for internal usage to check edge case of number
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
      } else {
        newType = "object";
      }
      break;
    default:
      newType = typeof input;
  }

  return newType;
}

function _err(
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
    _errLogHiddenInfo: (logType) =>
      console[logType](
        ` 🚫 Information hidden for security purposes. Verify in development mode.`,
      ),

    _errLogArg1: (logType) =>
      console[logType](
        ` \n ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received ESTest() 1st Argument: '${_typeof(input)}' \n`,
        input,
      ),
    _errLogArg2: (logType) =>
      console[logType](
        ` \n ✅ Expected 2nd Argument: 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object' | 'array' | 'boolean?' | 'number?' | 'string?' | 'object?' | 'array?' \n`,
      ),
    _errLogArg3: (logType) =>
      console[logType](` \n ✅ Expected 3rd Argument: 'string' \n`),

    _errLogNumber: (logType) =>
      console[logType](
        ` \n ✅ Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint') \n ❌ Received input: ${input} (Invalid number) \n`,
      ),
    _errLogType: (logType) =>
      console[logType](
        ` \n ✅ Expected input type: '${inputValue2}' \n ❌ Received input type: '${_typeof(inputValue)}'`,
        inputValue,
      ),
    _errLogInput: (logType) =>
      console[logType](` \n ❌ The input is invalid \n Received:`, input),

    _errLogLess: (logType) =>
      console[logType](
        ` \n ✅ Expected: input < ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errLogMax: (logType) =>
      console[logType](
        ` \n ✅ Expected: input <= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errLogMin: (logType) =>
      console[logType](
        ` \n ✅ Expected: input >= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errLogGreater: (logType) =>
      console[logType](
        ` \n ✅ Expected: input > ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errLogMultiple: (logType) =>
      console[logType](
        ` \n ✅ Expected: input % ${isBigint} === 0 \n ❌ Received input:`,
        input,
      ),
    _errLogLength: (logType) =>
      console[logType](
        ` \n ✅ Expected: input === ${inputValue} \n ❌ Received input:`,
        input,
      ),
    _errLogInteger: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is an integer \n ❌ Received input:`,
        input,
      ),
    _errLogPositive: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a positive number/bigint \n ❌ Received input:`,
        input,
      ),
    _errLogNegative: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a negative number/bigint \n ❌ Received input:`,
        input,
      ),
  };

  const _unSafeESTestLog = {
    _errLogArg1: `[unSafeESTest(input, type, message)] Expected 1st Argument '${type}'`,
    _errLogArg2: `[unSafeESTest(input, type, message)] Expected 2nd Argument: 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object' | 'array' | 'boolean?' | 'number?' | 'string?' | 'object?' | 'array?'`,
    _errLogArg3: `[unSafeESTest(input, type, message)] Expected 3rd Argument: 'string'`,

    _errLogNumber: `[unSafeESTest(input)] Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint')`,
    _errLogType: `[unSafeESTest().method(input)] Expected input type: '${inputValue2}'`,
    _errLogInput: `[unSafeESTest().${inputValue2}(input)] The input is invalid`,

    _errLogLess: `[unSafeESTest(input).less()] Expected: input < ${isBigint}`,
    _errLogMax: `[unSafeESTest(input).max()] Expected: input <= ${isBigint}`,
    _errLogMin: `[unSafeESTest(input).min()] Expected: input >= ${isBigint}`,
    _errLogGreater: `[unSafeESTest(input).greater()] Expected: input > ${isBigint}`,
    _errLogMultiple: `[unSafeESTest(input).multiple()] Expected: input % ${isBigint} === 0`,
    _errLogLength: `[unSafeESTest(input).length()] Expected: input === ${inputValue}`,
    _errLogInteger: `[unSafeESTest(input).integer()] Expected: input is an integer`,
    _errLogPositive: `[unSafeESTest(input).integer()] Expected: input is a positive number/bigint`,
    _errLogNegative: `[unSafeESTest(input).integer()] Expected: input is a negative number/bigint`,
  };

  // For ESTest
  if (isUnSafe === false) {
    console.error(` 📝 Message: ${message}`);

    // production situation
    if (process.env.NODE_ENV === "production") {
      _ESTestLog._errLogHiddenInfo("error");
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
        _err(input, type, message, isUnSafe, "_errLogArg3");
      }

      _err(input, type, message, isUnSafe, "_errLogArg2");
    }

    // valid type
    else {
      // is a valid number?
      if (
        _typeof(input) === "number" &&
        !(Number.MIN_SAFE_INTEGER <= input && input <= Number.MAX_SAFE_INTEGER)
      ) {
        _err(input, type, message, isUnSafe, "_errLogNumber");
      }

      // is a valid message?
      if (typeof message !== "string") {
        _err(input, type, message, isUnSafe, "_errLogArg3");
      }

      // "string?" case
      if (type.endsWith("?")) {
        // "number" !== "string?" case
        if (input !== undefined && _typeof(input) !== type.slice(0, -1)) {
          _err(input, type, message, isUnSafe, "_errLogArg1");
        }

        type = type.slice(0, -1);
      }

      // "string" case
      else {
        // "number" !== "string" case
        if (_typeof(input) !== type) {
          _err(input, type, message, isUnSafe, "_errLogArg1");
        }
      }
    }
  }

  // Happy path (return an object for chaining methods) e.g., ESTest(1, 'number').max(10)
  return new _chain[type](input, type, message, isUnSafe);
}

function ESTest(input, type, message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) {
    // To prevent the app from breaking when set to true
    return new _chain.undefined();
  }

  globalThis.__ESCSS_ESTEST__.analysis.ESTest._count += 1;

  // console.error()
  return _test(input, type, message, false);
}

function unSafeESTest(input, type, message) {
  globalThis.__ESCSS_ESTEST__.analysis.unSafeESTest._count += 1;

  // throw new Error()
  return _test(input, type, message, true);
}

function createESTest(input, type, message) {
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) {
    // To prevent the app from breaking when set to true
    return new _chain.undefined();
  }

  globalThis.__ESCSS_ESTEST__.message = message;
  globalThis.__ESCSS_ESTEST__.analysis.ESTest._count += 1;

  // console.error()
  return _test(input, type, message, false);
}

export { ESTest, unSafeESTest, createESTest };
