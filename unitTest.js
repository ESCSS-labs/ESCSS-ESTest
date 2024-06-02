const UnitTest = {
  data: {
    OPERATORS: ["<", "<=", ">=", ">", "===", "!=="],
    TYPES: [
      "undefined",
      "null",
      "array",
      "object",
      "boolean",
      "NaN",
      "number",
      "bigint",
      "string",
      "symbol",
      "function",
    ],
  },
  in: {
    reuse: {
      /**
       * Fix legacy types in JavaScript and make them more specific.
       * @param {*} input
       * @returns
       */
      getNewType(input) {
        const isNull = input === null;
        const isArray = Array.isArray(input);
        const isNaN = Number.isNaN(input);

        const typeMap = {
          undefined: "undefined",
          object: isNull ? "null" : isArray ? "array" : "object",
          boolean: "boolean",
          number: isNaN ? "NaN" : "number",
          bigint: "bigint",
          string: "string",
          symbol: "symbol",
          function: "function",
        };

        return (
          typeMap[typeof input] || `❌ Error from getNewType(), input: ${input}`
        );
      },
      /**
       *  To correctly display text in the log.
       * @param {*} input
       * @returns
       */
      fixTextInLog(input) {
        const fix_ArrayLog = () => {
          let result = "";

          input.forEach((item) => {
            if (UnitTest.in.reuse.getNewType(item) === "array") {
              result += `[...], `;
            } else {
              result += `${UnitTest.in.reuse.fixTextInLog(item)}, `;
            }
          });

          // to remove the end of spacing and ,
          result = `[${result.trim().slice(0, -1)}]`;

          // [1, 'hello', [...]]
          return result;
        };
        const fix_ObjectLog = () => {
          let result = "";

          for (const [key, value] of Object.entries(input)) {
            if (UnitTest.in.reuse.getNewType(value) === "object") {
              result += `${key}: {...}, `;
            } else {
              result += `${key}: ${UnitTest.in.reuse.fixTextInLog(value)}, `;
            }
          }

          // to remove the end of spacing and ,
          result = `{${result.trim().slice(0, -1)}}`;

          // {1, 'hello', {...}}
          return result;
        };

        switch (UnitTest.in.reuse.getNewType(input)) {
          case "array":
            return fix_ArrayLog();
          case "object":
            return fix_ObjectLog();
          case "bigint":
            return `${input}n`;
          case "string":
            return `'${input}'`;
          case "symbol":
            return `Symbol(...)`;
          default:
            return input;
        }
      },
    },
    /**
     * @param {*} input The testing value
     * @param {'<'|'<='|'>='|'>'|'==='|'!=='} operator
     * @param {*} input2 The compared value
     * @param {undefined | String} [errMsg] Custom your error message
     * @returns {Void | Error}
     */
    useOperatorMode(input, operator, input2, errMsg) {
      {
        if (!UnitTest.data.OPERATORS.includes(operator)) {
          throw new Error(
            `❌ Your 2nd argument: ${UnitTest.in.reuse.fixTextInLog(operator)}, ✅ ('<', '<=', '>=', '>', '===', '!==')`,
          );
        }
        if (
          !["undefined", "string"].includes(
            UnitTest.in.reuse.getNewType(errMsg),
          )
        ) {
          const customErrType = UnitTest.in.reuse.getNewType(errMsg);
          const customErrInLog = UnitTest.in.reuse.fixTextInLog(errMsg);

          throw new Error(
            `❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ should be 'string' type`,
          );
        }
      }

      if (!errMsg) {
        errMsg = "undefined error message (4th argument)";
      }

      const inputInLog = UnitTest.in.reuse.fixTextInLog(input);
      const input2InLog = UnitTest.in.reuse.fixTextInLog(input2);

      switch (operator) {
        case "<":
          {
            if (!(input < input2)) {
              throw new Error(
                `❌ ${inputInLog} < ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        case "<=":
          {
            if (!(input <= input2)) {
              throw new Error(
                `❌ ${inputInLog} <= ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        case ">=":
          {
            if (!(input >= input2)) {
              throw new Error(
                `❌ ${inputInLog} >= ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        case ">":
          {
            if (!(input > input2)) {
              throw new Error(
                `❌ ${inputInLog} > ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        case "===":
          {
            if (!(input === input2)) {
              throw new Error(
                `❌ ${inputInLog} === ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        case "!==":
          {
            if (!(input !== input2)) {
              throw new Error(
                `❌ ${inputInLog} !== ${input2InLog}, errMsg: ${errMsg}`,
              );
            }
          }

          break;
        default:
          throw new Error(
            `❌ Error from useOperatorMode(), operator: ${operator}`,
          );
      }
    },
    /**
     * @param {*} input The testing value
     * @param {'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'} type
     * @param {undefined | String} [errMsg] Custom your error message
     * @returns {Void | Error}
     */
    useTypeMode(input, type, errMsg) {
      {
        if (!UnitTest.data.TYPES.includes(type)) {
          throw new Error(
            `❌ Your 2nd argument: ${UnitTest.in.reuse.fixTextInLog(type)}, ✅ ('undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function')`,
          );
        }
        if (
          !["undefined", "string"].includes(
            UnitTest.in.reuse.getNewType(errMsg),
          )
        ) {
          const customErrType = UnitTest.in.reuse.getNewType(errMsg);
          const customErrInLog = UnitTest.in.reuse.fixTextInLog(errMsg);

          throw new Error(
            `❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ should be 'string' type`,
          );
        }
      }

      if (UnitTest.in.reuse.getNewType(input) !== type) {
        const fixTextInLogType = UnitTest.in.reuse.fixTextInLog(type);
        const fixTextInLogInput = UnitTest.in.reuse.fixTextInLog(input);
        const getNewType = UnitTest.in.reuse.getNewType(input);
        const defaultErrMsg = `❌ typeof ${fixTextInLogInput} === ${fixTextInLogType}, ✅ type: '${getNewType}' should be ${fixTextInLogType}`;

        if (errMsg) {
          throw new Error(`${defaultErrMsg} (${errMsg})`);
        } else {
          throw new Error(defaultErrMsg);
        }
      }
    },
    /**
     * @param {*} mode
     * @returns {Error}
     */
    dealEdgeCases(mode) {
      throw new Error(
        `❌ Your 2nd argument: ${UnitTest.in.reuse.fixTextInLog(mode)}, ✅ 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'`,
      );
    },
  },
  out: {
    /**
     * Achieving 100% function coverage makes your life easier.
     * ```js
     * // type mode
     * unitTest(undefined, 'undefined')
     * unitTest(null, 'null')
     * unitTest([], 'array')
     * unitTest({}, 'object')
     * unitTest(true, 'boolean')
     * unitTest(NaN, 'NaN')
     * unitTest(1, 'number')
     * unitTest(1n, 'bigint')
     * unitTest('Hello World', 'string')
     * unitTest(Symbol(), 'symbol')
     * unitTest(function () {}, 'function')
     * unitTest(1, 'object', 'foo') // error & custom error message 'foo'
     *
     * // operator mode
     * unitTest(1, '<', 5)
     * unitTest(1, '<=', 5)
     * unitTest(5, '>', 1)
     * unitTest(5, '>=', 1)
     * unitTest(1, '===', 1)
     * unitTest(1, '!==', 2)
     * unitTest(1, '>=', 100, 'foo') // error & custom error message 'foo'
     * ```
     * @param {*} input The testing value
     * @param {'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'} mode
     * @param {*} [input2] operator mode: input2 | type mode(optional): custom error message
     * @param {undefined | String} [errMsg] operator mode(optional): custom error message
     * @returns {Void|Error} PASS: void | FAIL: throw an Error
     */
    unitTest(input, mode, input2, errMsg) {
      {
        if (
          !UnitTest.data.TYPES.includes(mode) &&
          !UnitTest.data.OPERATORS.includes(mode)
        ) {
          UnitTest.in.dealEdgeCases(mode);
        }
      }

      if (UnitTest.data.TYPES.includes(mode)) {
        UnitTest.in.useTypeMode(input, mode, input2);

        // for testing purpose
        return mode;
      } else if (UnitTest.data.OPERATORS.includes(mode)) {
        UnitTest.in.useOperatorMode(input, mode, input2, errMsg);

        // for testing purpose
        return true;
      }
    },
  },
};

const unitTest = UnitTest.out.unitTest;

export { unitTest };
