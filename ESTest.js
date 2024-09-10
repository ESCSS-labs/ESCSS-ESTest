const ESTestModule = {
  data: {
    name: "ESTest",
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
    report: {
      total: 0,
      undefined: 0,
      null: 0,
      array: 0,
      object: 0,
      boolean: 0,
      NaN: 0,
      number: 0,
      bigint: 0,
      string: 0,
      symbol: 0,
      function: 0,
      lessThan: 0,
      lessThanOrEqual: 0,
      GreaterThanOrEqual: 0,
      GreaterThan: 0,
      StrictEquality: 0,
      StrictInequality: 0,
    },
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
          ❌ type error: 💣('${fixLegacyType}') === ${fixTextInLogType}
          💣 ${fixTextInLogInput}
          `,
        );
      }

      switch (mode) {
        case "undefined":
          ESTestModule.data.report.undefined += 1;
          break;
        case "null":
          ESTestModule.data.report.null += 1;
          break;
        case "array":
          ESTestModule.data.report.array += 1;
          break;
        case "object":
          ESTestModule.data.report.object += 1;
          break;
        case "boolean":
          ESTestModule.data.report.boolean += 1;
          break;
        case "NaN":
          ESTestModule.data.report.NaN += 1;
          break;
        case "number":
          ESTestModule.data.report.number += 1;
          break;
        case "bigint":
          ESTestModule.data.report.bigint += 1;
          break;
        case "string":
          ESTestModule.data.report.string += 1;
          break;
        case "symbol":
          ESTestModule.data.report.symbol += 1;
          break;
        case "function":
          ESTestModule.data.report.function += 1;
          break;
      }

      ESTestModule.data.report.total += 1;
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

          ESTestModule.data.report.lessThan += 1;
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

          ESTestModule.data.report.lessThanOrEqual += 1;
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

          ESTestModule.data.report.GreaterThanOrEqual += 1;
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

          ESTestModule.data.report.GreaterThan += 1;
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

          ESTestModule.data.report.StrictEquality += 1;
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

          ESTestModule.data.report.StrictInequality += 1;
          break;
      }

      ESTestModule.data.report.total += 1;
      ESTestModule.data.testResult = true;
    },
  },
  out: {
    // internal test purpose
    _getTestResult() {
      return ESTestModule.data.testResult;
    },
    ESTest(input, mode, input2, msg) {
      if (ESTestModule.data.TYPES.includes(mode)) {
        ESTestModule.in.useTypeMode(input, mode, input2); // input2 === msg in useTypeMode
      } else if (ESTestModule.data.OPERATORS.includes(mode)) {
        ESTestModule.in.useOperatorMode(input, mode, input2, msg);
      } else {
        throw new Error(
          `
          ❌ 2nd argument: ${ESTestModule.in.reuse.fixTextInLog(mode)}
          ✅ expects: 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'
          `,
        );
      }
    },
    getReport() {
      console.log(`
        Total usage of test: ${ESTestModule.data.report.total}

        - Type Mode - 
        "undefined": ${ESTestModule.data.report.undefined}
        "null": ${ESTestModule.data.report.null}
        "array": ${ESTestModule.data.report.array}
        "object": ${ESTestModule.data.report.object}
        "boolean": ${ESTestModule.data.report.boolean}
        "NaN": ${ESTestModule.data.report.NaN}
        "number": ${ESTestModule.data.report.number}
        "bigint": ${ESTestModule.data.report.bigint}
        "string": ${ESTestModule.data.report.string}
        "symbol": ${ESTestModule.data.report.symbol}
        "function": ${ESTestModule.data.report.function}

        - Operator Mode -
        "<": ${ESTestModule.data.report.lessThan}
        "<=": ${ESTestModule.data.report.lessThanOrEqual}
        ">=": ${ESTestModule.data.report.GreaterThanOrEqual}
        ">": ${ESTestModule.data.report.GreaterThan}
        "===": ${ESTestModule.data.report.StrictEquality}
        "!==": ${ESTestModule.data.report.StrictInequality}
        `);
    },
  },
};

export const { getReport, ESTest, _getTestResult } = ESTestModule.out;
