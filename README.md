![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## What is ESCSS-ESTest?

ESCSS-ESTest is a runtime testing library inspired by TDD, Joi, and Zod to achieve 100% coverage.

## Usage
```js
// basic usage
ESTest(1, 'number')
ESTest('foo', 'string')
ESTest({}, 'object')
ESTest([], 'array')
...

// advance usage
ESTest(1, 'number').min(1)
ESTest(1, 'number').min(1).max(10)
ESTest(1, 'string').email()
ESTest(1, 'string').regex(/foo/)
...

// Received feedback (public message will be visible in both dev and prod.)
ESTest(input, 'string', 'secret number: 12345') // custom you want
ESTest(input, 'string', '[libraryName] welcomes you to submit the issue at [target].') // for library author to get feedback
ESTest(input, 'string', 'Please note when the issue occurred and send the details to [target].') // for PM or non-tech users to get feedback
```


## Core Concepts
### Water filter
```js
function demo() {
  {
    ESTest(...) // filter error
  }

  // happy path
}
```

### ESTest()
- console.error(...): for general usage to achieve 100% coverage **without breaking your codebase**
```js
import { ESTest } from 'escss-estest'

function sum(a, b) {
 {
   ESTest(a, 'number')
   ESTest(a, 'number') 
 }

 return a + b
}
```

### unSafeESTest()
- throw new Error(...): for backend API validation. (try... catch)
```js
import { unSafeESTest } from 'escss-estest'

app.post('/validate', async (req, res) => {
 try {
   const data = req.body
   {
     unSafeESTest(data.name, 'string').min(3) // default public message
     unSafeESTest(data.email, 'string').email() 
     unSafeESTest(data.age, 'number', 'Age must be at least 18').min(18) // custom public message
   }

   res.json({ message: 'Validation passed' })
 } catch (error) {
   res.status(400).json({ errors: error }) // public message(error message) from try {}
 }
})
```

### get feedback from others
- set default publicMessage to get feedback from others
```js

// for library author
globalThis.__ESCSS_ESTEST.publicMessage = '[libraryName] welcomes you to submit the issue at [target].'

// for company (PMs or non-tech users)
globalThis.__ESCSS_ESTEST.publicMessage = 'Please note when the issue occurred and send the details to [target].'
```
## Installation

```bash
  npm add escss-estest
```

```bash
  yarn add escss-estest
```

```bash
  pnpm add escss-estest
```

```bash
  bun add escss-estest
```

Nuxt 3
```bash
  npx nuxi module add nuxt-escss-estest
```

## License

[see](https://github.com/ESCSS-labs/ESCSS-ESTest?tab=License-1-ov-file)
