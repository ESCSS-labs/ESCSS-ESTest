import { _Common } from "./extends/_Common";
import { _typeof, _error } from "../utils";

export class _String extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._String._count += 1;
  }

  max(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._String.max += 1;
    if (_typeof(inputValue) !== "number") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "number",
      );

      return this;
    }

    if (!(this.input?.length <= inputValue)) {
      _error(
        this.input?.length,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogMax",
        inputValue,
      );

      return this;
    }

    return this;
  }

  min(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._String.min += 1;
    if (_typeof(inputValue) !== "number") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "number",
      );

      return this;
    }

    if (!(this.input?.length >= inputValue)) {
      _error(
        this.input?.length,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogMin",
        inputValue,
      );

      return this;
    }

    return this;
  }

  length(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._String.length += 1;
    if (_typeof(inputValue) !== "number") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "number",
      );

      return this;
    }

    if (!(this.input?.length === inputValue)) {
      _error(
        this.input?.length,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogLength",
        inputValue,
      );

      return this;
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

    if (!email.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        `email(${inputValue})`,
      );

      return this;
    }

    return this;
  }

  uuid4() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.uuid4 += 1;
    const uuid4 =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!uuid4.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "uuid4",
      );

      return this;
    }

    return this;
  }

  uuid7() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.uuid7 += 1;
    const uuid7 =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[7][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!uuid7.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "uuid7",
      );

      return this;
    }

    return this;
  }

  regex(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._String.regex += 1;
    if (_typeof(inputValue) !== "object") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "object",
      );

      return this;
    }

    if (!inputValue.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "object",
      );

      return this;
    }

    return this;
  }

  base64() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.base64 += 1;
    const base64 =
      /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;

    if (!base64.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "base64",
      );

      return this;
    }

    return this;
  }

  base64url() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.base64url += 1;
    const base64url = /^[A-Za-z0-9_-]*$/;

    if (!base64url.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "base64url",
      );

      return this;
    }

    return this;
  }

  ip4() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.ip4 += 1;
    const ip4 =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;

    if (!ip4.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "ip4",
      );

      return this;
    }

    return this;
  }

  ip6() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.ip6 += 1;
    const ip6 =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;

    if (!ip6.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "ip6",
      );

      return this;
    }

    return this;
  }

  cidr4() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.cidr4 += 1;
    const cidr4 =
      /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;

    if (!cidr4.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "cidr4",
      );

      return this;
    }

    return this;
  }

  cidr6() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.cidr6 += 1;
    const cidr6 =
      /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;

    if (!cidr6.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "cidr6",
      );

      return this;
    }

    return this;
  }

  emoji() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.emoji += 1;
    const emoji = /^(?:\p{Extended_Pictographic}|\p{Emoji_Component})+$/u;

    if (!emoji.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "emoji",
      );

      return this;
    }

    return this;
  }

  e164() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.e164 += 1;
    const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;

    if (!e164.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "e164",
      );

      return this;
    }

    return this;
  }

  lowercase() {
    // https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
    globalThis.__ESCSS_ESTEST__.analysis._String.lowercase += 1;

    // regex for string with no uppercase letters
    const lowercase = /^[^A-Z]*$/;

    if (!lowercase.test(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInput",
        null,
        "lowercase",
      );

      return this;
    }

    return this;
  }
}
