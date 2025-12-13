import { _Common } from "./extends/_Common";
import { _typeof, _error } from "./src/utils";

export class _BigInt extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._BigInt._count += 1;
  }

  less(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.less += 1;
    if (_typeof(inputValue) !== "bigint") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "bigint",
      );

      return this;
    }

    if (!(this.input < inputValue)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogLess",
        inputValue,
      );

      return this;
    }

    return this;
  }

  max(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.max += 1;
    if (_typeof(inputValue) !== "bigint") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "bigint",
      );

      return this;
    }

    if (!(this.input <= inputValue)) {
      _error(
        this.input,
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

  greater(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.greater += 1;
    if (_typeof(inputValue) !== "bigint") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "bigint",
      );

      return this;
    }

    if (!(this.input > inputValue)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogGreater",
        inputValue,
      );

      return this;
    }

    return this;
  }

  min(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.min += 1;
    if (_typeof(inputValue) !== "bigint") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "bigint",
      );

      return this;
    }

    if (!(this.input >= inputValue)) {
      _error(
        this.input,
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

  positive() {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.positive += 1;
    if (!(this.input > 0n)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogPositive",
      );

      return this;
    }

    return this;
  }

  negative() {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.negative += 1;
    if (!(this.input < 0n)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogNegative",
      );

      return this;
    }

    return this;
  }

  multiple(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._BigInt.multiple += 1;
    if (_typeof(inputValue) !== "bigint") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "bigint",
      );

      return this;
    }

    if (!(this.input % inputValue === 0n)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogMultiple",
        inputValue,
      );

      return this;
    }

    return this;
  }
}
