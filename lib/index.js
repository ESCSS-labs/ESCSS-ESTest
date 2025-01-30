/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const _isDisabledESTest = false
const defaultErrMsg = 'undefined error message'

let _testToken = ''
const TYPES = ['undefined', 'null', 'array', 'date', 'regexp', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function']

/**
 * New types added. e.g, 'null'、'undefined'、'array'、'NaN'、'date'、'regexp'
 * @param {*} input
 * @returns {string} string
 */
function fixType(input) {
  const isNull = input === null
  const isArray = Array.isArray(input)
  const isNaN = Number.isNaN(input)
  const isDate = input instanceof Date;
  const isRegExp = input instanceof RegExp;

  const typeMap = {
    undefined: 'undefined',
    object: isNull ? 'null' : isArray ? 'array' : isDate ? 'date' : isRegExp ? 'regexp' : 'object',
    boolean: 'boolean',
    number: isNaN ? 'NaN' : 'number',
    bigint: 'bigint',
    string: 'string',
    symbol: 'symbol',
    function: 'function',
  }

  return (
    typeMap[typeof input]
    || `❌ Internal Error from fixType, please send issue https://github.com/ESCSS-labs/ESCSS-ESTest/issues. input: ${input}.`
  )
}

/**
 * A runtime testing library inspired by TDD and TypeScript to achieve 100% coverage
 * @param {*} input
 * @param { 'undefined' | 'null' | 'array' | 'date' | 'regexp' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' } type
 * @param {string} errMsg
 */
function ESTest(input, type, errMsg = defaultErrMsg) {
  if (!_isDisabledESTest) {
    try {
      if (process.env.NODE_ENV === 'production') throw new Error(`\n 📝 Public Message: ${errMsg} \n 🚫 Details hidden for security. Check in development mode.`)
      else {
        if (!TYPES.includes(type)) {
          setTimeout(() => console.log('❌ Received 2nd Argument: ', type), 0)
          throw new Error(`\n 📝 Public Message: ${errMsg} \n ✅ Expected 2nd Argument Type: 'undefined' | 'null' | 'array' | 'date' | 'regexp' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'`)
        }
        else if (!['undefined', 'string'].includes(typeof errMsg)) {
          throw new Error(`\n 📝 Public Message: ${errMsg} \n ✅ Expected Error Message Type: 'string'`)
        }
        else if (fixType(input) === 'date' && input.toString() === 'Invalid Date') {
          setTimeout(() => console.log(`❌ Received Type: 'date' (Invalid Date) `), 0)
          throw new Error(`\n 📝 Public Message: ${errMsg} \n ✅ Expected Type: 'data'`)
        }
        else if (fixType(input) !== type) {
          setTimeout(() => console.log(`❌ Received Type: '${fixType(input)}'`, input), 0)
          throw new Error(`\n 📝 Public Message: ${errMsg} \n ✅ Expected Type: '${type}'`)
        }
      }
      if (process.env.NODE_ENV === 'test') {
        _testToken = type
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { _testToken, _isDisabledESTest, ESTest }
