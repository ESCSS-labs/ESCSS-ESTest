/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const defaultMsg = 'Customize your message, and it will be visible in both dev and prod modes.'
const _ALLOWED_TYPES = ['undefined', 'null', 'array', 'date', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function', 'regex']
const _addOns = {
  string: class _chainString {
    // private
    #input
    #type
    #msg

    /**
     * @param {string} input 
     * @param {string} type 
     * @param {string} msg 
     */
    constructor(input, type, msg) {
      this.#input = input
      this.#type = type
      this.#msg = msg
    }

    max(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input.length <= value) === false) {
        _ESTestError(this.#input.length, this.#type, this.#msg, 'max', value)
      }

      return this
    }

    min(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input.length >= value) === false) {
        _ESTestError(this.#input.length, this.#type, this.#msg, 'min', value)
      }

      return this
    }

    length(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input.length === value) === false) {
        _ESTestError(this.#input.length, this.#type, this.#msg, 'length', value)
      }

      return this
    }

    email() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

      if (emailRegex.test(this.#input) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'invalidInput')
      }

      return this
    }

    uuid() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      // Changed: removed \b (not necessary)
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

      if (uuidRegex.test(this.#input) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'invalidInput')
      }

      return this
    }

    regex(value) {
      if (_typeof(value) !== 'regex') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'regex')
      }

      if (value.test(this.#input) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'invalidInput')
      }

      return this
    }

    base64() {
      // https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
      const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

      if (base64Regex.test(this.#input) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'invalidInput')
      }

      return this
    }

    ip() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

      if ((ipv4Regex.test(this.#input) === false) && (ipv6Regex.test(this.#input) === false)) {
        _ESTestError(this.#input, this.#type, this.#msg, 'invalidInput')
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
  else if (Object.prototype.toString.call(input) === '[object RegExp]') return 'regex'

  // 'object' must be the last
  else return typeof input
}

/**
 * handle error message to user with dynamic value
 * @param {*} input
 * @param {string} type
 * @param {string} [msg = defaultMsg]
 * @param {*} value
 * @param {*} value2
 */
function _ESTestError(input, type, msg, logToken, value, value2) {
  const _log = {
    message: (input) => `📝 Message: ${input}`,
    hiddenMsg: () => console.log(`🚫 Details hidden for security. Check in dev mode.`),
    typeCheck: () => console.log(`❌ Expected input type: '${value2}', but got: '${_typeof(value)}'`, value),
    max: () => console.log(`❌ Must be ${value} or more, but got:`, input),
    min: () => console.log(`❌ Must be ${value} or fewer, but got:`, input),
    length: () => console.log(`❌ Must be exactly ${value}, but got:`, input),
    invalidInput: () => console.log(`❌ Invalid input, got:`, input),
  }

  try {
    if (process.env.NODE_ENV === 'production') {
      _log.hiddenMsg()
      throw new Error(_log.message(msg))
    }

    else {
      _log[logToken]()
      throw new Error(_log.message(msg))
    }
  } catch(error) {
    console.error(error)
  }
}

/**
 * handle error message to user with dynamic value
 * @param {*} input
 * @param {string} type
 * @param {string} [msg = defaultMsg]
 */
function _unSafeESTestError(input, type, msg, logToken) {
  const _log = {
    message: (input) => `📝 Message: ${input}`,
    hiddenMsg: () => console.log(` 🚫 Details hidden for security. Check in dev mode.`),
    errArg3: () => console.log(` ✅ Expected ESTest() 3rd Argument: 'string' \n ❌ Received: '${_typeof(msg)}'`, msg),
    errArg2: () => console.log(` ✅ Expected ESTest() 2nd Argument: 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' \n ❌ Received:`, typeof type === 'string' ? `'${type}'` : type),
    errArg1: () => console.log(` ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received: '${_typeof(input)}'`, input),
  }

  if (process.env.NODE_ENV === 'production') {
    if (typeof msg !== 'string') {
      _log.hiddenMsg()
      throw new Error(_log.message(defaultMsg))
    }

    else {
      _log.hiddenMsg()
      throw new Error(_log.message(msg))
    }
  }

  else {
    if (typeof msg !== 'string') {
      _log[logToken]()
      throw new Error(_log.message(defaultMsg))
    }

    else {
      _log[logToken]()
      throw new Error(_log.message(msg))
    }
  }
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * @param {*} input
 * @param { 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' } type
 * @param {string} [msg = defaultMsg]
 */
function ESTest(input, type, msg = defaultMsg) {
  // NOTE: throw a block error in 1st layer to stop program, otherwise js will find method in undefined

  // Not matched 3rd argument 
  if (typeof msg !== 'string') {
    _unSafeESTestError(input, type, msg, 'errArg3')
  }

  // Not matched 2nd argument
  else if (!_ALLOWED_TYPES.includes(type)) {
    _unSafeESTestError(input, type, msg, 'errArg2')
  }

  // Not matched 1st argument
  else if (_typeof(input) !== type) {
    _unSafeESTestError(input, type, msg, 'errArg1')
  }

  // To chain methods
  return new _addOns[type](input, type, msg)
}

export { ESTest, _typeof }