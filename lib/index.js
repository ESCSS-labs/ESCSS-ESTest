/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const isDisabledLibrary = false
const defaultPubMsg = 'Custom your message, it will be visible in dev and prod mode.'

const _ALLOWED_TOKEN_TYPES = ['Undefined', 'Null', 'Array', 'Date', 'Object', 'Boolean', 'NaN', 'Number', 'BigInt', 'String', 'Symbol', 'Function', 'RegExp']
const _log = {
  publicMessage: (input) => `\n 📝 Public Message: ${input}`,
  productionHidden: () => console.log(` 🚫 Details hidden for security. Check in dev mode.`),
  errArg3: (pubMsg) => console.log(` ✅ Expected 3rd Argument (pubMsg): 'String' \n ❌ Received 3rd Argument (pubMsg): '${_tokenTypeof(pubMsg)}'`, pubMsg),
  errArg2: (tokenType) => console.log(` ✅ Expected 2nd Argument (tokenType): 'Undefined' | 'Null' | 'Array' | 'Date' | 'Object' | 'Boolean' | 'NaN' | 'Number' | 'BigInt' | 'String' | 'Symbol' | 'Function' | 'RegExp' \n ❌ Received 2nd Argument (tokenType):`, typeof tokenType === 'string' ? `'${tokenType}'`: tokenType),
  errArg1: (input, tokenType) => console.log(` ✅ Expected 1st Argument (input): '${tokenType}' \n ❌ Received 1st Argument (input): '${_tokenTypeof(input)}'`, input),
  common: {
    tokenTypeCheck: (value, tokenType) => console.log(`\n ❌ Expected input tokenType: '${tokenType}', but got: '${_tokenTypeof(value)}'`, value),
    invalidInput: (input) => console.log(`\n ❌ Invalid input, got:`, input),
    max: (input, value) => console.log(`\n ❌ Must be ${value} or more, but got:`, input),
    min: (input, value) => console.log(`\n ❌ Must be ${value} or fewer, but got:`, input),
    length: (input, value) => console.log(`\n ❌ Must be exactly ${value}, but got:`, input),
  },
}

/**
 * Enhanced Version of typeof
 * @param {*} input
 * @returns {string}
 */
function _tokenTypeof(input) {
  // NOTE: for performance reason, I don't want to make 'String' -> 'string', also make a difference from "typeof"
  // [object String]     --->  'String'
  // [object Object]     --->  'Object'
  // [object Array]      --->  'Array'
  // [object Null]       --->  'Null'
  // [object Undefined]  --->  'Undefined'
  // ...
  const tokenType = Object.prototype.toString.call(input).slice(8, -1)

  // Handle NaN (Number) and Invalid Date (Date) missed by regular checks.
  if (Number.isNaN(input)) return 'NaN'
  else if (tokenType === 'Date' && Number.isNaN(input.getTime())) throw new Error(`\n ✅ Expected: 'Date' \n ❌ Received: 'Date' (Invalid Date). You are trying to do this -> new Date('foo')`)
  else return tokenType
}

const _addOns = {
  String: class _chainString {
    // private
    #input
    #tokenType
    #pubMsg

    /**
     * @param {string} input 
     * @param {string} tokenType 
     * @param {string} pubMsg 
     */  
    constructor(input, tokenType, pubMsg) {
      this.#input = input
      this.#tokenType = tokenType
      this.#pubMsg = pubMsg
    }
  
    max(value) {
      if (_tokenTypeof(value) !== 'Number') {
        _log.common.tokenTypeCheck(value, 'Number')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if ((this.#input.length <= value) === false) {
        _log.common.max(this.#input.length, value)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    min(value) {
      if (_tokenTypeof(value) !== 'Number') {
        _log.common.tokenTypeCheck(value, 'Number')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if ((this.#input.length >= value) === false) {
        _log.common.min(this.#input.length, value)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    length(value) {
      if (_tokenTypeof(value) !== 'Number') {
        _log.common.tokenTypeCheck(value, 'Number')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if ((this.#input.length === value) === false) {
        _log.common.length(this.#input.length, value)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    email() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

      if (emailRegex.test(this.#input) === false) {
        _log.common.invalidInput(this.#input)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    uuid() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      // Changed: removed \b (not necessary)
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

      if (uuidRegex.test(this.#input) === false) {
        _log.common.invalidInput(this.#input)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    regex(value) {
      if (_tokenTypeof(value) !== 'RegExp') {
        _log.common.tokenTypeCheck(value, 'RegExp')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if (value.test(this.#input) === false) {
        _log.common.invalidInput(this.#input)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      return this
    }

    base64() {
      // https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
      const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

      if (base64Regex.test(this.#input) === false) {
        _log.common.invalidInput(this.#input)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    ip() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

      if ((ipv4Regex.test(this.#input) === false) && (ipv6Regex.test(this.#input) === false)) {
        _log.common.invalidInput(this.#input)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    trim() {
      this.#input = this.#input.trim()
      
      return this
    }

    toLowerCase() {
      this.#input = this.#input.toLowerCase()

      return this
    }

    toUpperCase() {
      this.#input = this.#input.toUpperCase()

      return this
    }
  },
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
          _log.productionHidden()
          throw new Error(_log.publicMessage(defaultPubMsg))
        }

        // Happy path (string)
        else {
          _log.productionHidden()
          throw new Error(_log.publicMessage(pubMsg))
        }
      }

      // Not matched 3rd argument (check first to ensure that pubMsg is always a string)
      if (typeof pubMsg !== 'string') {
        _log.errArg3(pubMsg)
        throw new Error(_log.publicMessage(defaultPubMsg))
      }

      // Not matched 2nd argument
      else if (!_ALLOWED_TOKEN_TYPES.includes(tokenType)) {
        _log.errArg2(tokenType)
        throw new Error(_log.publicMessage(pubMsg))
      }

      // Not matched 1st argument
      else if (_tokenTypeof(input) !== tokenType) {
        _log.errArg1(input, tokenType)
        throw new Error(_log.publicMessage(pubMsg))
      }
      
      // Add-On to chain methods
      else return new _addOns[tokenType](input, tokenType, pubMsg)
    } catch (error) {
      console.error(error)
    }
  }
}

export { _tokenTypeof, isDisabledLibrary, ESTest }
