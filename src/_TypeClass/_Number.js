import { _Common } from "./extends/_Common";
import { _typeof, _error } from "../utils";

export class _Number extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Number._count += 1;
  }

  less(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Number.less += 1;
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
    globalThis.__ESCSS_ESTEST__.analysis._Number.max += 1;
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
    globalThis.__ESCSS_ESTEST__.analysis._Number.greater += 1;
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
    globalThis.__ESCSS_ESTEST__.analysis._Number.min += 1;
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

  integer() {
    globalThis.__ESCSS_ESTEST__.analysis._Number.integer += 1;
    if (!Number.isInteger(this.input)) {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogInteger",
      );

      return this;
    }

    return this;
  }

  positive() {
    globalThis.__ESCSS_ESTEST__.analysis._Number.positive += 1;
    if (!(this.input > 0)) {
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
    globalThis.__ESCSS_ESTEST__.analysis._Number.negative += 1;
    if (!(this.input < 0)) {
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
    globalThis.__ESCSS_ESTEST__.analysis._Number.multiple += 1;
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

    if (!(this.input % inputValue === 0)) {
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
