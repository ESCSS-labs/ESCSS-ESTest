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

ESCSS-ESTest helps you to achieve 100% coverage by taking the potential of TDD and TypeScript.

## Core Concept - Water Filter

```js
function foo() {
  {
    // unhappy path(filter to throw error)
  }

  // happy path(the result that you are expected)
}
```

## Usage

### All Use Cases

```js
// Type mode
ESTest(NaN, 'NaN') // new
ESTest([], 'array') // new
ESTest(null, 'null') // new
ESTest(undefined, 'undefined') // new
ESTest(1, 'number')
ESTest('foo', 'string')
ESTest(true, 'boolean')
ESTest({}, 'object')
ESTest(1n, 'bigint')
ESTest(Symbol(), 'symbol')
ESTest(function () {}, 'function')
ESTest(1, 'object') // error
ESTest(1, 'object', 'foo') //  error message

// Operator mode
ESTest(1, "<", 5);
ESTest(5, ">", 1);
ESTest(1, "<=", 5);
ESTest(5, ">=", 1);
ESTest(1, "!==", 2);
ESTest(1, "===", 1);
ESTest(1, "===", 100); // error
ESTest(1, "===", 100, 'foo'); // error message
```

### Pure vs Impure

```js
import { ESTest } from "escss-estest";
let isEnable = true;

// Pure (input in {...})
function getSum2(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
    ESTest(isEnable, "boolean");
  }

  if (!isEnable) return 0;

  return a + b;
}

// Impure
function getSum(a, b) {
  if (!isEnable) return 0;

  return a + b;
}


// NOTE: the "function" type check is unnecessary.
function getTotalNumber(x) {
  {
    ESTest(x, "number");

    // If the function doesn't exist, it will return 'xxx is undefined.' 
    // If the function exists, getSum2(a, b) will handle type check, so the "function" check is redundant.
    ESTest(getSum2, "function"); // not necessary.
  }

  return x + getSum2(1, 2);
}
```

### Error handling: async/await

```js
import { ESTest, getData } from "escss-estest";

async function getData() {
  const url = "https://jsonplaceholder.typicode.com/todos/99999"; // undefined api
  const response = await fetch(url);
  const json = await response.json();

  {
    ESTest(json.userId, "number");
    ESTest(json.id, "number");
    ESTest(json.title, "string");
    ESTest(json.completed, "boolean");
  }

  console.log(json);
}

getData(); // get error (undefined api from 99999)
```

### Error handling: class

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

new Animal("cat", "10"); // get error ("10" should be number)
```

## Installation

```bash
  # Using npm
  npm add escss-estest

  # Using yarn
  yarn add escss-estest

  # Using pnpm
  pnpm add escss-estest

  # Using bun
  bun add escss-estest
```

## License

[see](https://github.com/ESCSS-labs/ESCSS-ESTest?tab=License-1-ov-file)
