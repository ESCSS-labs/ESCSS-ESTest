/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const _isDisabledESTest = false
const defaultErrMsg = 'undefined default error message'

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
 * Fixed message display. e.g, 1 -> '1' 、 1,2,3 -> [1, 2, 3] 、 [object Object] -> {a: 1, b:{c: 1, d: 2}}
 * @param {*} input
 * @returns {string} string
 */
function fixTextInLog(input) {
  switch (fixType(input)) {
    case 'array':
      return fix_ArrayInLog()
    case 'object':
      return fix_ObjectInLog()
    case 'bigint':
      return `${input}n`
    case 'string':
      return `'${input}'`
    case 'symbol':
      return `Symbol(...)`
    default:
      return input
  }

  function fix_ArrayInLog() {
    let result = ''

    input.forEach((item) => {
      result += `${fixTextInLog(item)}, `
    })

    // Remove , and space in the end
    result = `[${result.trim().slice(0, -1)}]`
    return result
  }

  function fix_ObjectInLog() {
    let result = ''

    for (const [key, value] of Object.entries(input)) {
      result += `${key}: ${fixTextInLog(value)}, `
    }

    // Remove , and space in the end
    result = `{${result.trim().slice(0, -1)}}`
    return result
  }
}

function getError(errMsg) {
  throw new Error(
    `
      📝 ${errMsg}
      🚫 Details hidden in production for security, visible in development.
    `,
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
      if (!TYPES.includes(type)) {
        if (process.env.NODE_ENV === 'production') {
          getError(errMsg)
        }
        else {
          throw new Error(
            `
            ✅ Expected 2nd Argument Type: 'undefined' | 'null' | 'array' | 'date' | 'regexp' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
            ❌ Received 2nd Argument: ${fixTextInLog(type)}
          `,
          )
        }
      }
      else if (!['undefined', 'string'].includes(typeof errMsg)) {
        if (process.env.NODE_ENV === 'production') {
          getError(errMsg)
        }
        else {
          throw new Error(
            `
            ✅ Expected Error Message Type: 'string'
            ❌ Received Error Message Type: '${fixType(errMsg)}' --> ${fixTextInLog(errMsg)}
          `,
          )
        }
      }
      else if (fixType(input) === 'date' && input.toString() === 'Invalid Date') {
        if (process.env.NODE_ENV === 'production') {
          getError(errMsg)
        }
        else {
          throw new Error(
            `
            📝 ${errMsg}
            ✅ Expected Type: ${fixTextInLog(type)} 
            ❌ Received Type: 'date' --> Invalid Date
          `,
          )
        }
      }
      else if (fixType(input) !== type) {
        if (process.env.NODE_ENV === 'production') {
          getError(errMsg)
        }
        else {
          throw new Error(
            `
            📝 ${errMsg}
            ✅ Expected Type: ${fixTextInLog(type)} 
            ❌ Received Type: '${fixType(input)}' --> ${fixTextInLog(input)}
          `,
          )
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
