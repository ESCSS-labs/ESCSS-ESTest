![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# Why ESCSS-ESTest?

Just a guy who wants to survive in a **massive**, **legacy** JavaScript/TypeScript codebase.

## Features

- 💪 JS version of TS + Zod: Ditch any & complexity.
- 💣 No vender lock-in.
- 🐛 Find bug quickly.
- ❤️‍🔥 DX first, DX first, DX first and security!
- 🪶 3.65 kB (minified + gzipped), 0 dependencies.
- ✅ Autocompletion support.
- ⚡ (Optional) The definitive choice for high-performance.

## benchmark

<img width="800" alt="benchmark" src="https://github.com/user-attachments/assets/0f367922-a8fb-4436-ac65-3f6f34819772" />

**source**: [ESTest-benchmark-repo](https://github.com/ESCSS-labs/ESTest-benchmark-repo)

## Installation

```bash
  npm add escss-estest
```

## Core Concept

- `ESTest`: console.error --> decoupling / disabled for performance
- `unSafeESTest`: throw new Error
- `ESTestForLibrary`: The default message is separated from `ESTest` & `unSafeESTest`

```

## Core API

### `ESTest(input: any, type: string, message: string)`

**validate type (TS part)**

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

**Validate Schema (Zod part)**

```js
import { ESTest } from "escss-estest";

async function getApi() {
  const apiData = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await apiData.json();

  // const data = {
  //   id: 1,
  //   name: 'Mike',
  //   info: {
  //     title: "Developer",
  //     completed: false
  //   },
  //   more: [{
  //     msg: 'Hi!',
  //     hidden: false 
  //   }]
  // }

  {
    ESTest(data, 'object', 'schema mismatch').schema({
      id: 'number',
      name: 'string',
      info: {
        title: 'string',
        'completed?': 'boolean'
      },
      more: [{
        msg: 'string'
        'hidden?': 'boolean'
      }]
    })

    ESTest(data.id, 'number', 'custom msg').min(0).max(50)
  }

  return data;
}

getApi();
```

### `unSafeESTest(input: any, type: string, message: string)`

**Usage is exactly the same as ESTest**

```js
import { unSafeESTest } from "escss-estest";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/demo", (req, res) => {
  try {
    const data = req.body;

    // const data = {
    //   id: 1,
    //   name: 'Mike',
    //   info: {
    //     title: "Developer",
    //     completed: false
    //   },
    //   more: [{
    //     msg: 'Hi!',
    //     hidden: false 
    //   }]
    // }

    {
      unSafeESTest(data, 'object', 'schema mismatch').schema({
        id: 'number',
        name: 'string',
        info: {
          title: 'string',
          'completed?': 'boolean'
        },
        more: [{
          msg: 'string'
          'hidden?': 'boolean'
        }]
      })

      unSafeESTest(data.id, 'number', 'custom msg').min(0).max(50)
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

### `ESTestForLibrary(input: any, type: string, message: string)`

**Library's own default message**

```js
import { ESTestForLibrary } from "escss-estest";

function ESTest(
  input,
  type,
  message = "[LibraryName] default message for others to help debugging",
) {
  return ESTestForLibrary(input, type, message);
}
```

## Helper API

### `globalThis.__ESCSS_ESTEST__.information`

- Show information

<img width="648" alt="information" src="https://github.com/user-attachments/assets/c19d91cc-6346-4f6d-bceb-2a9024538a30" />

### `globalThis.__ESCSS_ESTEST__.message`

- Set default message for your project.

```js
globalThis.__ESCSS_ESTEST__.message = "Please report this issue to ...";
```

### `globalThis.__ESCSS_ESTEST__.isESTestDisabled`

  - true: Disable to get high-performance. (for production)
  - false: Show Bug detail.

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

// same as 
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
