import { ESTest } from "../src/index.js";

function case1() {
  const data = null

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
      c: 'number'
    }]
  })
}

function case2() {
  const data = [{
    name: '1',
    age: 1,
    info: [{
      a: true,
      b: true,
    }]
  }]

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
    }]
  })
}

function case3() {
  const data = [{


    info: [{
      a: true,
      b: 1,


    }]
  }]

  ESTest(data, 'array').schema({

    info: [{
      'a?': 'number',
      'b?': 'number',
      'c?': 'number',
    }]
  })
}


function case4() {
  const data = [{
    name: '1',
    age: 1,
    info: [{}]
  }]

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
      c: 'number'
    }]
  })
}

function case4_1() {
  const data = [{
    name: '1',
    age: 1,
    info: []
  }]

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
      c: 'number'
    }]
  })
}

function case5() {
  const data = [{
    name: 'string',
    age: 1,
    info: [{
      a: 1,
      b: 1,
      c: 1
    }]
  }]

  ESTest(data, 'array').schema({})
}

function case6() {
  const data = [{
    name: '1',
    age: 1,
    info: [{
      a: 1,
      b: 1,
      c: 1
    }]
  }]

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
      c: 'number'
    }]
  })
}


function case7() {
  const data = {
    name: '1',
    age: 1,
    info: [{
      a: 1,
      b: 1,
      c: 1
    }]
  }

  ESTest(data, 'array').schema({
    name: 'string',
    age: 'number',
    info: [{
      a: 'number',
      b: 'number',
      c: 'number'
    }]
  })
}

// case1('data 是 null')
// case2('data key 和 schema key 不匹配')
// case3('使用? 忽略, 有 1 個 不匹配')
// case4('遞迴的 data 是 [{}], 有 schema [{...}] -> required')
// case4_1('遞迴的 data 是 [], 有 schema [{...}] -> schema mismatch')
// case5('schema 是 {}, 有 data {...} -> <schemaKey> less than <dataKey>')
// case6('正常情況')

case7('data 要求 [] 故意給 {} -> 只有 ESTest 型別錯誤')