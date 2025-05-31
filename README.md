![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## What is ESCSS-ESTest?

A passive, non-intrusive JavaScript runtime validator designed to achieve 100% function coverage.

## Features

- 🪄 Supports TypeScript autocompletion.
- 👌 Effortless integration with your codebase.
- 📦 2.7 kB (minified + gzipped), zero dependencies.
- 🎨 Designed with developer experience as a priority.
- ⚙️ Unlock its full potential through E2E and unit testing.
- 🚀 (Optional) runtime testing with minimal performance overhead.

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
function sum(a, b) {
  // unhappy path: {...}
  // This block acts as an unhappy path filter, validating input with "console.error"
  // without breaking the main codebase. It can be collapsed in IDEs to hide its complexity.
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  // Happy path: inputs are valid, perform the intuitive sum.
  return a + b;
}
```

## Core API

### `ESTest(input, type, message)`

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

  // Hint: you might get 'undefined' data, use the optional chaining operator (?.) to prevent undefined from breaking your app.
  {
    ESTest(data.name, "string").regex(/(demo|Alice)/);
    ESTest(data.age, "number").positive();
    ESTest(data.info[0]?.id, "string?");
    ESTest(data.info[0]?.city, "string?");
    ESTest(data.info[0]?.statusCode, "number?");
  }

  return data;
}
```

### `unSafeESTest(input, type, message)`

#### unSafeESTest throws a new Error, make sure to wrap it in try...catch

```js
import { unSafeESTest } from "escss-estest";
import express from "express";

const app = express();
const port = 3000;

app.post("/validate", (req, res) => {
  try {
    const data = req.body;

    /**
     * data = {
     *    name: 'foo',
     *    email: 'abc12345@gmail.com'
     * }
     */

    {
      unSafeESTest(data.name, "string").regex(/(foo)/);
      unSafeESTest(data.email, "string", "your email is invalid!").email();
    }

    res.json({ message: "Validation passed" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
```

## Support API

### `globalThis.__ESCSS_ESTEST__.message`

- Get feedbacks from others

```js
globalThis.__ESCSS_ESTEST__.message =
  "Please send this issue to [url].";
```

### `globalThis.__ESCSS_ESTEST__.isESTestDisabled`

#### Why have this feature?

- Designed to avoid vendor lock-in.
- Optimized for production performance.

*note: unSafeESTest will not be affected (security reasons).*

```js
globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;

function sum(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  return a + b;
}

// same as below (but performance improved)
function sum(a, b) {
  return a + b;
}
```
