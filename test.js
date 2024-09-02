const TestModule = {
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
    testResult: null, // internal test required
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
            if (TestModule.in.reuse.fixLegacyType(item) === "array") {
              result += `[...], `;
            } else {
              result += `${TestModule.in.reuse.fixTextInLog(item)}, `;
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
            if (TestModule.in.reuse.fixLegacyType(value) === "object") {
              result += `${key}: {...}, `;
            } else {
              result += `${key}: ${TestModule.in.reuse.fixTextInLog(value)}, `;
            }
          }

          result = `{${result.trim().slice(0, -1)}}`;

          return result;
        };

        switch (TestModule.in.reuse.fixLegacyType(input)) {
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
        if (!TestModule.data.TYPES.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${TestModule.in.reuse.fixTextInLog(mode)}
            ✅ expects: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = TestModule.in.reuse.fixLegacyType(msg);
          const customErrInLog = TestModule.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      if (TestModule.in.reuse.fixLegacyType(input) !== mode) {
        const fixTextInLogType = TestModule.in.reuse.fixTextInLog(mode);
        const fixTextInLogInput = TestModule.in.reuse.fixTextInLog(input);
        const fixLegacyType = TestModule.in.reuse.fixLegacyType(input);

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
          TestModule.data.report.undefined += 1;
          break;
        case "null":
          TestModule.data.report.null += 1;
          break;
        case "array":
          TestModule.data.report.array += 1;
          break;
        case "object":
          TestModule.data.report.object += 1;
          break;
        case "boolean":
          TestModule.data.report.boolean += 1;
          break;
        case "NaN":
          TestModule.data.report.NaN += 1;
          break;
        case "number":
          TestModule.data.report.number += 1;
          break;
        case "bigint":
          TestModule.data.report.bigint += 1;
          break;
        case "string":
          TestModule.data.report.string += 1;
          break;
        case "symbol":
          TestModule.data.report.symbol += 1;
          break;
        case "function":
          TestModule.data.report.function += 1;
          break;
      }

      TestModule.data.report.total += 1;
      TestModule.data.testResult = mode;
    },
    useOperatorMode(input, mode, input2, msg = "undefined error message") {
      {
        if (!TestModule.data.OPERATORS.includes(mode)) {
          throw new Error(
            `
            ❌ 2nd argument: ${TestModule.in.reuse.fixTextInLog(mode)}
            ✅ expects: '<' | '<=' | '>=' | '>' | '===' | '!=='
            `,
          );
        }
        if (!["undefined", "string"].includes(typeof msg)) {
          const customErrType = TestModule.in.reuse.fixLegacyType(msg);
          const customErrInLog = TestModule.in.reuse.fixTextInLog(msg);

          throw new Error(
            `
            ❌ error message type: 📝 ${customErrInLog}('${customErrType}')
            ✅ expects: 'string' type
            `,
          );
        }
      }

      const inputInLog = TestModule.in.reuse.fixTextInLog(input);
      const input2InLog = TestModule.in.reuse.fixTextInLog(input2);

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

          TestModule.data.report.lessThan += 1;
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

          TestModule.data.report.lessThanOrEqual += 1;
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

          TestModule.data.report.GreaterThanOrEqual += 1;
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

          TestModule.data.report.GreaterThan += 1;
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

          TestModule.data.report.StrictEquality += 1;
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

          TestModule.data.report.StrictInequality += 1;
          break;
      }

      TestModule.data.report.total += 1;
      TestModule.data.testResult = true;
    },
  },
  out: {
    // internal test purpose
    _getTestResult() {
      return TestModule.data.testResult;
    },
    test(input, mode, input2, msg) {
      if (TestModule.data.TYPES.includes(mode)) {
        TestModule.in.useTypeMode(input, mode, input2); // input2 === msg in useTypeMode
      } else if (TestModule.data.OPERATORS.includes(mode)) {
        TestModule.in.useOperatorMode(input, mode, input2, msg);
      } else {
        throw new Error(
          `
          ❌ 2nd argument: ${TestModule.in.reuse.fixTextInLog(mode)}
          ✅ expects: 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'
          `,
        );
      }
    },
    getReport() {
      console.log(`
        Total usage of test: ${TestModule.data.report.total}

        - Type Mode - 
        "undefined": ${TestModule.data.report.undefined}
        "null": ${TestModule.data.report.null}
        "array": ${TestModule.data.report.array}
        "object": ${TestModule.data.report.object}
        "boolean": ${TestModule.data.report.boolean}
        "NaN": ${TestModule.data.report.NaN}
        "number": ${TestModule.data.report.number}
        "bigint": ${TestModule.data.report.bigint}
        "string": ${TestModule.data.report.string}
        "symbol": ${TestModule.data.report.symbol}
        "function": ${TestModule.data.report.function}

        - Operator Mode -
        "<": ${TestModule.data.report.lessThan}
        "<=": ${TestModule.data.report.lessThanOrEqual}
        ">=": ${TestModule.data.report.GreaterThanOrEqual}
        ">": ${TestModule.data.report.GreaterThan}
        "===": ${TestModule.data.report.StrictEquality}
        "!==": ${TestModule.data.report.StrictInequality}
        `);
    },
  },
};

export const { getReport, test, _getTestResult } = TestModule.out;
