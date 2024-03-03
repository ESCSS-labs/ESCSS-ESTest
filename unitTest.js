const unitTest = {
  data: {
    ALLOW_OPERATORS: ['<', '<=', '>=', '>', '===', '!=='],
    ALLOW_TYPES: ['undefined', 'null', 'array', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function'],
  },
  in: {
    reuse: {
      /**
       * Fix legacy types in JavaScript and make them more specific.
       * @param {*} input 
       * @returns 
       */
      get_NewType(input) {
        const isNull = input === null
        const isArray = Array.isArray(input)
        const isNaN = Number.isNaN(input)

        const typeMap = {
          'undefined': 'undefined',
          'object': isNull? 'null': isArray? 'array': 'object',
          'boolean': 'boolean',
          'number': isNaN? 'NaN': 'number',
          'bigint': 'bigint',
          'string': 'string',
          'symbol': 'symbol',
          'function': 'function'
        }

        return typeMap[typeof input] || `❌ Error from get_NewType(), input: ${input}`
      },
      /**
       *  To correctly display text in the log.
       * @param {*} input 
       * @returns 
       */
      fix_TextInLog(input) {
        const fix_ArrayLog = () => {
          let result = ''

          input.forEach(item => {
            if (this.get_NewType(item) === 'array') {
              result += `[...], `
            } else {
              result += `${this.fix_TextInLog(item)}, `
            }
          })

          // to remove the end of spacing and ,
          result = `[${result.trim().slice(0, -1)}]`

          // [1, 'hello', [...]]
          return result
        }
        const fix_ObjectLog = () => {
          let result = ''

          for(const [key, value] of Object.entries(input)) {
            if (this.get_NewType(value) === 'object') {
              result += `${key}: {...}, `
            } else {
              result += `${key}: ${this.fix_TextInLog(value)}, `
            }
          }

          // to remove the end of spacing and , 
          result = `{${result.trim().slice(0, -1)}}`

          // {1, 'hello', {...}}
          return result
        }

        switch (this.get_NewType(input)) {
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
     * @param {Number} input The testing value 
     * @param {'<'|'<='|'>='|'>'|'==='|'!=='} operator
     * @param {Number} value2 The compared value
     * @param {undefined | String} [errMsg] Custom your error message
     * @returns {Void | Error}
     */
    use_OperatorMode(input, operator, value2, errMsg) {
      {
        if (!unitTest.data.ALLOW_OPERATORS.includes(operator)) {
          throw new Error(`❌ Your 2nd argument: ${this.reuse.fix_TextInLog(operator)}, ✅ ('<', '<=', '>=', '>', '===', '!==')`)
        }
        if (!(['number'].includes(this.reuse.get_NewType(input)) && ['number'].includes(this.reuse.get_NewType(value2)))) {
          const inputInLog = this.reuse.fix_TextInLog(input)
          const inputNewType = this.reuse.get_NewType(input)
          const inputInLog2 = this.reuse.fix_TextInLog(value2)
          const inputNewType2 = this.reuse.get_NewType(value2)
  
          throw new Error(`❌ Your 1st input: ${inputInLog}('${inputNewType}'); 2nd input: ${inputInLog2}('${inputNewType2}'), ✅ both types should be 'number'`)
        }
        if (!['undefined' ,'string'].includes(this.reuse.get_NewType(errMsg))) {
          const customErrType = this.reuse.get_NewType(errMsg)
          const customErrInLog = this.reuse.fix_TextInLog(errMsg)
  
          throw new Error(`❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ type should be 'string'`)
        }
      }

      if (!errMsg) {
        errMsg = 'undefined error message (4th argument)'
      }

      const inputInLog = this.reuse.fix_TextInLog(input)
      const input2InLog = this.reuse.fix_TextInLog(value2)

      switch(operator) {
        case '<':
          {
            if (!(input < value2)) {
              throw new Error(`❌ ${inputInLog} < ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        case '<=':
          {
            if (!(input <= value2)) {
              throw new Error(`❌ ${inputInLog} <= ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        case '>=':
          {
            if (!(input >= value2)) {
              throw new Error(`❌ ${inputInLog} >= ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        case '>':
          {
            if (!(input > value2)) {
              throw new Error(`❌ ${inputInLog} > ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        case '===':
          {
            if (!(input === value2)) {
              throw new Error(`❌ ${inputInLog} === ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        case '!==':
          {
            if (!(input !== value2)) {
              throw new Error(`❌ ${inputInLog} !== ${input2InLog}, errMsg: ${errMsg}`);
            }
          }

          break 
        default:
          throw new Error(`❌ Error from use_OperatorMode(), operator: ${operator}`);
      }
    },
    /**
     * @param {*} input The testing value 
     * @param {'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'} type
     * @param {undefined | String} [errMsg] Custom your error message
     * @returns {Void | Error}
     */
    use_TypeMode(input, type, value2) {
      {
        if (!unitTest.data.ALLOW_TYPES.includes(type)) {
          throw new Error(`❌ Your 2nd argument: ${this.reuse.fix_TextInLog(type)}, ✅ ('undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function')`)
        }
        if (!(['undefined', 'string'].includes(this.reuse.get_NewType(value2)))) {
          const customErrType = this.reuse.get_NewType(value2)
          const customErrInLog = this.reuse.fix_TextInLog(value2)
  
          throw new Error(`❌ Your error message: ${customErrInLog}('${customErrType}') , ✅ type should be 'string'`)
        }
      }
      
      if (this.reuse.get_NewType(input) !== type) { 
        const typeInLog = this.reuse.fix_TextInLog(type)
        const inputInLog = this.reuse.fix_TextInLog(input)
        const inputNewType = this.reuse.get_NewType(input)
        
        let defaultErrMsg = `❌ typeof ${inputInLog} === ${typeInLog}, ✅ type: '${inputNewType}' --> ${typeInLog}`

        if (value2) {
          throw new Error(`${defaultErrMsg} (${value2})`)
        }
        else throw new Error(defaultErrMsg)
      }
    },
    /**
     * @param {*} mode 
     * @returns {Error}
     */
    deal_EdgeCases(mode) {
      throw new Error(`❌ Your 2nd argument: ${this.reuse.fix_TextInLog(mode)}, ✅ 'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'`)
    }
  },
  out: {
    es: {
      /** 
       * Achieving 100% function coverage will save your life.
       * @param {*} input The testing value 
       * @param {'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'} mode
       * @param {String | Number} value2 type : error message(optional) | operator: compared number
       * @param {String} [errMsg] optional: custom your error message (operator only)
       * @returns {Void|Error} PASS: void | FAIL: throw Error 
       * @example 
       * <PASS>
       * - type:
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
       * 
       * - operator:
       * unitTest(1, '<', 5)
       * unitTest(1, '<=', 5)
       * unitTest(5, '>', 1)
       * unitTest(5, '>=', 1)
       * unitTest(1, '===', 1)
       * unitTest([1,2], '!==', 'Hello world')
      */
      unitTest(input, mode, value2, errMsg) { 
        {
          if (!unitTest.data.ALLOW_TYPES.includes(mode) && !unitTest.data.ALLOW_OPERATORS.includes(mode)) {
            unitTest.in.deal_EdgeCases(mode)
          }
        }
            
        if (unitTest.data.ALLOW_TYPES.includes(mode)) {
          unitTest.in.use_TypeMode(input, mode, value2)

          // for testing purpose
          return mode
        }
        else if (unitTest.data.ALLOW_OPERATORS.includes(mode)) {
          unitTest.in.use_OperatorMode(input, mode, value2, errMsg)

          // for testing purpose
          return true
        }
      },
    }
  }
}

export const { es } = unitTest.out