import { _TypeClass } from "./_TypeClass";
import { _coreTest } from "./utils";

globalThis.__ESCSS_ESTEST__ = {
  message: "Set 'globalThis.__ESCSS_ESTEST__.message' for customize message",
  isESTestDisabled: false,
  analysis: {
    ESTest: {
      _count: 0,
    },
    unSafeESTest: {
      _count: 0,
    },
    createESTest: {
      _count: 0,
    },
    _Common: {
      _count: 0,
      describe: 0,
    },
    _Undefined: {
      _count: 0,
      describe: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      integer: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
      length: 0,
      email: 0,
      uuid4: 0,
      uuid7: 0,
      regex: 0,
      base64: 0,
      base64url: 0,
      ip4: 0,
      ip6: 0,
      cidr4: 0,
      cidr6: 0,
      emoji: 0,
      e164: 0,
      lowercase: 0,
      schema: 0,
      refine: 0,
      superRefine: 0,
    },
    _Null: {
      _count: 0,
    },
    _Boolean: {
      _count: 0,
    },
    _Number: {
      _count: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      integer: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
    },
    _BigInt: {
      _count: 0,
      less: 0,
      max: 0,
      greater: 0,
      min: 0,
      positive: 0,
      negative: 0,
      multiple: 0,
    },
    _String: {
      _count: 0,
      max: 0,
      min: 0,
      length: 0,
      email: 0,
      uuid4: 0,
      uuid7: 0,
      regex: 0,
      base64: 0,
      base64url: 0,
      ip4: 0,
      ip6: 0,
      cidr4: 0,
      cidr6: 0,
      emoji: 0,
      e164: 0,
      lowercase: 0,
    },
    _Symbol: {
      _count: 0,
    },
    _Function: {
      _count: 0,
    },
    _Object: {
      _count: 0,
      schema: 0,
      refine: 0,
      superRefine: 0,
    },
    _Array: {
      _count: 0,
      min: 0,
      max: 0,
      length: 0,
      schema: 0,
    },
  },
};

export function ESTest(input, type, message) {
  globalThis.__ESCSS_ESTEST__.analysis.ESTest._count += 1;

  // early return and set 'undefined' type to prevent breaking
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) {
    return new _TypeClass.undefined();
  }

  // console.error()
  return _coreTest(input, type, message, false);
}

export function unSafeESTest(input, type, message) {
  globalThis.__ESCSS_ESTEST__.analysis.unSafeESTest._count += 1;

  // throw new Error()
  return _coreTest(input, type, message, true);
}

export function createESTest(input, type, message) {
  globalThis.__ESCSS_ESTEST__.analysis.createESTest._count += 1;

  // early return and set 'undefined' type to prevent breaking
  if (globalThis.__ESCSS_ESTEST__.isESTestDisabled) {
    return new _TypeClass.undefined();
  }

  globalThis.__ESCSS_ESTEST__.message = message;

  // console.error()
  return _coreTest(input, type, message, false);
}
