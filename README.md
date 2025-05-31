![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# What is ESCSS-ESTest?

A passive, non-intrusive JavaScript runtime validator designed to achieve 100% function coverage.

## Features

- ✅ `TypeScript autocompletion`.
- 🧪 Supports `E2E` & `unit testing`.
- ⚙️ Works in `Node.js` & `modern browsers`.
- ❤️‍🔥 Built with `security` & `developer experience` at heart.
- 🎯 `Non-intrusive` & `concise API` to achieve `100% function coverage`.
- 🔥 `Runtime dependency error detection` to eliminate `dependency hell`.
- 🪶 `2.7 kB` (minified + gzipped), `zero dependencies`, and `no vendor lock-in`.
- ⚡ (Optional) `runtime testing` with `minimal performance impact`.

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

## Core Concept

**`Water filter`**

- Inspired by TDD, it's a filter for your code, making sure only clean results come through.

```js
function sum(a, b) {
  // unhappy path: {...}
  // Unhappy path filter. console.error (non-breaking). Collapsible. Removable.
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  // Happy path: inputs are valid
  return a + b;
}
```

## Core API

### `ESTest(input, type, message)`

- Non-breaking error logging via `console.error(...)`

**case 1**

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

**case 2**

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

  // Hint: Prevent undefined errors with optional chaining (?.)
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

- Breaking error throwing via `throw new Error(...)`

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
      unSafeESTest(data.email, "string", "custom error messages").email();
    }

    res.json({ message: "Validation passed" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

### `baseESTest(input, type, message)`

- Get clear, actionable `bug reports` (for library authors/maintainers).

```js


```

## Auxiliary API

### `globalThis.__ESCSS_ESTEST__.information`

- Show library information

### `globalThis.__ESCSS_ESTEST__.message`

- Captures `internal bug reports` (for company teams).

```js
globalThis.__ESCSS_ESTEST__.message = "Please report this issue to ...";
```

### `globalThis.__ESCSS_ESTEST__.isESTestDisabled`

- Why have this feature?

  - Avoids vendor lock-in for long-term project flexibility.
  - Optimizes production performance by enabling in dev and disabling in prod.

  _Note: `unSafeESTest` will not be affected (for security reasons)_

```js
globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;

function sum(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
  }

  return a + b;
}

// same as below
function sum(a, b) {
  return a + b;
}
```

### `globalThis.__ESCSS_ESTEST__.analysis`

- Show usage reports