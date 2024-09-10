![logo](./img/logo.png)

# What is ESCSS-ESTest?

ESCSS-ESTest helps you to achieve 100% function coverage inspired by TDD and TypeScript.

## Core Concept - Water Filter

```js
function foo() {
  {
    // unhappy path(filter to throw error)
  }

  // happy path(the result that you are expected)
}
```

## Requirements

Vite >= 4.4.0 (if you use it)

## Demo

### Pure vs Impure function

![example-1](./img/exmaple-pure-impure.png)

### Error handling: async/await & try-catch

![example-2](./img/example-try-catch.png)

### Error handling: class

![example-3](./img/example-class.png)

### Get report

1. start your dev server
2. use getReport() under root component
3. hit save for hot reload(Vite)
4. get a console.log report in browser

**_The order of steps 1-3 is a concern regarding async/await. For reference only, complete protection your codebase requires E2E_**

## Usage

```js
// Type mode
ESTest(1, "number");
ESTest(1n, "bigint");
ESTest("foo", "string");
ESTest(true, "boolean");
ESTest([], "array"); // new type
ESTest({}, "object");
ESTest(NaN, "NaN"); // new type
ESTest(null, "null"); // new type
ESTest(undefined, "undefined"); // new type
ESTest(Symbol(), "symbol");
ESTest(function () {}, "function");
ESTest(1, "object"); // error
ESTest(1, "object", "mike 09062024 001"); // The error message should provide a unique ID for troubleshooting

// Operator mode
ESTest(1, "<", 5);
ESTest(5, ">", 1);
ESTest(1, "<=", 5);
ESTest(5, ">=", 1);
ESTest(1, "!==", 2);
ESTest(1, "===", 1);
ESTest(1, "===", 100); // error
ESTest(1, "===", 100, "mike 09062024 001"); // The error message should provide a unique ID for troubleshooting

// Get console.log report (Ｕse it in the root component)
getReport();
```

## Q&A
### Why did your versioning start at v1.2.x?

I initially started at v1.0.0 and experimented quite a bit, which led to some inconsistencies. That's why the official versioning begins at v1.2.x.

## Installation

```bash
### npm
  npm install escss-ESTest

### yarn
  yarn add escss-ESTest

### bun
  bun add escss-ESTest
```

## Run Test Cases

1. clone project
2. bun ESTest(I installed bun globally)

## License

Dual Licensing（Commercial or AGPL 3.0）,see [LICENSE](./LICENSE)
