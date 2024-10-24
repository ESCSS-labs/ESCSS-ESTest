![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## 快速連結

- [什麼是 ESCSS-ESTest?](#什麼是-escss-estest)
- [核心概念 - 濾水器](#核心概念---濾水器)
- [使用方式](#使用方式)
- [安裝方式](#安裝方式)
- [許可證](#許可證)

## 什麼是 ESCSS-ESTest?

ESCSS-ESTest 是藉由 TDD 和 TypeScript 的潛力來實現 100% 的覆蓋率。

## 核心概念 - 濾水器

```js
function foo() {
  {
    // 撰寫測試(丟出錯誤)
  }

  // 正常寫法(撰寫符合預期的程式碼)
}
```

## 使用方式

### 全部的使用例子

```js
// 型別模式
ESTest(NaN, 'NaN') // 新增
ESTest([], 'array') // 新增
ESTest(null, 'null') // 新增
ESTest(undefined, 'undefined') // 新增
ESTest(1, 'number')
ESTest('foo', 'string')
ESTest(true, 'boolean')
ESTest({}, 'object')
ESTest(1n, 'bigint')
ESTest(Symbol(), 'symbol')
ESTest(function () {}, 'function')
ESTest(1, 'object') // 錯誤
ESTest(1, 'object', 'foo') // 錯誤信息

// 對比模式
ESTest(1, "<", 5);
ESTest(5, ">", 1);
ESTest(1, "<=", 5);
ESTest(5, ">=", 1);
ESTest(1, "!==", 2);
ESTest(1, "===", 1);
ESTest(1, "===", 100); // 錯誤
ESTest(1, "===", 100, 'foo'); // 錯誤信息
```

### 純函數 vs 非純函數

```js
import { ESTest } from "escss-estest";
let isEnable = true;

// 純函數 (參數測試在 {...})
function getSum2(a, b) {
  {
    ESTest(a, "number");
    ESTest(b, "number");
    ESTest(isEnable, "boolean");
  }

  if (!isEnable) return 0;

  return a + b;
}

// 非純函數
function getSum(a, b) {
  if (!isEnable) return 0;

  return a + b;
}


// 注意： "function" 類型檢查是不必要的。
function getTotalNumber(x) {
  {
    ESTest(x, "number");

    // 如果函數不存在，將返回 'xxx is undefined.' 
    // 如果函數存在，getSum2(a, b) 將處理類型檢查，因此 "function" 檢查是多餘的。
    ESTest(getSum2, "function"); // 沒必要
  }

  return x + getSum2(1, 2);
}
```

### 錯誤處理: async/await

```js
import { ESTest, getData } from "escss-estest";

async function getData() {
  const url = "https://jsonplaceholder.typicode.com/todos/99999"; // 不存在的 api
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

getData(); // 產生錯誤 (api 99999 實際上是不存在的)
```

### 錯誤處理: class

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

new Animal("cat", "10"); // 產生錯誤（"10" 應為數字型別）
```

## 安裝方式

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

## 許可證

[參見](https://github.com/ESCSS-labs/ESCSS-ESTest?tab=License-1-ov-file)
