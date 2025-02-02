/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const isDisabledLibrary = false
const defaultPubMsg = 'Custom your message, it will be visible in dev and prod mode.'

const _ALLOWED_TYPES = ['undefined', 'null', 'array', 'date', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function', 'regex']
const _log = {
  publicMessage: (input) => `\n 📝 Public Message: ${input}`,
  productionHidden: () => console.log(` 🚫 Details hidden for security. Check in dev mode.`),
  errArg3: (pubMsg) => console.log(` ✅ Expected 3rd Argument (pubMsg): 'string' \n ❌ Received 3rd Argument (pubMsg): '${_typeof(pubMsg)}'`, pubMsg),
  errArg2: (type) => console.log(` ✅ Expected 2nd Argument (type): 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' \n ❌ Received 2nd Argument (type):`, typeof type === 'string' ? `'${type}'`: type),
  errArg1: (input, type) => console.log(` ✅ Expected 1st Argument (input): '${type}' \n ❌ Received 1st Argument (input): '${_typeof(input)}'`, input),
  common: {
    typeCheck: (value, type) => console.log(`\n ❌ Expected input type: '${type}', but got: '${_typeof(value)}'`, value),
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
function _typeof(input) {
  // for performance
  if (typeof input === 'string') return 'string'

  // NaN must go before number
  else if (Number.isNaN(input)) return 'NaN'
  else if (typeof input === 'number') return 'number'

  // order by use frequently
  else if (Array.isArray(input)) return 'array'
  else if (typeof input === 'boolean') return 'boolean'

  else if (input === null) return 'null'
  else if (Object.prototype.toString.call(input) === '[object Date]') {
    if (Number.isNaN(input.getTime())) throw new Error(`\n ❌ Received: 'date' (Invalid Date).`)
    else return 'date'
  }
  else if (Object.prototype.toString.call(input) === '[object RegExp]') return 'regexp'

  // 'object' must be the last
  else return typeof input 
}

const _addOns = {
  string: class _chainString {
    // private
    #input
    #type
    #pubMsg

    /**
     * @param {string} input 
     * @param {string} type 
     * @param {string} pubMsg 
     */  
    constructor(input, type, pubMsg) {
      this.#input = input
      this.#type = type
      this.#pubMsg = pubMsg
    }
  
    max(value) {
      if (_typeof(value) !== 'number') {
        _log.common.typeCheck(value, 'number')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if ((this.#input.length <= value) === false) {
        _log.common.max(this.#input.length, value)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    min(value) {
      if (_typeof(value) !== 'number') {
        _log.common.typeCheck(value, 'number')
        throw new Error(_log.publicMessage(this.#pubMsg))
      }

      if ((this.#input.length >= value) === false) {
        _log.common.min(this.#input.length, value)
        throw new Error(_log.publicMessage(this.#pubMsg))
      }
      
      return this
    }

    length(value) {
      if (_typeof(value) !== 'number') {
        _log.common.typeCheck(value, 'number')
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
      if (_typeof(value) !== 'regex') {
        _log.common.typeCheck(value, 'regex')
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
 * @param { 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' } type
 * @param {string} [pubMsg = defaultPubMsg]
 */
function ESTest(input, type, pubMsg = defaultPubMsg) {
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
      else if (!_ALLOWED_TYPES.includes(type)) {
        _log.errArg2(type)
        throw new Error(_log.publicMessage(pubMsg))
      }

      // Not matched 1st argument
      else if (_typeof(input) !== type) {
        _log.errArg1(input, type)
        throw new Error(_log.publicMessage(pubMsg))
      }
      
      // Add-On to chain methods
      else return new _addOns[type](input, type, pubMsg)
    } catch (error) {
      console.error(error)
    }
  }
}

export { _typeof, isDisabledLibrary, ESTest }
