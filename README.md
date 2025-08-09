![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# What is ESCSS-ESTest?

A passive, non-intrusive JavaScript runtime validator designed to achieve 100% function coverage.

## Features

- ⚙️ JavaScript version of TypeScript + runtime-testing.
- ✅ TypeScript autocompletion.
- ❤️‍🔥 Built with security & DX at heart.
- 🎯 Non-intrusive & concise API to achieve 100% function coverage.
- 🔥 Runtime dependency error detection to eliminate dependency hell.
- 🪶 2.7 kB (minified + gzipped), zero dependencies.
- ⚡ (Optional) runtime testing with minimal performance impact.

## benchmark

<img width="800" alt="benchmark" src="https://github.com/user-attachments/assets/0f367922-a8fb-4436-ac65-3f6f34819772" />

**source**: [ESTest-benchmark-repo](https://github.com/ESCSS-labs/ESTest-benchmark-repo)

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

### `ESTest(input, type = "null", message = globalThis.__ESCSS_ESTEST__.message)`

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

async function getApi() {
  const apiData = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await apiData.json();

  // const data = {
  //   userId: 1, 
  //   id: 1, 
  //   title: "delectus aut autem", 
  //   completed: false
  // }

  {
    ESTest(data.userId, "number");
    ESTest(data.id, "number");
    ESTest(data.title, "string");
    ESTest(data.completed, "boolean");
  }

  return data;
}

getApi()
```

### `unSafeESTest(input, type = "null", message = globalThis.__ESCSS_ESTEST__.message)`

- Breaking error throwing via `throw new Error(...)`

```js
import { ESTest, unSafeESTest } from "escss-estest";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/demo", (req, res) => {
  try {
    const data = req.body;

    /**
     * data = {
     *    name: "Mike Lee",
     *    msg: "Hello!"
     * }
     */

    {
      unSafeESTest(data.name, "string", "wrong name").regex(/^Mike Lee$/);
      unSafeESTest(data.email, "string");
    }

    res.json({ message: "ok" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

### `createESTest(input, type, message)`

- Get clear, actionable `bug reports` (for library authors/maintainers).

```js
import { createESTest } from "escss-estest";

// Encapsulate createESTest to provide your library's own default message
function ESTest(
  input,
  type,
  message = "[libraryName] your message for others to help debugging",
) {
  return createESTest(input, type, message);
}
```

## Auxiliary API

### `globalThis.__ESCSS_ESTEST__.information`

- Show library information

<img width="648" alt="information" src="https://github.com/user-attachments/assets/c19d91cc-6346-4f6d-bceb-2a9024538a30" />

### `globalThis.__ESCSS_ESTEST__.message`

- Captures `internal bug reports` (for company teams)

```js
// Set in the entry point, e.g., main.js, App.vue, or App.jsx...
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

<img width="800" alt="analysis" src="https://github.com/user-attachments/assets/85166a84-14e8-4e37-98b4-06ad9f62331b" />

### Thanks
This project is heavily inspired by the following:
- [Zod](https://zod.dev/)
- [Joi](https://joi.dev/)
- [ilyaliao](https://github.com/ilyaliao)