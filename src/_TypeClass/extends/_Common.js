import { _typeof, _error } from "../../utils";

export class _Common {
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

  describe(inputValue) {
    globalThis.__ESCSS_ESTEST__.analysis._Common.describe += 1;
    if (_typeof(inputValue) !== "string") {
      _error(
        this.input,
        this.type,
        this.message,
        this.isUnSafe,
        "_errorLogType",
        inputValue,
        "string",
      );

      return this;
    }

    return this;
  }
}
