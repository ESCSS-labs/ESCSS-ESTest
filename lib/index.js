/**
* escss-estest v1.4.13
* (c) 2024 Mike Lee
* @license AGPL-3.0-only OR Commercial
**/

/**
 *  - true: shows data and log details.
 *  - false(DEFAULT): hidden data and log details.
 *
 *  To show log details during development, set `isLogVisible: true`:
 *    - Nuxt:
 *      Changes in `node_modules/escss-estest/lib/index.js` and restart dev server.
 *
 *    - Others:
 *      Changes in `node_modules/.vite/deps/escss-estest.js` and restart dev server.
 */
const isLogVisible = false
const customErrMsg = 'undefined error message'

/** Internal testing purpose, does not affect production. */
let internalTestToken = ''

const TYPES = ['undefined', 'null', 'array', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function']

/**
 * New types added to typeof in JavaScript. e.g, 'null' 、 'undefined' 、 'array' 、 'NaN'
 * @param {*} input
 * @returns {string} string
 */
function fixType(input) {
  const isNull = input === null
  const isArray = Array.isArray(input)
  const isNaN = Number.isNaN(input)

  const typeMap = {
    undefined: 'undefined',
    object: isNull ? 'null' : isArray ? 'array' : 'object',
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
 * Fixed incorrect console.log display. e.g, 1 -> '1' 、 1,2,3 -> [1, 2, 3] 、 [object Object] -> {a: 1, b:{c: 1, d: 2}}
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

function getErrorMsg(msg) {
  throw new Error(
    `
      🚫 isLogVisible: false. Unable to display log details.
      ❗ ${msg}
    `,
  )
}

/**
 * 100% function coverage for easier life. demo: https://demo-estest-log-not-visible.netlify.app/
 * @param {*} input
 * @param { 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' } type
 * @param {string} errMsg
 * ```js
 * ESTest(NaN, 'NaN')
 * ESTest([], 'array')
 * ESTest(null, 'null')
 * ESTest(undefined, 'undefined')
 * ESTest(1, 'number')
 * ESTest('foo', 'string')
 * ESTest(true, 'boolean')
 * ESTest({}, 'object')
 * ESTest(1n, 'bigint')
 * ESTest(Symbol(), 'symbol')
 * ESTest(function () {}, 'function')
 * ESTest(1, 'object') // error
 * ESTest(1, 'object', 'foo') // error & message "foo"
 * ```
 */
function ESTest(input, type, errMsg = customErrMsg) {
  if (!TYPES.includes(type)) {
    if (!isLogVisible) getErrorMsg(errMsg)

    throw new Error(
      `
        ✅ Expected 2nd Argument Type: 'undefined' | 'null' | 'array' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function'
        ❌ Received 2nd Argument: ${fixTextInLog(type)}
      `,
    )
  }
  else if (!['undefined', 'string'].includes(typeof errMsg)) {
    if (!isLogVisible) getErrorMsg(errMsg)

    throw new Error(
      `
        ✅ Expected Error Message Type: 'string'
        ❌ Received Error Message Type: '${fixType(errMsg)}' --> ${fixTextInLog(errMsg)}
      `,
    )
  }
  else if (fixType(input) !== type) {
    if (!isLogVisible) getErrorMsg(errMsg)

    throw new Error(
      `
        ✅ Expected Type: ${fixTextInLog(type)} 
        ❌ Received Type: '${fixType(input)}' --> ${fixTextInLog(input)}
        ❗ ${errMsg}
      `,
    )
  }

  internalTestToken = type
}

export { internalTestToken, isLogVisible, ESTest }
