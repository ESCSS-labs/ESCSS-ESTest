![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

# Language

- [中文](./README-zh.md)

## Quick Links

- [What is ESCSS-ESTest?](#what-is-escss-estest)
- [Core Concept - Water Filter](#core-concept---water-filter)
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)

## What is ESCSS-ESTest?

ESCSS-ESTest is a runtime testing library inspired by TDD and TypeScript to achieve 100% coverage.

## Core Concept - Water Filter

```js
function foo() {
  {
    // unhappy path(throw error)
  }

  // happy path
}
```

## Usage

### Examples

```js
ESTest(NaN, "NaN"); // new
ESTest([], "array"); // new
ESTest(null, "null"); // new
ESTest(undefined, "undefined"); // new
ESTest(1, "number");
ESTest("foo", "string");
ESTest(true, "boolean");
ESTest({}, "object");
ESTest(1n, "bigint");
ESTest(Symbol(), "symbol");
ESTest(function () {}, "function");
ESTest(1, "object"); // error
ESTest(1, "object", "foo"); // error message
```

### General

```js
import { ESTest } from "escss-estest";

let isEnable = true;

// Testing input in {...}
function sum(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
    ESTest(isEnable, "boolean");
  }

  if (!isEnable) return;

  return a + b;
}
```

### async/await

```js
import { ESTest } from "escss-estest";

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();

  {
    ESTest(data, 'object')
    ESTest(data.userId, "number");
    ESTest(data.id, "number");
    ESTest(data.title, "string");
    ESTest(data.completed, "boolean");
  }

  console.log(data);
}

getData(); // pass: response data is as expected
```

### Class

```js
import { ESTest } from "escss-estest";

class Animal {
  constructor(name, age) {
    {
      ESTest(name, "string");
      ESTest(age, "number");
    }

    this.name = name;
    this.age = age;
  }
}

new Animal("cat", 10); // pass: response data is as expected
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

```javascript
import { ESTest } from "escss-estest";

ESTest('Happy Coding!', 'string') // pass
```

Nuxt 3
```bash
  npx nuxi module add nuxt-escss-estest
```

```vue
<script setup>
ESTest('Happy Coding!', 'string') // pass
</script>
```

## License

[see](https://github.com/ESCSS-labs/ESCSS-ESTest?tab=License-1-ov-file)
