import { _Common } from "./extends/_Common";
import { _typeof, _error, _validate } from "./src/utils";

export class _Array extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Array._count += 1;
  }

  min(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Array.min += 1;
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

  max(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Array.max += 1;
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

  length(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Array.length += 1;
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

  schema(schema) {
    globalThis.__ESCSS_ESTEST__.analysis._Array.schema += 1;
    _validate(
      this.input,
      this.type,
      this.message,
      this.isUnSafe,
      schema,
      "<input>",
    );
    return this;
  }
}
