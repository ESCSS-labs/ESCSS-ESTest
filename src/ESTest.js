const ESTestModule = {
  data: {
    name: 'escss-estest',
    testResult: null, // for internal testing
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
      fixLegacyType(input) {
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
          `❌ Error from fixLegacyType(), input: ${input}`
        );
      },
      fixTextInLog(input) {
        const fix_ArrayInLog = () => {
          // fix nesting array
          // '[1, 'hello', [2, 3]]'  -->  '[1, 'hello', [...]]'
          let result = "";

          input.forEach((item) => {
            if (ESTestModule.in.reuse.fixLegacyType(item) === "array") {
              result += `[...], `;
            } else {
              result += `${ESTestModule.in.reuse.fixTextInLog(item)}, `;
            }
          });

          // to remove the end of spacing and ,
          // '[1, 'hello', [...]], '  -->  '[1, 'hello', [...]]'
          result = `[${result.trim().slice(0, -1)}]`;

          return result;
        };
        const fix_ObjectInLog = () => {
          // fix nesting object
          // '{a: 1, b: {c: 1, d: 2}}'  -->  '{a: 1, b: {...}}'
          let result = "";

          for (const [key, value] of Object.entries(input)) {
            if (ESTestModule.in.reuse.fixLegacyType(value) === "object") {
              result += `${key}: {...}, `;
            } else {
              result += `${key}: ${ESTestModule.in.reuse.fixTextInLog(value)}, `;
            }
          }

          result = `{${result.trim().slice(0, -1)}}`;

          return result;
        };

        switch (ESTestModule.in.reuse.fixLegacyType(input)) {
          case "array":
            return fix_ArrayInLog();
          case "object":
            return fix_ObjectInLog();
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
    useTypeMode(input, mode, msg = "undefined error message") {
      {
        if (!ESTestModule.data.TYPES.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${ESTestModule.in.reuse.fixTextInLog(mode)}
            ✅ expects: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = ESTestModule.in.reuse.fixLegacyType(msg);
          const customErrInLog = ESTestModule.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ custom error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      if (ESTestModule.in.reuse.fixLegacyType(input) !== mode) {
        const fixTextInLogType = ESTestModule.in.reuse.fixTextInLog(mode);
        const fixTextInLogInput = ESTestModule.in.reuse.fixTextInLog(input);
        const fixLegacyType = ESTestModule.in.reuse.fixLegacyType(input);

        throw new Error(
          `
          📝 ${msg}
          ❌ type error: ${fixTextInLogInput} ('${fixLegacyType}') === ${fixTextInLogType}
          `,
        );
      }

      switch (mode) {
        case "undefined":
          break;
        case "null":
          break;
        case "array":
          break;
        case "object":
          break;
        case "boolean":
          break;
        case "NaN":
          break;
        case "number":
          break;
        case "bigint":
          break;
        case "string":
          break;
        case "symbol":
          break;
        case "function":
          break;
      }

      ESTestModule.data.testResult = mode;
    },
    useOperatorMode(input, mode, input2, msg = "undefined error message") {
      {
        if (!ESTestModule.data.OPERATORS.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${ESTestModule.in.reuse.fixTextInLog(mode)}
            ✅ expects: '<' | '<=' | '>=' | '>' | '===' | '!=='
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = ESTestModule.in.reuse.fixLegacyType(msg);
          const customErrInLog = ESTestModule.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ custom error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      const inputInLog = ESTestModule.in.reuse.fixTextInLog(input);
      const input2InLog = ESTestModule.in.reuse.fixTextInLog(input2);

      switch (mode) {
        case "<":
          if (!(input < input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} < ${input2InLog}
              `,
            );
          }

          break;
        case "<=":
          if (!(input <= input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} <= ${input2InLog}
              `,
            );
          }

          break;
        case ">=":
          if (!(input >= input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} >= ${input2InLog}
              `,
            );
          }

          break;
        case ">":
          if (!(input > input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} > ${input2InLog}
              `,
            );
          }

          break;
        case "===":
          if (!(input === input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} === ${input2InLog}
              `,
            );
          }

          break;
        case "!==":
          if (!(input !== input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ relational operators error: ${inputInLog} !== ${input2InLog}
              `,
            );
          }

          break;
      }

      ESTestModule.data.testResult = true;
    },
  },
  out: {
    // internal test purpose
    _getTestResult() {
      return ESTestModule.data.testResult;
    },
    ESTest(input, mode, msgOrInput2, msg) {
      if (ESTestModule.data.TYPES.includes(mode)) {
        ESTestModule.in.useTypeMode(input, mode, msgOrInput2); // msg here
      } else if (ESTestModule.data.OPERATORS.includes(mode)) {
        ESTestModule.in.useOperatorMode(input, mode, msgOrInput2, msg); // input2 here
      } else {
        throw new Error(
          `
          ❌ 2nd argument: ${ESTestModule.in.reuse.fixTextInLog(mode)}
          ✅ expects: 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'
          `,
        );
      }
    },
  },
};

export const { _getTestResult, ESTest } = ESTestModule.out;
