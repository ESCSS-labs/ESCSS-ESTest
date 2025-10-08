![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# Why ESCSS-ESTest?

Just for a guy who wants to survive in a **massive**, **legacy** JavaScript/TypeScript codebase.

## Features

- 💪 JavaScript version of TypeScript + Zod: Ditch `any` & complexity.
- 💣 No vender lock-in.
- 🐛 Find bug quickly.
- ❤️‍🔥 DX first, DX first, DX first and security!
- 🪶 ~4 kB (minified + gzipped), 0 dependencies.
- ✅ Autocompletion support.
- ⚡ (Optional) The definitive choice for high-performance.

## benchmark

<img width="800" alt="benchmark" src="https://github.com/user-attachments/assets/0f367922-a8fb-4436-ac65-3f6f34819772" />

**source**: [ESTest-benchmark-repo](https://github.com/ESCSS-labs/ESTest-benchmark-repo)

## Installation

```bash
  npm add escss-estest
```

## Table of Contents

- [Core Concept](#core-concept)
- [Core API](#core-api)
  - [ESTest](#estestinput-any-type-string-message-string)
    - [Validate Type (TypeScript Part)](#validate-type-typescript-part)
    - [Validate Schema (Zod Part)](#validate-schema-zod-part)
  - [unSafeESTest](#unsafeestestinput-any-type-string-message-string)
    - Usage is exactly the same as ESTest
  - [ESTestForLibrary](#estestforlibraryinput-any-type-string-message-string)
    - Usage is exactly the same as ESTest
- [Helper API](#helper-api)
  - [globalThis.\_\_ESCSS_ESTEST\_\_.message](#globalthis__escss_estest__message)
  - [globalThis.\_\_ESCSS_ESTEST\_\_.isESTestDisabled](#globalthis__escss_estest__isestestdisabled)
  - [globalThis.\_\_ESCSS_ESTEST\_\_.analysis](#globalthis__escss_estest__analysis)
- [Thanks](#thanks)

## Core Concept

- `ESTest`: console.error --> decoupling / isESTestDisabled = true for high-performance
- `unSafeESTest`: throw new Error
- `ESTestForLibrary`: The default message is separated from `ESTest` & `unSafeESTest`

## Core API

### `ESTest(input: unknown, type: string, message: string)`

#### Validate Type (TypeScript Part)

```js
import { ESTest } from "escss-estest";

function sum(a, b) {
  {
    // validate type
    ESTest(a, "number");
    ESTest(b, "number");
  }

  // do something
}
```

#### Validate Schema (Zod Part)

```js
import { ESTest } from "escss-estest";

async function getApi() {
  const apiData = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await apiData.json();

  // const data = {
  //   id: 1,
  //   name: "Leanne Graham",
  //   username: "Bret",
  //   email: "Sincere@april.biz",
  //   address: {
  //     street: "Kulas Light",
  //     suite: "Apt. 556",
  //     city: "Gwenborough",
  //     zipcode: "92998-3874",
  //     geo: {
  //       lat: "-37.3159",
  //       lng: "81.1496"
  //     }
  //   },
  //   phone: "1-770-736-8031 x56442",
  //   website: "hildegard.org",
  //   company: {
  //     name: "Romaguera-Crona",
  //     catchPhrase: "Multi-layered client-server neural-net",
  //     bs: "harness real-time e-markets"
  //   }
  // }

  {
    // API validate from the backend failed -> console.error('your text')
    // pass
    ESTest(data, "object", "schema do not match").schema({
      id: "number",
      name: "string",
      username: "string",
      email: "string",
      address: {
        street: "string",
        suite: "string",
        city: "string",
        zipcode: "string",
        geo: {
          lat: "string",
          lng: "string",
        },
      },
      phone: "string",
      website: "string",
      company: {
        name: "string",
        catchPhrase: "string",
        bs: "string",
      },
    });
  }

  // do something
}

getApi();
```

### `unSafeESTest(input: unknown, type: string, message: string)`

**Usage is exactly the same as ESTest**

```js
import { unSafeESTest } from "escss-estest";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/login", (req, res) => {
  try {
    const data = req.body;

    // const data = {
    //   username: 'abcd',
    //   password: '1234',
    //   confirmPassword: '1234'
    // }

    {
      // Schema or password validation failed -> throw new Error('your text')
      // pass
      unSafeESTest(data, "object", "schema do not match")
        .schema({
          username: "string",
          password: "string",
          confirmPassword: "string",
        })
        .refine(
          (val) => val.password === val.confirmPassword,
          "passwords do not match",
        );
    }

    // do something
    res.json({ message: "ok" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

### `ESTestForLibrary(input: unknown, type: string, message: string)`

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

### `globalThis.__ESCSS_ESTEST__.message`

- Set default message for your project.

```js
globalThis.__ESCSS_ESTEST__.message = "Please report this issue to ...";
```

### `globalThis.__ESCSS_ESTEST__.isESTestDisabled`

- `true`: Disable to get high-performance. (for production)
- `false`: Show Bug detail.

Note: `unSafeESTest` will not be affected (for security reasons)

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

## Thanks

- [Zod](https://zod.dev/)
- [ArkType](https://arktype.io/)
- [Joi](https://joi.dev/)
- [ilyaliao](https://github.com/ilyaliao)
