![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## What is ESCSS-ESTest?

A passive, non-intrusive JavaScript runtime validator designed to achieve 100% function coverage.

## Features

- 🪄 Supports TypeScript autocompletion.
- 👌 Effortless integration with your codebase.
- 📦 2 kB (minified + gzipped), zero dependencies.
- 🎨 Designed with developer experience (DX) as a priority.
- ⚙️ Unlock its full potential through E2E and unit testing.
- 🚀 Optional runtime testing with minimal performance overhead.

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

## Core Concepts

### Water filter

```js
function demo() {
  // {...} is a filter
  {
    ESTest(...)
    ESTest(...)
  }

  // happy path
}
```

## Core API

### `ESTest(input, type, publicMessage)`

#### _ESTest is just a console.error(...), so it won't break your app._

##### case 1

```js
import { ESTest } from "escss-estest";

function sum(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  return a + b;
}
```

##### case 2

```js
import { ESTest } from "escss-estest";

async function getApi(a, b) {
  const apiData = await fetch("https://www.just-an-example.com/1");
  const data = await apiData.json();

  /**
   * data = {
   *    name: 'demo',
   *    age: 999,
   *    info: [
   *      {
   *        id: '1',
   *        city: 'foo',
   *        statusCode: 111
   *      },
   *      {
   *        id: '2',
   *        city: 'bar',
   *        statusCode: 222
   *      }
   *    ]
   * }
   */

  // You might get 'undefined' data. Use the optional chaining operator (?.) to prevent undefined from breaking your app.
  {
    ESTest(data.name, "string");
    ESTest(data.age, "number").min(0);
    ESTest(data.info[0]?.id, "string");
    ESTest(data.info[0]?.city, "string").regex(/(foo|bar)/);
    ESTest(data.info[0]?.statusCode, "number?");
  }

  return data;
}
```

### `unSafeESTest(input, type, errorMessage)`

#### unSafeESTest throws a new Error, make sure to wrap it in try...catch

```js
import { unSafeESTest } from "escss-estest";

app.post("/validate", async (req, res) => {
  try {
    const data = req.body;

    /**
     * data = {
     *    name: 'foo',
     *    email: 'abc12345@gmail.com'
     * }
     */

    {
      unSafeESTest(data.name, "string").min(3);
      unSafeESTest(data.email, "string", "invalid email").email();
    }

    res.json({ message: "Validation passed" });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
});
```

## Support API

### `globalThis.__ESCSS_ESTEST__.publicMessage`

- Get feedback from others

```js
globalThis.__ESCSS_ESTEST__.publicMessage =
  "Please note when the issue occurred and send the details to [link].";
```

### `globalThis.__ESCSS_ESTEST__.isESTestDisabled`

#### Why have this feature?

- Designed to avoid vendor lock-in.
- Optimized for production performance (if you want).

_note: unSafeESTest **WON'T** be disabled (security reason)_

```js
globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;

function sum(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  return a + b;
}

// same as

function sum(a, b) {
  return a + b;
}
```
