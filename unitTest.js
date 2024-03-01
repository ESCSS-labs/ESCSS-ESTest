const unitTestModule = {
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
      fix_LegacyType(input) {
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

        return typeMap[typeof input] || `❌ Error from fix_LegacyType(), input: ${input}`
      },
      /**
       *  To correctly display text in the log.
       * @param {*} input 
       * @returns 
       */
      fix_TextInLog(input) {
        switch (this.fix_LegacyType(input)) {
          case 'array':
            return (() => {
              let result = ''

              input.forEach(item => {
                if (this.fix_LegacyType(item) === 'array') {
                  result += `[...], `
                } else {
                  result += `${this.fix_TextInLog(item)}, `
                }
              })

              // to remove the end of spacing and ,
              result = `[${result.trim().slice(0, -1)}]`

              return result
            }) ();
          case 'object':
            return (() => {
              let result = ''

              for(const [key, value] of Object.entries(input)) {
                if (this.fix_LegacyType(value) === 'object') {
                  result += `${key}: {...}, `
                } else {
                  result += `${key}: ${this.fix_TextInLog(value)}, `
                }
              }

              // to remove the end of spacing and , 
              result = `{${result.trim().slice(0, -1)}}`

              return result
            }) ();
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
     * @param {Number} input2 The compared value
     * @param {String} [errorMessage] Custom your error message
     * @returns {Void | Error}
     */
    deal_OperatorMode(input, operator, input2, errorMessage = 'undefined error message (4th argument)') {
      {
        if (!unitTestModule.data.ALLOW_OPERATORS.includes(operator)) {
          throw new Error(`❌ Your 2nd argument: ${this.reuse.fix_TextInLog(operator)}, ✅ ('<', '<=', '>=', '>', '===', '!==')`)
        }
        if (this.reuse.fix_LegacyType(input) !== 'number' || this.reuse.fix_LegacyType(input2) !== 'number') {
          const inputInLog = this.reuse.fix_TextInLog(input)
          const inputFixedType = this.reuse.fix_LegacyType(input)
          const inputInLog2 = this.reuse.fix_TextInLog(input2)
          const inputFixedType2 = this.reuse.fix_LegacyType(input2)
  
          throw new Error(`❌ Your 1st input: ${inputInLog}('${inputFixedType}'); 2nd input: ${inputInLog2}('${inputFixedType2}'), ✅ both types should be 'number'`)
        }
        if (this.reuse.fix_LegacyType(errorMessage) !== 'string') {
          const customErrorInLog = this.reuse.fix_TextInLog(errorMessage)
          const customErrorType = this.reuse.fix_LegacyType(errorMessage)
  
          throw new Error(`❌ Your error message: ${customErrorInLog}('${customErrorType}') , ✅ type should be 'string'`)
        }
      }

      switch(operator) {
        case '<':
          if (!(input < input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} < ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        case '<=':
          if (!(input <= input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} <= ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        case '>=':
          if (!(input >= input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} >= ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        case '>':
          if (!(input > input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} > ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        case '===':
          if (!(input === input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} === ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        case '!==':
          if (!(input !== input2)) {
            throw new Error(`❌ ${this.reuse.fix_TextInLog(input)} !== ${this.reuse.fix_TextInLog(input2)}, errorMessage: ${errorMessage}`);
          }
          return 
        default:
          throw new Error(`❌ Error from deal_OperatorMode(), operator: ${operator}`);
      }
    },
    /**
     * @param {*} input The testing value 
     * @param {'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'} type
     * @returns {Void | Error}
     */
    deal_TypeMode(input, type) {
      {
        if (!unitTestModule.data.ALLOW_TYPES.includes(type)) {
          throw new Error(`❌ Your 2nd argument: ${this.reuse.fix_TextInLog(type)}, ✅ ('undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function')`)
        }
      }
      
      if (this.reuse.fix_LegacyType(input) !== type) { 
        const typeInLog = this.reuse.fix_TextInLog(type)
        const inputInLog = this.reuse.fix_TextInLog(input)
        const inputFixedType = this.reuse.fix_LegacyType(input)

        throw new Error(`❌ typeof ${inputInLog} === ${typeInLog}, ✅ '${inputFixedType}' --> ${typeInLog}`)
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
    /** 
     * Achieving 100% function coverage will save your life.
     * @param {*} input The testing value 
     * @param {'undefined'|'null'|'array'|'object'|'boolean'|'NaN'|'number'|'bigint'|'string'|'symbol'|'function'|'==='|'!=='|'<'|'<='|'>='|'>'} mode
     * @param {Number} input2 The compared value (operator only)
     * @param {String} [errorMessage] optional: custom your error message (operator only)
     * @returns {Void|Error} PASS: void | FAIL: throw Error 
     * @example 
     * <PASS>
     * - mode: type
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
     * - mode: operator
     * unitTest(1, '<', 5)
     * unitTest(1, '<=', 5)
     * unitTest(5, '>', 1)
     * unitTest(5, '>=', 1)
     * unitTest(1, '===', 1)
     * unitTest([1,2], '!==', 'Hello world')
    */
    unitTest(input, mode, input2, errorMessage) { 
      {
        if (!unitTestModule.data.ALLOW_TYPES.includes(mode) && !unitTestModule.data.ALLOW_OPERATORS.includes(mode)) {
          unitTestModule.in.deal_EdgeCases(mode)
        }
      }
          
      if (unitTestModule.data.ALLOW_TYPES.includes(mode)) {
        unitTestModule.in.deal_TypeMode(input, mode)

        // for testing purpose
        return mode
      }
      else if (unitTestModule.data.ALLOW_OPERATORS.includes(mode)) {
        unitTestModule.in.deal_OperatorMode(input, mode, input2, errorMessage)

        // for testing purpose
        return true
      }
    },
  }
}

export const { unitTest } = unitTestModule.out