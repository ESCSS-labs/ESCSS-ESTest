/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const isDisabledLibrary = false
const defaultPubMsg = 'Custom your message, it will be visible in dev and prod mode.'

let _testToken = ''
const _ALLOWED_TOKEN_TYPES = ['Undefined', 'Null', 'Array', 'Date', 'Object', 'Boolean', 'NaN', 'Number', 'BigInt', 'String', 'Symbol', 'Function', 'RegExp']
const _LOG = {
  publicMessage: (input) => `\n 📝 Public Message: ${input}`,
  prodHidden: () => console.log(` 🚫 Details hidden for security. Check in dev mode.`),
  errNotMatched: (tokenType, input) => console.log(` ✅ Expected: '${tokenType}' \n ❌ Received: '${getTokenType(input)}'`, input),
  err2ndArg: (tokenType) => console.log(` ✅ Expected 2nd Argument (tokenType): 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' | 'RegExp' \n ❌ Received 2nd Argument (tokenType): '${typeof tokenType}'`, tokenType),
  err3rdArg: (pubMsg) => console.log(` ✅ Expected 3rd Argument (pubMsg): 'String' \n ❌ Received 3rd Argument (pubMsg): '${getTokenType(pubMsg)}'`, pubMsg),
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
        // edge case
        if (typeof pubMsg !== 'string') {
          setTimeout(() => _LOG.prodHidden, 0)
          throw new Error(_LOG.publicMessage(defaultPubMsg))
        }

        // happy path (string)
        else {
          setTimeout(() => _LOG.prodHidden, 0)
          throw new Error(_LOG.publicMessage(pubMsg))
        }
      }

      else {
        // Invalid 3rd argument (Go first to prevent callback function in pubMsg for security reason)
        if (typeof pubMsg !== 'string') {
          setTimeout(() => _LOG.err3rdArg(pubMsg), 0)
          throw new Error(_LOG.publicMessage(defaultPubMsg))
        }

        // Invalid 2nd argument
        else if (!_ALLOWED_TOKEN_TYPES.includes(tokenType)) {
          setTimeout(() => _LOG.err2ndArg(tokenType), 0)
          throw new Error(_LOG.publicMessage(pubMsg))
        }

        // Not match tokenType
        else if (getTokenType(input) !== tokenType) {
          setTimeout(() => _LOG.errNotMatched(tokenType, input), 0)
          throw new Error(_LOG.publicMessage(pubMsg))
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
