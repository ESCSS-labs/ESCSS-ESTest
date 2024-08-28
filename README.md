# What is ESCSS-estest?

Achieve 100% coverage makes your life easier

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
test(1, "<", 5);
test(5, ">", 1);
test(1, "<=", 5);
test(5, ">=", 1);
test(1, "!==", 2);
test(1, "===", 1);
test(1, "===", 100); // error
test(1, "===", 100, "foo"); // error & message

// type mode
test(1, "number");
test(1n, "bigint");
test("foo", "string");
test(true, "boolean");
test([], "array"); // new type
test({}, "object");
test(NaN, "NaN"); // new type
test(null, "null"); // new type
test(undefined, "undefined"); // new type
test(Symbol(), "symbol");
test(function () {}, "function");
test(1, "object"); // error
test(1, "object", "foo"); // error & message

// get report (use it in root component)
getReport();
```

## Examples

```js
// basic
function sum(a, b) {
  {
    test(a, "number");
    test(b, "number");
  }

  return a + b;
}

// async / await
async function getData() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const response = await fetch(url);
  const json = await response.json();

  {
    test(
      url,
      "===",
      "https://jsonplaceholder.typicode.com/todos/1",
      "url has been changed",
    );
    test(json.completed, "boolean");
    test(json.id, "number");
    test(json.title, "string");
    test(json.userId, "number");
  }

  console.log(json);
}

// get report
// 1. start your dev server
// 2. use getReport() under root component
// 3. hit save for hot reload(Vite)
// 4. get a console.log report in browser (step 1 - 3 async/await concern)
//
// Note: to get the correctest report test should be used in function, not outside(test in Vue 3)
```

## Q&A

### Does ESCSS-estest make my function a pure function?

I Thinks so. The purpose of using pure functions is to ensure predictability, which makes them easier to test.

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
// same input in {} (unhappy path) expects same output
let discount = 1;
function getFinalPrice(price) {
  {
    test(price, "number");
    test(discount, "===", 1);
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
