import { expect, test, describe } from "bun:test";
import { esTest, _getTestResult } from "./esTest";

describe("mode: type", () => {
  test("undefined", () => {
    esTest(undefined, "undefined");
    expect(_getTestResult()).toBe("undefined");
  });

  test("null", () => {
    esTest(null, "null");
    expect(_getTestResult()).toBe("null");
  });

  test("array", () => {
    esTest([], "array");
    expect(_getTestResult()).toBe("array");
  });

  test("object", () => {
    esTest({}, "object");
    expect(_getTestResult()).toBe("object");
  });

  test("boolean", () => {
    esTest(true, "boolean");
    expect(_getTestResult()).toBe("boolean");
  });

  test("NaN", () => {
    esTest(NaN, "NaN");
    expect(_getTestResult()).toBe("NaN");
  });

  test("number", () => {
    esTest(123, "number");
    expect(_getTestResult()).toBe("number");
  });

  test("bigint", () => {
    esTest(123n, "bigint");
    expect(_getTestResult()).toBe("bigint");
  });

  test("string", () => {
    esTest("Hello World", "string");
    expect(_getTestResult()).toBe("string");
  });

  test("symbol", () => {
    esTest(Symbol(), "symbol");
    expect(_getTestResult()).toBe("symbol");
  });

  test("function", () => {
    esTest(function () {}, "function");
    expect(_getTestResult()).toBe("function");
  });

  test("number w/ errMsg", () => {
    esTest(123, "number", "number text");
    expect(_getTestResult()).toBe("number");
  });
});

describe("mode: operator", () => {
  test("1 < 5", () => {
    esTest(1, "<", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("1 <= 5", () => {
    esTest(1, "<=", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("5 > 1", () => {
    esTest(5, ">", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("5 >= 1", () => {
    esTest(5, ">=", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("1 === 1", () => {
    esTest(1, "===", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("-1 !== 1", () => {
    esTest(-1, "!==", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("error message", () => {
    esTest(-1, "!==", 1, "word");
    expect(_getTestResult()).toBe(true);
  });
});

describe("error situation", () => {
  test("no params", () => {
    expect(() => esTest()).toThrow();
  });

  test("wrong 2nd argument", () => {
    expect(() => esTest(1, 123)).toThrow();
    expect(() => esTest(1, "s")).toThrow();
    expect(() => esTest(1, [])).toThrow();
    expect(() => esTest(1, "==")).toThrow();
    expect(() => esTest(1, "!=")).toThrow();
  });

  test("expect error 1 > 5", () => {
    expect(() => esTest(1, ">", 5)).toThrow();
  });

  test("expect error 1 >= 5", () => {
    expect(() => esTest(1, ">=", 5)).toThrow();
  });

  test("expect error 5 < 1", () => {
    expect(() => esTest(5, "<", 1)).toThrow();
  });

  test("expect error 5 <= 1", () => {
    expect(() => esTest(5, "<=", 1)).toThrow();
  });

  test("expect error 1 !== 1", () => {
    expect(() => esTest(1, "!==", 1)).toThrow();
  });

  test("expect error -1 === 1", () => {
    expect(() => esTest(-1, "===", 1)).toThrow();
  });

  test("type mode msg should be type: string | undefined", () => {
    expect(() => esTest(10, "number", {})).toThrow();
  });

  test("operator mode msg should be type: string | undefined", () => {
    expect(() => esTest(10, ">", 1, {})).toThrow();
  });
});
