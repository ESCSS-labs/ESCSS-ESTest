import { _typeof } from "./shared/_typeof";

/**
 *  handle output in following:
 * - ESTest: `console.error()`
 * - unSafeESTest: `throw new Error()`
 * @param {*} input
 * @param {string} type
 * @param {string} message
 * @param {boolean} isUnSafe
 * @param {string} logToken
 * @param {*} inputValue
 * @param {*} inputValue2
 * @param {*} inputValue3
 * @returns {undefined} sucesses
 * @throws {Error} failed
 */
export function _error(
  input,
  type,
  message,
  isUnSafe,
  logToken,
  inputValue,
  inputValue2,
  inputValue3,
) {
  if (_typeof(logToken) !== "string") {
    throw new Error(
      `[Internal Error] logToken should be 'string', received ${logToken}`,
    );
  }

  // bigint in Template strings will be changed: `1n` -> `1`, so add "n" back
  const isBigint =
    _typeof(inputValue) === "bigint" ? `${inputValue}n` : inputValue;

  const _ESTestLog = {
    _errorLogHiddenInfo: (logType) =>
      console[logType](` 🚫 Details not allowed. Check dev mode.`),

    _errorLogArg1: (logType) =>
      console[logType](
        ` \n ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received ESTest() 1st Argument: '${_typeof(input)}' \n`,
        input,
      ),
    _errorLogArg2: (logType) =>
      console[logType](
        ` \n ✅ Expected 2nd Argument: 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object' | 'array' | 'boolean?' | 'number?' | 'string?' | 'object?' | 'array?' \n`,
      ),
    _errorLogArg3: (logType) =>
      console[logType](` \n ✅ Expected 3rd Argument: 'string' \n`),

    _errorLogNumber: (logType) =>
      console[logType](
        ` \n ✅ Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint') \n ❌ Received input: ${input} (Invalid number) \n`,
      ),
    _errorLogType: (logType) =>
      console[logType](
        ` \n ✅ Expected input type: '${inputValue2}' \n ❌ Received input type: '${_typeof(inputValue)}'`,
        inputValue,
      ),
    _errorLogInput: (logType) =>
      console[logType](` \n ❌ The input is invalid \n Received:`, input),

    _errorLogLess: (logType) =>
      console[logType](
        ` \n ✅ Expected: input < ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errorLogMax: (logType) =>
      console[logType](
        ` \n ✅ Expected: input <= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errorLogMin: (logType) =>
      console[logType](
        ` \n ✅ Expected: input >= ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errorLogGreater: (logType) =>
      console[logType](
        ` \n ✅ Expected: input > ${isBigint} \n ❌ Received input:`,
        input,
      ),
    _errorLogMultiple: (logType) =>
      console[logType](
        ` \n ✅ Expected: input % ${isBigint} === 0 \n ❌ Received input:`,
        input,
      ),
    _errorLogLength: (logType) =>
      console[logType](
        ` \n ✅ Expected: input === ${inputValue} \n ❌ Received input:`,
        input,
      ),
    _errorLogInteger: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is an integer \n ❌ Received input:`,
        input,
      ),
    _errorLogPositive: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a positive number/bigint \n ❌ Received input:`,
        input,
      ),
    _errorLogNegative: (logType) =>
      console[logType](
        ` \n ✅ Expected: input is a negative number/bigint \n ❌ Received input:`,
        input,
      ),
    _errorLogOnlyObjOrArr: (logType) =>
      console[logType](`🥲 <input> ONLY "object" or "array".`),
    _errorLogSchemaMismatch: (logType) =>
      console[logType](
        `🥲 ${inputValue}: schema mismatch. Should be [{...}, {...}].`,
      ),
    _errorLogPropertyMissing: (logType) =>
      console[logType](`🥲 ${inputValue} is missing. But required.`),
    _errorLogTypeMismatch: (logType) =>
      console[logType](
        `🥲 ${inputValue}: type '${inputValue2}' is not assignable to type '${inputValue3}'.`,
      ),
    _errorLogRefine: (logType) =>
      console[logType](` \n 🥲  refine() condition mismatch`),
    _errorLogSuperRefine: (logType) =>
      console[logType](` \n 🥲  superRefine() condition mismatch`),
  };

  const _unSafeESTestLog = {
    _errorLogArg1: `[unSafeESTest(input, type, message)] Expected 1st Argument '${type}'`,
    _errorLogArg2: `[unSafeESTest(input, type, message)] Expected 2nd Argument: 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object' | 'array' | 'boolean?' | 'number?' | 'string?' | 'object?' | 'array?'`,
    _errorLogArg3: `[unSafeESTest(input, type, message)] Expected 3rd Argument: 'string'`,

    _errorLogNumber: `[unSafeESTest(input)] Expected: -9007199254740991 <= input <= 9007199254740991 (or try 'bigint')`,
    _errorLogType: `[unSafeESTest().method(input)] Expected input type: '${inputValue2}'`,
    _errorLogInput: `[unSafeESTest().${inputValue2}(input)] The input is invalid`,

    _errorLogLess: `[unSafeESTest(input).less()] Expected: input < ${isBigint}`,
    _errorLogMax: `[unSafeESTest(input).max()] Expected: input <= ${isBigint}`,
    _errorLogMin: `[unSafeESTest(input).min()] Expected: input >= ${isBigint}`,
    _errorLogGreater: `[unSafeESTest(input).greater()] Expected: input > ${isBigint}`,
    _errorLogMultiple: `[unSafeESTest(input).multiple()] Expected: input % ${isBigint} === 0`,
    _errorLogLength: `[unSafeESTest(input).length()] Expected: input === ${inputValue}`,
    _errorLogInteger: `[unSafeESTest(input).integer()] Expected: input is an integer`,
    _errorLogPositive: `[unSafeESTest(input).integer()] Expected: input is a positive number/bigint`,
    _errorLogNegative: `[unSafeESTest(input).integer()] Expected: input is a negative number/bigint`,

    _errorLogOnlyObjOrArr: `[unSafeESTest(input).schema()] <input> ONLY "object" or "array".`,
    _errorLogSchemaMismatch: `[unSafeESTest(input).schema()] schema mismatch.`,
    _errorLogPropertyMissing: `[unSafeESTest(input).schema()] value is missing. But required`,
    _errorLogTypeMismatch: `[unSafeESTest(input).schema()] type mismatch`,
    _errorLogRefine: `[unSafeESTest(input).refine()] condition mismatch`,
    _errorLogSuperRefine: `[unSafeESTest(input).superRefine()] condition mismatch`,
  };

  // ESTest() case
  if (!isUnSafe) {
    // Public Message: visible in dev/prod for bug tracking
    console.error(` 📝 Message: ${message}`);

    // Private Message:
    // - hidden detail in prod
    // - show detail in dev
    if (process?.env.NODE_ENV === "production") {
      return _ESTestLog._errorLogHiddenInfo("error");
    }

    // browser
    if (typeof window === "object") {
      return _ESTestLog[logToken]("error");
    }

    // node
    return _ESTestLog[logToken]("trace");
  }

  // unSafeESTest() case
  else if (isUnSafe) {
    // user set their error msg
    if (message !== globalThis.__ESCSS_ESTEST__.message) {
      throw new Error(message);
    }

    throw new Error(_unSafeESTestLog[logToken]);
  }
}
