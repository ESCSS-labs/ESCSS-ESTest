import { _Common } from "./extends/_Common";
import { _typeof, _error, _validate } from "./src/utils";

export class _Object extends _Common {
  constructor(...args) {
    super(...args);
    globalThis.__ESCSS_ESTEST__.analysis._Object._count += 1;
  }

  schema(schema) {
    globalThis.__ESCSS_ESTEST__.analysis._Object.schema += 1;
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

  refine(fn, message = this.message) {
    globalThis.__ESCSS_ESTEST__.analysis._Object.refine += 1;

    const result = fn(this.input);

    if (_typeof(message) !== "string") {
      return _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        message,
        "string",
      );
    }

    if (_typeof(result) !== "boolean") {
      return _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        result,
        "boolean",
      );
    }

    if (!result) {
      this.message = message;

      return _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogRefine",
      );
    }
  }

  superRefine(fn) {
    globalThis.__ESCSS_ESTEST__.analysis._Object.superRefine += 1;

    const ctx = {
      addIssue: (message) => {
        if (_typeof(message) !== "string") {
          return _error(
            this.input,
            this.type,
            this.message,
            this.isUnSafe,
            "_errorLogType",
            message,
            "string",
          );
        }

        this.message = message;

        _error(
          this.input,
          this.type,
          this.message,
          this.isUnSafe,
          "_errorLogSuperRefine",
        );
      },
    };

    fn(this.input, ctx);
  }
}
