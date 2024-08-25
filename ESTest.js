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
    testResult: null,
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
        const fix_ArrayLog = () => {
          let result = "";

          input.forEach((item) => {
            if (ESTest.in.reuse.fixLegacyType(item) === "array") {
              result += `[...], `;
            } else {
              result += `${ESTest.in.reuse.fixTextInLog(item)}, `;
            }
          });

          // '[1, 'hello', [...]], '  -->  '[1, 'hello', [...]]'
          result = `[${result.trim().slice(0, -1)}]`;

          return result;
        };
        const fix_ObjectLog = () => {
          let result = "";

          for (const [key, value] of Object.entries(input)) {
            if (ESTest.in.reuse.fixLegacyType(value) === "object") {
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

        switch (ESTest.in.reuse.fixLegacyType(input)) {
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
    useTypeMode(input, mode, msg = "undefined error message") {
      {
        if (!ESTest.data.TYPES.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(mode)}
            ✅ expects: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = ESTest.in.reuse.fixLegacyType(msg);
          const customErrInLog = ESTest.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      if (ESTest.in.reuse.fixLegacyType(input) !== mode) {
        const fixTextInLogType = ESTest.in.reuse.fixTextInLog(mode);
        const fixTextInLogInput = ESTest.in.reuse.fixTextInLog(input);
        const fixLegacyType = ESTest.in.reuse.fixLegacyType(input);

        throw new Error(
          `
          📝 ${msg}
          ❌ error type: 💣('${fixLegacyType}') === ${fixTextInLogType}
          💣 ${fixTextInLogInput}
          `,
        );
      }

      switch (mode) {
        case "undefined":
          ESTest.data.report.undefined += 1;
          break;
        case "null":
          ESTest.data.report.null += 1;
          break;
        case "array":
          ESTest.data.report.array += 1;
          break;
        case "object":
          ESTest.data.report.object += 1;
          break;
        case "boolean":
          ESTest.data.report.boolean += 1;
          break;
        case "NaN":
          ESTest.data.report.NaN += 1;
          break;
        case "number":
          ESTest.data.report.number += 1;
          break;
        case "bigint":
          ESTest.data.report.bigint += 1;
          break;
        case "string":
          ESTest.data.report.string += 1;
          break;
        case "symbol":
          ESTest.data.report.symbol += 1;
          break;
        case "function":
          ESTest.data.report.function += 1;
          break;
      }

      ESTest.data.report.total += 1;
      ESTest.data.testResult = mode;
    },
    useOperatorMode(input, mode, input2, msg = "undefined error message") {
      {
        if (!ESTest.data.OPERATORS.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(mode)}
            ✅ expects: '<' | '<=' | '>=' | '>' | '===' | '!=='
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = ESTest.in.reuse.fixLegacyType(msg);
          const customErrInLog = ESTest.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      const inputInLog = ESTest.in.reuse.fixTextInLog(input);
      const input2InLog = ESTest.in.reuse.fixTextInLog(input2);

      switch (mode) {
        case "<":
          if (!(input < input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} < ${input2InLog}
              `,
            );
          }

          ESTest.data.report.lessThan += 1;
          break;
        case "<=":
          if (!(input <= input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} <= ${input2InLog}
              `,
            );
          }

          ESTest.data.report.lessThanOrEqual += 1;
          break;
        case ">=":
          if (!(input >= input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} >= ${input2InLog}
              `,
            );
          }

          ESTest.data.report.GreaterThanOrEqual += 1;
          break;
        case ">":
          if (!(input > input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} > ${input2InLog}
              `,
            );
          }

          ESTest.data.report.GreaterThan += 1;
          break;
        case "===":
          if (!(input === input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} === ${input2InLog}
              `,
            );
          }

          ESTest.data.report.StrictEquality += 1;
          break;
        case "!==":
          if (!(input !== input2)) {
            throw new Error(
              `
              📝 ${msg}
              ❌ ${inputInLog} !== ${input2InLog}
              `,
            );
          }

          ESTest.data.report.StrictInequality += 1;
          break;
      }

      ESTest.data.report.total += 1;
      ESTest.data.testResult = true;
    },
  },
  out: {
    // internal test purpose
    _getTestResult() {
      return ESTest.data.testResult;
    },
    esTest(input, mode, input2, msg) {
      if (ESTest.data.TYPES.includes(mode)) {
        ESTest.in.useTypeMode(input, mode, input2); // input2 === msg in useTypeMode
      } else if (ESTest.data.OPERATORS.includes(mode)) {
        ESTest.in.useOperatorMode(input, mode, input2, msg);
      } else {
        throw new Error(
          `
          ❌ 2nd argument: ${ESTest.in.reuse.fixTextInLog(mode)}
          ✅ expects: 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'
          `,
        );
      }
    },
    getReport() {
      console.log(`
        Total usage of esTest: ${ESTest.data.report.total}

        - Type Mode - 
        "undefined": ${ESTest.data.report.undefined}
        "null": ${ESTest.data.report.null}
        "array": ${ESTest.data.report.array}
        "object": ${ESTest.data.report.object}
        "boolean": ${ESTest.data.report.boolean}
        "NaN": ${ESTest.data.report.NaN}
        "number": ${ESTest.data.report.number}
        "bigint": ${ESTest.data.report.bigint}
        "string": ${ESTest.data.report.string}
        "symbol": ${ESTest.data.report.symbol}
        "function": ${ESTest.data.report.function}

        - Operator Mode -
        "<": ${ESTest.data.report.lessThan}
        "<=": ${ESTest.data.report.lessThanOrEqual}
        ">=": ${ESTest.data.report.GreaterThanOrEqual}
        ">": ${ESTest.data.report.GreaterThan}
        "===": ${ESTest.data.report.StrictEquality}
        "!==": ${ESTest.data.report.StrictInequality}
        `);
    },
  },
};

export const { getReport, esTest, _getTestResult } = ESTest.out;
