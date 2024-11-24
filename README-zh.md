![logo](https://github.com/ESCSS-labs/ESCSS/blob/main/assets/logo.png)

## 快速連結

- [什麼是 ESCSS-ESTest?](#什麼是-escss-estest)
- [核心概念 - 濾水器](#核心概念---濾水器)
- [使用方式](#使用方式)
- [安裝方式](#安裝方式)
- [許可證](#許可證)

## 什麼是 ESCSS-ESTest?

ESCSS-ESTest 是一個運行時期的測試工具，受 TDD 和 TypeScript 的啟發，實現 100% 的覆蓋率。

## 核心概念 - 濾水器

```js
function foo() {
  {
    // 丟出錯誤
  }

  // 常見寫法
}
```

## 使用方式

### 例子

```js
ESTest(NaN, "NaN"); // 新增
ESTest([], "array"); // 新增
ESTest(null, "null"); // 新增
ESTest(undefined, "undefined"); // 新增
ESTest(1, "number");
ESTest("foo", "string");
ESTest(true, "boolean");
ESTest({}, "object");
ESTest(1n, "bigint");
ESTest(Symbol(), "symbol");
ESTest(function () {}, "function");
ESTest(1, "object"); // 錯誤
ESTest(1, "object", "foo"); // 錯誤信息
```

### 常見情況

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

getData(); // 通過: 回傳資料如預期一樣
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

new Animal("cat", 10); // 通過: 回傳資料如預期一樣
```

## 安裝方式

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

## 許可證

[參見](https://github.com/ESCSS-labs/ESCSS-ESTest?tab=License-1-ov-file)
