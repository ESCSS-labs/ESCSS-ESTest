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
  },
  number: class _chainNumber {
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

    less(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input < value) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'less', value)
      }

      return this
    }

    max(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input <= value) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'max', value)
      }

      return this
    }

    greater(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input > value) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'less', value)
      }

      return this
    }

    min(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input >= value) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'min', value)
      }

      return this
    }

    integer() {
      if (Number.isInteger(this.#input) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'integer')
      }

      return this
    }

    positive() {
      if ((this.#input > 0) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'positive')
      }

      return this
    }

    negative() {
      if ((this.#input > 0) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'negative')
      }

      return this
    }

    multiple(value) {
      if (_typeof(value) !== 'number') {
        _ESTestError(this.#input, this.#type, this.#msg, 'typeCheck', value, 'number')
      }

      if ((this.#input % value === 0) === false) {
        _ESTestError(this.#input, this.#type, this.#msg, 'multiple', value)
      }

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
  if(typeof input === 'number') {
    // NaN must go before number
    if (Number.isNaN(input)) return 'NaN'
    else return 'number'
  }

  // order by use frequently
  else if (typeof input === 'string') return 'string'
  else if (Array.isArray(input)) return 'array'
  else if (input === null) return 'null'

  // 'date' & 'regex' cost lots of performance, but need go before 'object' to filter it
  else if (Object.prototype.toString.call(input) === '[object Date]') {
    if (Number.isNaN(input.getTime())) {
      throw new Error(` ✅ Expected ESTest() 1st Argument: 'date' \n ❌ Received: 'date'`, input)
    }
    else return 'date'
  }
  else if (Object.prototype.toString.call(input) === '[object RegExp]') return 'regex'

  // 'object' must be the last
  else return typeof input
}

/**
 * throw an non-stop error (console.error)
 * @param {*} input
 * @param {string} type
 * @param {string} [msg = defaultMsg]
 * @param {*} value
 * @param {*} value2
 */
function _ESTestError(input, type, msg, logToken, value, value2) {
  const _log = {
    errArg1: () => console.error(` ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received: '${_typeof(input)}'`, input),
    message: (input) => `📝 Message: ${input}`,
    hiddenMsg: () => console.error(`🚫 Details hidden for security. Check in dev mode.`),
    typeCheck: () => console.error(`❌ Expected input type: '${value2}', but got: '${_typeof(value)}'`, value),
    less: () => console.error(`❌ Must be less than ${value}, but got:`, input),
    max: () => console.error(`❌ Must be less than or equal ${value}, but got:`, input),
    greater: () => console.error(`❌ Must be greater than ${value}, but got:`, input),
    min: () => console.error(`❌ Must be greater than or equal to ${value}, but got:`, input),
    length: () => console.error(`❌ Must be exactly ${value}, but got:`, input),
    invalidInput: () => console.error(`❌ Invalid input, got:`, input),
    integer: () => console.error(`❌ Must be an integer, got:`, input),
    positive: () => console.error(`❌ Must be a positive number, got:`, input),
    negative: () => console.error(`❌ Must be a negative number, got:`, input),
    multiple: () => console.error(`❌ Must be a multiple of ${value}, but got:`, input),
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
 * Throw a Error to stop program
 * @param {*} input
 * @param {string} type
 * @param {string} [msg = defaultMsg]
 */
function _unSafeESTestError(input, type, msg, logToken) {
  const _log = {
    message: (input) => `📝 Message: ${input}`,
    hiddenMsg: () => console.error(` 🚫 Details hidden for security. Check in dev mode.`),
    errArg3: () => console.error(` ✅ Expected ESTest() 3rd Argument: 'string' \n ❌ Received: '${_typeof(msg)}'`, msg),
    errArg2: () => console.error(` ✅ Expected ESTest() 2nd Argument: 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' \n ❌ Received:`, typeof type === 'string' ? `'${type}'` : type),
    errArg1: () => console.error(` ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received: '${_typeof(input)}'`, input),
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

  // Not matched 1st argument, this one should be non-block error to prevent backend change API
  else if (_typeof(input) !== type) {
    _ESTestError(input, type, msg, 'errArg1')
  }

  // To chain methods
  return new _addOns[type](input, type, msg)
}

export { ESTest, _typeof }