const ESTest = {
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
          typeMap[typeof input] ||
          `\n❌ Error from getNewType(), input: ${input}`
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
            if (ESTest.in.reuse.getNewType(item) === "array") {
              result += `[...], `;
            } else {
              result += `${ESTest.in.reuse.fixTextInLog(item)}, `;
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
            if (ESTest.in.reuse.getNewType(value) === "object") {
              result += `${key}: {...}, `;
            } else {
              result += `${key}: ${ESTest.in.reuse.fixTextInLog(value)}, `;
            }
          }

          // to remove the end of spacing and ,
          result = `{${result.trim().slice(0, -1)}}`;

          // {1, 'hello', {...}}
          return result;
        };

        switch (ESTest.in.reuse.getNewType(input)) {
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
        if (!ESTest.data.OPERATORS.includes(operator)) {
          throw new Error(
            `\n❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(operator)} \n✅ expects: '<' | '<=' | '>=' | '>' | '===' | '!=='`,
          );
        }
        if (
          !["undefined", "string"].includes(ESTest.in.reuse.getNewType(errMsg))
        ) {
          const customErrType = ESTest.in.reuse.getNewType(errMsg);
          const customErrInLog = ESTest.in.reuse.fixTextInLog(errMsg);

          throw new Error(
            `\n❌ custom error message: ${customErrInLog}('${customErrType}')  \n✅ expects: 'string' type`,
          );
        }
      }

      const inputInLog = ESTest.in.reuse.fixTextInLog(input);
      const input2InLog = ESTest.in.reuse.fixTextInLog(input2);

      if (operator === "<") {
        if (!(input < input2)) {
          throw new Error(
            `\n❌ ${inputInLog} < ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
      } else if (operator === "<=") {
        if (!(input <= input2)) {
          throw new Error(
            `\n❌ ${inputInLog} <= ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
      } else if (operator === ">=") {
        if (!(input >= input2)) {
          throw new Error(
            `\n❌ ${inputInLog} >= ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
      } else if (operator === ">") {
        if (!(input > input2)) {
          throw new Error(
            `\n❌ ${inputInLog} > ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
      } else if (operator === "===") {
        if (!(input === input2)) {
          throw new Error(
            `\n❌ ${inputInLog} === ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
      } else if (operator === "!==") {
        if (!(input !== input2)) {
          throw new Error(
            `\n❌ ${inputInLog} !== ${input2InLog} \n(custom error message: ${errMsg})`,
          );
        }
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
        if (!ESTest.data.TYPES.includes(type)) {
          throw new Error(
            `\n❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(type)} \n✅ expects: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'`,
          );
        }
        if (
          !["undefined", "string"].includes(ESTest.in.reuse.getNewType(errMsg))
        ) {
          const customErrType = ESTest.in.reuse.getNewType(errMsg);
          const customErrInLog = ESTest.in.reuse.fixTextInLog(errMsg);

          throw new Error(
            `\n❌ custom error message: ${customErrInLog}('${customErrType}') \n✅ expects: 'string' type`,
          );
        }
      }

      if (ESTest.in.reuse.getNewType(input) !== type) {
        const fixTextInLogType = ESTest.in.reuse.fixTextInLog(type);
        const fixTextInLogInput = ESTest.in.reuse.fixTextInLog(input);
        const getNewType = ESTest.in.reuse.getNewType(input);

        throw new Error(
          `\n❌ typeof input === ${fixTextInLogType} \n✅ expects: input('${getNewType}') -> ${fixTextInLogType} \ninput: ${fixTextInLogInput} \n(custom error message: ${errMsg})`,
        );
      }
    },
    /**
     * @param {*} mode
     * @returns {Error}
     */
    dealEdgeCases(mode) {
      throw new Error(
        `\n❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(mode)} \n✅ expects: 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'`,
      );
    },
  },
  out: {
    /**
     * 100% function coverage makes your life easier.
     * ```js
     * // type mode
     * esTest(undefined, 'undefined')
     * esTest(null, 'null')
     * esTest([], 'array')
     * esTest({}, 'object')
     * esTest(true, 'boolean')
     * esTest(NaN, 'NaN')
     * esTest(1, 'number')
     * esTest(1n, 'bigint')
     * esTest('Hello World', 'string')
     * esTest(Symbol(), 'symbol')
     * esTest(function () {}, 'function')
     * esTest(1, 'object') // error
     * esTest(1, 'object', 'foo') // error & custom error message 'foo'
     *
     * // operator mode
     * esTest(1, '<', 5)
     * esTest(1, '<=', 5)
     * esTest(5, '>', 1)
     * esTest(5, '>=', 1)
     * esTest(1, '===', 1)
     * esTest(1, '!==', 2)
     * esTest(1, '>=', 100) // error
     * esTest(1, '>=', 100, 'foo') // error & custom error message 'foo'
     * ```
     * @param {*} input
     * @param {'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'} mode
     * @param {*} [input2] operator mode -> input2 | type mode -> custom error message(optional)
     * @param {undefined | String} [errMsg] custom error message(optional)
     * @returns {Void|Error} PASS: void | FAIL: throw an Error
     */
    esTest(input, mode, input2, errMsg) {
      {
        if (
          !ESTest.data.TYPES.includes(mode) &&
          !ESTest.data.OPERATORS.includes(mode)
        ) {
          ESTest.in.dealEdgeCases(mode);
        }
      }

      if (ESTest.data.TYPES.includes(mode)) {
        ESTest.in.useTypeMode(input, mode, input2);

        // for testing purpose
        return mode;
      } else if (ESTest.data.OPERATORS.includes(mode)) {
        ESTest.in.useOperatorMode(input, mode, input2, errMsg);

        // for testing purpose
        return true;
      }
    },
  },
};

const esTest = ESTest.out.esTest;

export { esTest };
