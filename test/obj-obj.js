import { ESTest } from "../src/index.js";

function case1() {
  const data = null

  ESTest(data, 'object').schema({
    name: 'string',
    age: 'number',
    info: {
      a: 'number',
      b: 'number',
      c: 'number'
    }
  })
}

function case2() {
  const data = {
    name: '1',
    age: 1,
    info: {
      a: true,
      b: true,

    }
  }

  ESTest(data, 'object').schema({
    name: 'string',
    age: 'number',
    info: {
      a: 'number',
      b: 'number',
    }
  })
}

function case3() {
  const data = {


    info: {
      a: true,
      b: 1,


    }
  }

  ESTest(data, 'object').schema({

    info: {
      'a?': 'number',
      'b?': 'number',
      'c?': 'number',
    }
  })
}

function case4() {
  const data = {
    name: '1',
    age: 1,
    info: {}
  }

  ESTest(data, 'object').schema({
    name: 'string',
    age: 'number',
    info: {
      a: 'number',
      b: 'number',
      c: 'number'
    }
  })
}

function case5() {
  const data = {
    name: 'string',
    age: 1,
    info: {
      a: 1,
      b: 1,
      c: 1
    }
  }

  ESTest(data, 'object').schema({
  })
}

function case6() {
  const data = {
    name: '1',
    age: 1,
    info: {
      a: 1,
      b: 1,
      c: 1
    }
  }

  ESTest(data, 'object').schema({
    name: 'string',
    age: 'number',
    info: {
      a: 'number',
      b: 'number',
      c: 'number'
    }
  })
}

function case7() {
  const data = [{
    name: '1',
    age: 1,
    info: {
      a: 1,
      b: 1,
      c: 1
    }
  }]

  ESTest(data, 'object').schema({
    name: 'string',
    age: 'number',
    info: {
      a: 'number',
      b: 'number',
      c: 'number'
    }
  })
}

// case1('data 是 null')
// case2('data key 和 schema key 不匹配')
// case3('使用? 忽略')
// case4('遞迴的 data 是 {}, 有 schema {...} -> required')
// case5('schema 是 {}, 有 data {...} -> can not be validate')
// case6('正常情況')

case7('data 要求 {} 故意給 [] -> 只有 ESTest 型別錯誤')