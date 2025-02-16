/*!
 * escss-estest v1.4.26
 * (c) 2024 Mike Lee
 * @license AGPL-3.0-only OR Commercial
 */

const defaultPubMsg = 'Customize your public message, visible in development / production.'
const _ALLOWED_TYPES = ['undefined', 'null', 'array', 'date', 'object', 'boolean', 'NaN', 'number', 'bigint', 'string', 'symbol', 'function', 'regex']

const _chain = {
  string: class _chainString {
    #input
    #type
    #pubMsg
    #isUnsafe

    /**
     * @param {string} input 
     * @param {string} type 
     * @param {string} pubMsg 
     * @param {boolean} isUnsafe
     */
    constructor(input, type, pubMsg, isUnsafe) {
      this.#input = input
      this.#type = type
      this.#pubMsg = pubMsg
      this.#isUnsafe = isUnsafe
    }

    max(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length <= value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'max', value)
      }

      return this
    }

    min(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length >= value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'min', value)
      }

      return this
    }

    length(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length === value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'length', value)
      }

      return this
    }

    email() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

      if (emailRegex.test(this.#input) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'invalidInput')
      }

      return this
    }

    uuid() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      // Changed: removed \b (not necessary)
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i;

      if (uuidRegex.test(this.#input) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'invalidInput')
      }

      return this
    }

    regex(value) {
      if (_typeof(value) !== 'regex') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'regex')
      }

      if (value.test(this.#input) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'invalidInput')
      }

      return this
    }

    base64() {
      // https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
      const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

      if (base64Regex.test(this.#input) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'invalidInput')
      }

      return this
    }

    ip() {
      // from zod v3.24.1 https://github.com/colinhacks/zod/blob/main/src/types.ts
      const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
      const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/

      if ((ipv4Regex.test(this.#input) === false) && (ipv6Regex.test(this.#input) === false)) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'invalidInput')
      }

      return this
    }
  },
  number: class _chainNumber {
    #input
    #type
    #pubMsg
    #isUnsafe

    /**
     * @param {string} input 
     * @param {string} type 
     * @param {string} pubMsg 
     * @param {boolean} isUnsafe
     */
    constructor(input, type, pubMsg, isUnsafe) {
      this.#input = input
      this.#type = type
      this.#pubMsg = pubMsg
      this.#isUnsafe = isUnsafe
    }

    // <
    less(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input < value) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'less', value)
      }

      return this
    }

    // <=
    max(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input <= value) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'max', value)
      }

      return this
    }

    // >
    greater(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input > value) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'less', value)
      }

      return this
    }

    // >=
    min(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input >= value) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'min', value)
      }

      return this
    }

    integer() {
      if (Number.isInteger(this.#input) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'integer')
      }

      return this
    }

    positive() {
      if ((this.#input > 0) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'positive')
      }

      return this
    }

    negative() {
      if ((this.#input < 0) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'negative')
      }

      return this
    }

    multiple(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input % value === 0) === false) {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'multiple', value)
      }

      return this
    }
  },
  array: class _chainArray {
    #input
    #type
    #pubMsg
    #isUnsafe

    /**
     * @param {string} input 
     * @param {string} type 
     * @param {string} pubMsg 
     * @param {boolean} isUnsafe
     */
    constructor(input, type, pubMsg, isUnsafe) {
      this.#input = input
      this.#type = type
      this.#pubMsg = pubMsg
      this.#isUnsafe = isUnsafe
    }

    min(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length >= value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'min', value)
      }

      return this
    }

    max(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length <= value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'max', value)
      }

      return this
    }

    length(value) {
      if (_typeof(value) !== 'number') {
        _error(this.#input, this.#type, this.#pubMsg, this.#isUnsafe, 'typeCheck', value, 'number')
      }

      if ((this.#input.length === value) === false) {
        _error(this.#input.length, this.#type, this.#pubMsg, this.#isUnsafe, 'length', value)
      }

      return this
    }
  },
  boolean: class _chainBoolean {
  },
  undefined: class _chainUndefined {
  },
  null: class _chainNull {
  },
  date: class _chainDate {
  },
  object: class _chainObject {
  },
  NaN: class _chainNaN {
  },
  bigint: class _chainBigint {
  },
  symbol: class _chainSymbol {
  },
  function: class _chainFunction {
  },
  regex: class _chainRegex {
  },
}

/**
 * @param {*} input
 * @returns {string}
 */
function _typeof(input) {
  /* 
  // based on typeof (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
  
  Undefined        	 'undefined'
  Null 	             'object'      ->    change to 'null'
  Boolean   	       'boolean'
  Number 	           'number'
  BigInt             'bigint'
  String 	           'string'
  Symbol 	           'symbol'
  Function           'function'
  Any other object 	 'object'      ->    change to 'null' | 'array' | 'date' | 'regex' | 'object'
  
  ---------------------------------------------------------------------
  NaN                'NaN'         ->    add new one
  */

  let newType;

  switch (typeof input) {
    case 'number':
      if (Number.isNaN(input)) newType = 'NaN'

      // check valid number
      else if ((Number.MIN_SAFE_INTEGER <= input && input <= Number.MAX_SAFE_INTEGER) === false) throw new Error(` \n ✅ Expected: -9007199254740991 <= 'number' <= 9007199254740991 (or try 'bigint') \n ❌ Received: ${input}`)

      else newType = 'number'
      break

    case 'object':
      if (input === null) newType = 'null'

      else if (Array.isArray(input)) newType = 'array'

      else if (Object.prototype.toString.call(input) === '[object Date]') {
        // check valid date
        if (Number.isNaN(input.getTime())) throw new Error(` \n ✅ Expected: 'date' \n ❌ Received: '${input}'`)

        else newType = 'date'
      }

      else if (Object.prototype.toString.call(input) === '[object RegExp]') newType = 'regex'

      else newType = 'object'
      break

    default:
      // 'undefined' | 'boolean' | 'bigint' | 'string' | 'symbol' | 'function'
      newType = typeof input
      break
  }

  return newType
}

/**
 * Handle blocking / non-blocking errors
 * @param {*} input
 * @param {string} type
 * @param {string} [pubMsg = defaultPubMsg] 
 * @param {boolean} isUnsafe true: blocking error; false: non-blocking error
 * @param {*} value variable for chain methods
 * @param {*} value2 variable for chain methods
 */
function _error(input, type, pubMsg, isUnsafe, logToken, value, value2) {
  const _log = {
    errArg1: () => console.error(` ✅ Expected ESTest() 1st Argument: '${type}' \n ❌ Received: '${_typeof(input)}'`, input),
    errArg2: () => console.error(` ✅ Expected ESTest() 2nd Argument: 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' \n ❌ Received:`, typeof type === 'string' ? `'${type}'` : type),
    errArg3: () => console.error(` ✅ Expected ESTest() 3rd Argument: 'string' \n ❌ Received: '${_typeof(pubMsg)}'`, pubMsg),
    pubMsg: (input) => `📝 Public Message: ${input}`,
    hiddenMsg: () => console.error(`🚫 Details hidden for security. Check in dev mode.`),
    typeCheck: () => console.error(`❌ Expected input type: '${value2}', but got: '${_typeof(value)}'`, value),
    less: () => console.error(`❌ Must be < ${value}, but got:`, input),
    greater: () => console.error(`❌ Must be > ${value}, but got:`, input),
    max: () => console.error(`❌ Must be <= ${value}, but got:`, input),
    min: () => console.error(`❌ Must be >= ${value}, but got:`, input),
    length: () => console.error(`❌ Must be === ${value}, but got:`, input),
    invalidInput: () => console.error(`❌ Invalid input, got:`, input),
    integer: () => console.error(`❌ Must be an integer, got:`, input),
    positive: () => console.error(`❌ Must be a positive number, got:`, input),
    negative: () => console.error(`❌ Must be a negative number, got:`, input),
    multiple: () => console.error(`❌ Must be a multiple of ${value}, but got:`, input),
  }

  if (isUnsafe) {
    if (process.env.NODE_ENV === 'production') {
      if (typeof pubMsg !== 'string') {
        _log.hiddenMsg()
        throw new Error(_log.pubMsg(defaultPubMsg))
      }

      else {
        _log.hiddenMsg()
        throw new Error(_log.pubMsg(pubMsg))
      }
    }

    else {
      if (typeof pubMsg !== 'string') {
        _log[logToken]()
        throw new Error(_log.pubMsg(defaultPubMsg))
      }

      else {
        _log[logToken]()
        throw new Error(_log.pubMsg(pubMsg))
      }
    }
  }

  // catch error for console.error
  else {
    try {
      if (process.env.NODE_ENV === 'production') {
        _log.hiddenMsg()
        throw new Error(_log.pubMsg(pubMsg))
      }

      else {
        _log[logToken]()
        throw new Error(_log.pubMsg(pubMsg))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * @param {*} input
 * @param { 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' } type
 * @param {string} [pubMsg = defaultPubMsg]
 */
function ESTest(input, type, pubMsg = defaultPubMsg) {
  if (typeof pubMsg !== 'string') {
    _error(input, type, pubMsg, true, 'errArg3')
  }

  else if (!_ALLOWED_TYPES.includes(type)) {
    _error(input, type, pubMsg, true, 'errArg2')
  }

  // non-blocking error
  else if (_typeof(input) !== type) {
    _error(input, type, pubMsg, false, 'errArg1')
  }

  // To chain methods (non-blocking error)
  return new _chain[type](input, type, pubMsg, false)
}

/**
 * A JavaScript runtime testing library inspired by TDD, Joi, and Zod.
 * @param {*} input
 * @param { 'undefined' | 'null' | 'array' | 'date' | 'object' | 'boolean' | 'NaN' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'regex' } type
 * @param {string} [pubMsg = defaultPubMsg]
 */
function unSafeESTest(input, type, pubMsg = defaultPubMsg) {
  if (typeof pubMsg !== 'string') {
    _error(input, type, pubMsg, true, 'errArg3')
  }

  else if (!_ALLOWED_TYPES.includes(type)) {
    _error(input, type, pubMsg, true, 'errArg2')
  }

  // blocking error
  else if (_typeof(input) !== type) {
    _error(input, type, pubMsg, true, 'errArg1')
  }

  // To chain methods (blocking error)
  return new _chain[type](input, type, pubMsg, true)
}

export { ESTest, unSafeESTest }