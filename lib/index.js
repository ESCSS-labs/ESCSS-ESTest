/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const isDisabledLibrary = false
const defaultPubMsg = 'Custom your message, it will be visible in dev and prod mode.'

let _testToken = ''
const _ALLOWED_TOKEN_TYPES = ['Undefined', 'Null', 'Array', 'Date', 'Object', 'Boolean', 'NaN', 'Number', 'BigInt', 'String', 'Symbol', 'Function', 'RegExp']
const _log = {
  publicMessage: (input) => `\n 📝 Public Message: ${input}`,
  productionHidden: () => console.log(` 🚫 Details hidden for security. Check in dev mode.`),
  errArg1st: (tokenType, input) => console.log(` ✅ Expected: '${tokenType}' \n ❌ Received: '${getTokenType(input)}'`, input),
  errArg2nd: (tokenType) => console.log(` ✅ Expected 2nd Argument (tokenType): 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' | 'RegExp' \n ❌ Received 2nd Argument (tokenType): '${typeof tokenType}'`, tokenType),
  errArg3rd: (pubMsg) => console.log(` ✅ Expected 3rd Argument (pubMsg): 'String' \n ❌ Received 3rd Argument (pubMsg): '${getTokenType(pubMsg)}'`, pubMsg),
}
/**
 * @param {*} input
 * @returns {string}
 */
function getTokenType(input) {
  // NOTE: for performance reason, I don't want to make 'String' -> 'string', also make a difference from "typeof"
  // [object String]    ---> 'String'
  // [object Undefined] ---> 'Undefined'
  // [object Array]     ---> 'Array'
  // ...
  const tokenType = Object.prototype.toString.call(input).slice(8, -1)

  if (Number.isNaN(input)) return 'NaN'
  else if (tokenType === 'Date' && Number.isNaN(input.getTime())) throw new Error(`\n ✅ Expected: 'Date' \n ❌ Received: 'Date' (Invalid Date). You are trying to do this -> new Date('foo')`)
  else return tokenType
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * @param {*} input
 * @param { 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' | 'RegExp' } tokenType
 * @param {string} [pubMsg = defaultPubMsg]
 */
function ESTest(input, tokenType, pubMsg = defaultPubMsg) {
  if (!isDisabledLibrary) {
    try {
      if (process.env.NODE_ENV === 'production') {
        // Edge case
        if (typeof pubMsg !== 'string') {
          setTimeout(() => _log.productionHidden, 0)
          throw new Error(_log.publicMessage(defaultPubMsg))
        }

        // Happy path (string)
        else {
          setTimeout(() => _log.productionHidden, 0)
          throw new Error(_log.publicMessage(pubMsg))
        }
      }

      else {
        // Not matched 3rd argument (check first to ensure that pubMsg is always a string)
        if (typeof pubMsg !== 'string') {
          setTimeout(() => _log.errArg3rd(pubMsg), 0)
          throw new Error(_log.publicMessage(defaultPubMsg))
        }

        // Not matched 2nd argument
        else if (!_ALLOWED_TOKEN_TYPES.includes(tokenType)) {
          setTimeout(() => _log.errArg2nd(tokenType), 0)
          throw new Error(_log.publicMessage(pubMsg))
        }

        // Not matched 1st argument
        else if (getTokenType(input) !== tokenType) {
          setTimeout(() => _log.errArg1st(tokenType, input), 0)
          throw new Error(_log.publicMessage(pubMsg))
        }
      }

      if (process.env.NODE_ENV === 'test') {
        _testToken = tokenType
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { _testToken, isDisabledLibrary, ESTest }
