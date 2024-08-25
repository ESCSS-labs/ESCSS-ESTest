# What is ESCSS-estest?

Achieve 100% test coverage and help your function become a pure function.

## Core Concept - Water Filter

```js
function foo() {
  {
    // unhappy path(throw error here, under {} to be organized)
  }

  // happy path
}
```

## Usage

```js
// operator mode
esTest(1, "<", 5);
esTest(5, ">", 1);
esTest(1, "<=", 5);
esTest(5, ">=", 1);
esTest(1, "!==", 2);
esTest(1, "===", 1);
esTest(1, "===", 100); // error
esTest(1, "===", 100, "foo"); // error & message

// type mode
esTest(1, "number");
esTest(1n, "bigint");
esTest("foo", "string");
esTest(true, "boolean");
esTest([], "array"); // new type
esTest({}, "object");
esTest(NaN, "NaN"); // new type
esTest(null, "null"); // new type
esTest(undefined, "undefined"); // new type
esTest(Symbol(), "symbol");
esTest(function () {}, "function");
esTest(1, "object"); // error
esTest(1, "object", "foo"); // error & message

// get report (use it in root component)
getReport();
```

## Examples

```js
// basic
function sum(a, b) {
  {
    esTest(a, "number");
    esTest(b, "number");
  }

  return a + b;
}

// async / await
async function getData() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  const json = await response.json();

  {
    esTest(
      url,
      "===",
      "https://jsonplaceholder.typicode.com/todos/1",
      "url has been changed",
    );
    esTest(json.completed, "boolean");
    esTest(json.id, "number");
    esTest(json.title, "string");
    esTest(json.userId, "number");
  }

  console.log(json);
}

// get report
// 1. start your dev server
// 2. use getReport() under root component
// 3. hit save for hot reload(Vite)
// 4. get a console.log report in browser (step 1 - 3 async/await concern)
//
// Note: to get the correctest report esTest should be used in function, not outside(test in Vue 3)
```

## Q&A

### Does ESCSS-estest make my function a pure function?

The purpose of using pure functions is to ensure predictability, which makes them easier to test.

```js
// Pure function - same input expects same output
function getFinalPrice(price) {
  return price * 1;
}

getFinalPrice(100); // 100
getFinalPrice(100); // 100
```

```js
// Not pure function - same input not expects same output
let discount = 1;
function getFinalPrice(price) {
  return price * discount;
}

getFinalPrice(100); // 100
discount = 0.1;
getFinalPrice(100); // 10
```

```js
// Pure function - same input in {} (unhappy path) expects same output
let discount = 1;
function getFinalPrice(price) {
  {
    esTest(price, "number");
    esTest(discount, "===", 1);
  }

  return price * discount;
}

getFinalPrice(100); // 100
discount = 0.1;
getFinalPrice(100); // Throw an error if the discount is not 1; if changed to 1, receive 100 as expected.
```

## Installation

```
  npm install escss-estest
```

```
  yarn add escss-estest
```

```
  bun add escss-estest
```

## Test Cases Guide

1. clone project
2. bun install
3. bun test

## License

Dual Licensing（ Commercial or AGPL 3.0 ）, see [LICENSE](./LICENSE.md)
