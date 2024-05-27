const UNITTEST = {
  data: {
    OPERATORS: ['<', '<=', '>=', '>', '===', '!=='],
    TYPES: ['undefined', 'null', 'array', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function'],
  },
  in: {
    reuse: {
      /**
       * Fix legacy types in JavaScript and make them more specific.
       * @param {*} input 
       * @returns 
       */
      getNewType(input) {
        const isNull = input === null
        const isArray = Array.isArray(input)
        const isNaN = Number.isNaN(input)

        const typeMap = {
          'undefined': 'undefined',
          'object': isNull ? 'null' : isArray ? 'array' : 'object',
          'boolean': 'boolean',
          'number': isNaN ? 'NaN' : 'number',
          'bigint': 'bigint',
          'string': 'string',
          'symbol': 'symbol',
          'function': 'function'
        }

        return typeMap[typeof input] || `❌ Error from getNewType(), input: ${input}`
      },
      /**
       *  To correctly display text in the log.
       * @param {*} input 
       * @returns 
       */
      fixTextInLog(input) {
        const fix_ArrayLog = () => {
          let result = ''

          input.forEach(item => {
            if (UNITTEST.in.reuse.getNewType(item) === 'array') {
              result += `[...], `
            } else {
              result += `${UNITTEST.in.reuse.fixTextInLog(item)}, `
            }
          })

          // to remove the end of spacing and ,
          result = `[${result.trim().slice(0, -1)}]`

          // [1, 'hello', [...]]
          return result
        }
        const fix_ObjectLog = () => {
          let result = ''

          for (const [key, value] of Object.entries(input)) {
            if (UNITTEST.in.reuse.getNewType(value) === 'object') {
              result += `${key}: {...}, `
            } else {
              result += `${key}: ${UNITTEST.in.reuse.fixTextInLog(value)}, `
            }
          }

          // to remove the end of spacing and , 
          result = `{${result.trim().slice(0, -1)}}`

          // {1, 'hello', {...}}
          return result
        }

        switch (UNITTEST.in.reuse.getNewType(input)) {
          case 'array':
            return fix_ArrayLog();
          case 'object':
            return fix_ObjectLog();
          case 'bigint':
            return `${input}n`;
          case 'string':
            return `'${input}'`;
          case 'symbol':
            return `Symbol(...)`;
          default:
            return input
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
        if (!UNITTEST.data.OPERATORS.includes(operator)) {
          throw new Error(`❌ Your 2nd argument: ${UNITTEST.in.reuse.fixTextInLog(operator)}, ✅ ('<', '<=', '>=', '>', '===', '!==')`)
        }
        if (!['undefined', 'string'].includes(UNITTEST.in.reuse.getNewType(errMsg))) {
          const customErrType = UNITTEST.in.reuse.getNewType(errMsg)
          const customErrInLog = UNITTEST.in.reuse.fixTextInLog(errMsg)

          throw new Error(`❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ should be 'string' type`)
        }
      }

      if (!errMsg) {
        errMsg = 'undefined error message (4th argument)'
      }

      const inputInLog = UNITTEST.in.reuse.fixTextInLog(input)
      const input2InLog = UNITTEST.in.reuse.fixTextInLog(input2)

      switch (operator) {
        case '<':
          {
            if (!(input < input2)) {
              throw new Error(`❌ ${inputInLog} < ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        case '<=':
          {
            if (!(input <= input2)) {
              throw new Error(`❌ ${inputInLog} <= ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        case '>=':
          {
            if (!(input >= input2)) {
              throw new Error(`❌ ${inputInLog} >= ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        case '>':
          {
            if (!(input > input2)) {
              throw new Error(`❌ ${inputInLog} > ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        case '===':
          {
            if (!(input === input2)) {
              throw new Error(`❌ ${inputInLog} === ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        case '!==':
          {
            if (!(input !== input2)) {
              throw new Error(`❌ ${inputInLog} !== ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break
        default:
          throw new Error(`❌ Error from useOperatorMode(), operator: ${operator}`);
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
        if (!UNITTEST.data.TYPES.includes(type)) {
          throw new Error(`❌ Your 2nd argument: ${UNITTEST.in.reuse.fixTextInLog(type)}, ✅ ('undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function')`)
        }
        if (!(['undefined', 'string'].includes(UNITTEST.in.reuse.getNewType(errMsg)))) {
          const customErrType = UNITTEST.in.reuse.getNewType(errMsg)
          const customErrInLog = UNITTEST.in.reuse.fixTextInLog(errMsg)

          throw new Error(`❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ should be 'string' type`)
        }
      }

      if (UNITTEST.in.reuse.getNewType(input) !== type) {
        const fixTextInLogType = UNITTEST.in.reuse.fixTextInLog(type)
        const fixTextInLogInput = UNITTEST.in.reuse.fixTextInLog(input)
        const getNewType = UNITTEST.in.reuse.getNewType(input)

        const defaultErrMsg = `❌ typeof ${fixTextInLogInput} === ${fixTextInLogType}, ✅ type: '${getNewType}' should be ${fixTextInLogType}`

        if (errMsg) {
          throw new Error(`${defaultErrMsg} (${errMsg})`)
        }
        else {
          throw new Error(defaultErrMsg)
        }
      }
    },
    /**
     * @param {*} mode 
     * @returns {Error}
     */
    dealEdgeCases(mode) {
      throw new Error(`❌ Your 2nd argument: ${UNITTEST.in.reuse.fixTextInLog(mode)}, ✅ 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'`)
    }
  },
  out: {
    /** 
           * Achieving 100% function coverage will save your life.
           * @param {*} input The testing value 
           * @param {'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'} mode
           * @param {*} [input2] operator mode: input2 | type mode(optional): custom error message
           * @param {undefined | String} [errMsg] operator mode(optional): custom error message
           * @returns {Void|Error} PASS: void | FAIL: throw an Error 
           * @example 
           * <PASS>
           * - type mode -
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
           * unitTest(1, 'object', 'foo') // custom error message
           * 
           * - operator mode -
           * unitTest(1, '<', 5)
           * unitTest(1, '<=', 5)
           * unitTest(5, '>', 1)
           * unitTest(5, '>=', 1)
           * unitTest(1, '===', 1)
           * unitTest(1, '!==', 2) 
           * unitTest(1, '>=', 100, 'foo') // custom error message
          */
    unitTest(input, mode, input2, errMsg) {
      {
        if (!UNITTEST.data.TYPES.includes(mode) && !UNITTEST.data.OPERATORS.includes(mode)) {
          UNITTEST.in.dealEdgeCases(mode)
        }
      }

      if (UNITTEST.data.TYPES.includes(mode)) {
        UNITTEST.in.useTypeMode(input, mode, input2)

        // for testing purpose
        return mode
      }
      else if (UNITTEST.data.OPERATORS.includes(mode)) {
        UNITTEST.in.useOperatorMode(input, mode, input2, errMsg)

        // for testing purpose
        return true
      }
    }
  }
}

const unitTest = UNITTEST.out.unitTest;

export { unitTest };