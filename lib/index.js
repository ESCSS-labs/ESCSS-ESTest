/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const _isDisabledESTest = false
const defaultPubMsg = 'Custom your message, it will be visible in dev and prod mode.'

let _testToken = ''
const ALLOWED_TOKEN_TYPES = ['Undefined', 'Null', 'Array', 'Date', 'Object', 'Boolean', 'NaN', 'Number', 'BigInt', 'String', 'Symbol', 'Function']

/**
 * @param {*} input
 * @returns {string}
 */
function getTokenType(input) {
  // [object String].   ---> 'String'
  // [object Undefined] ---> 'Undefined'
  // [object Array]    ---> 'Array'
  // ...
  const tokenType = Object.prototype.toString.call(input).slice(8, -1)

  if (Number.isNaN(input)) return 'NaN'
  else if (tokenType === 'Date' && Number.isNaN(input.getTime())) throw new Error(`\n ✅ Expected: 'Date' \n ❌ Received: 'Date' (Invalid Date). You are trying to do this -> new Date('foo')`)
  else return tokenType
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * @param {*} input
 * @param { 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' } tokenType
 * @param {string} [pubMsg = defaultPubMsg]
 */
function ESTest(input, tokenType, pubMsg = defaultPubMsg) {
  if (!_isDisabledESTest) {
    try {
      if (process.env.NODE_ENV === 'production') throw new Error(`\n 📝 Public Message: ${pubMsg} \n \n 🚫 Details hidden for security. Check in dev mode.`)
      else {
        // Invalid 3rd argument (Go first to prevent callback function in pubMsg for security reason)
        if (typeof pubMsg !== 'string') {
          setTimeout(() => console.log(`❌ Received 3rd Argument (pubMsg): '${getTokenType(pubMsg)}'`, pubMsg), 0)
          throw new Error(`\n 📝 Public Message: ${defaultPubMsg} \n \n ✅ Expected 3rd Argument (pubMsg): 'String'`)
        }

        // Invalid 2nd argument
        else if (!ALLOWED_TOKEN_TYPES.includes(tokenType)) {
          setTimeout(() => console.log('❌ Received 2nd Argument (tokenType): ', tokenType), 0)
          throw new Error(`\n 📝 Public Message: ${pubMsg} \n \n ✅ Expected 2nd Argument (tokenType): 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function'`)
        }

        // Not match tokenType
        else if (getTokenType(input) !== tokenType) {
          setTimeout(() => console.log(`❌ Received 2nd Argument (tokenType): '${getTokenType(input)}'`, input), 0)
          throw new Error(`\n 📝 Public Message: ${pubMsg} \n \n ✅ Expected 2nd Argument (tokenType): '${tokenType}'`)
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

export { _testToken, _isDisabledESTest, ESTest }
