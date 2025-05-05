![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## What is ESCSS-ESTest?

ESCSS-ESTest is a runtime validation library inspired by TDD and Zod.

## Features

- 🪄 TypeScript autocompletion.
- 🎨 Designed with DX first in mind.
- ⚙️ Manual Testing and E2E Integration.
- 👌 Effortless integration with your codebase.
- 📦 2 kB (minified + gzipped), 0 dependency.
- 🚀 Optional runtime testing without performance overhead.

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
  {
    ESTest(...) // filter error
  }

  // happy path
}
```

## Usage

### ESTest()

- General usage -> console.error

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

- For Frontend Validation -> console.error

```js
import { ESTest } from "escss-estest";

async function getApi(a, b) {
  const originData = await fetch("https://www.just-an-example.com/1");
  const data = await originData.json();

  /**
   * data = {
   *    name: 'foo',
   *    age: 100,
   *    info: [
   *      {
   *        id: '254d83e3-81ee-4d20-b7fe-ebfd6651bca0',
   *        city: 'bar1',
   *        statusCode: 111
   *      },
   *      {
   *        id: 'da19b77a-f1b1-4f25-bfc3-de14bfafdf53',
   *        city: 'bar2',
   *        statusCode: 222
   *      }
   *    ]
   * }
   */

  // Use ?. to prevent undefined from breaking the app
  {
    ESTest(data?.name, "string");
    ESTest(data?.age, "number").min(0);
    ESTest(data?.info[0]?.id, "string").uuid();
    ESTest(data?.info[0]?.city, "string");
    ESTest(data?.info[0]?.statusCode, "number").positive();
  }

  return data;
}
```

### unSafeESTest()

- For Backend Validation -> throw new Error()

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
      unSafeESTest(data.email, "string", "your email is invalid").email();
    }

    res.json({ message: "Validation passed" });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
});
```

### Global API Config

#### globalThis.**ESCSS_ESTEST**.publicMessage

- Get feedback from others

```js
globalThis.__ESCSS_ESTEST__.publicMessage =
  "Please note when the issue occurred and send the details to [link].";
```

#### globalThis.**ESCSS_ESTEST**.isESTestDisabled

- ESTest (default: false)
- unSafeESTest **CAN NOT** be disabled (security reason)

```js
// Why have this feature?
// 1. To avoid my library locking down your app.
// 2. If you care about performance but still want runtime tests:
//  - Use ESTest in staging.
//  - globalThis.__ESCSS_ESTEST__.isESTestDisabled = true in production to disable it.

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
