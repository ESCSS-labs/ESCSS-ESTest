import { describe, test, expect } from "bun:test";
import { ESTest, _getTestResult } from "./ESTest";

describe("mode: type", () => {
  test("undefined", () => {
    ESTest(undefined, "undefined");
    expect(_getTestResult()).toBe("undefined");
  });

  test("null", () => {
    ESTest(null, "null");
    expect(_getTestResult()).toBe("null");
  });

  test("array", () => {
    ESTest([], "array");
    expect(_getTestResult()).toBe("array");
  });

  test("object", () => {
    ESTest({}, "object");
    expect(_getTestResult()).toBe("object");
  });

  test("boolean", () => {
    ESTest(true, "boolean");
    expect(_getTestResult()).toBe("boolean");
  });

  test("NaN", () => {
    ESTest(NaN, "NaN");
    expect(_getTestResult()).toBe("NaN");
  });

  test("number", () => {
    ESTest(123, "number");
    expect(_getTestResult()).toBe("number");
  });

  test("bigint", () => {
    ESTest(123n, "bigint");
    expect(_getTestResult()).toBe("bigint");
  });

  test("string", () => {
    ESTest("Hello World", "string");
    expect(_getTestResult()).toBe("string");
  });

  test("symbol", () => {
    ESTest(Symbol(), "symbol");
    expect(_getTestResult()).toBe("symbol");
  });

  test("function", () => {
    ESTest(function () { }, "function");
    expect(_getTestResult()).toBe("function");
  });

  test("number w/ errMsg", () => {
    ESTest(123, "number", "number text");
    expect(_getTestResult()).toBe("number");
  });
});

describe("mode: operator", () => {
  test("1 < 5", () => {
    ESTest(1, "<", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("1 <= 5", () => {
    ESTest(1, "<=", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("5 > 1", () => {
    ESTest(5, ">", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("5 >= 1", () => {
    ESTest(5, ">=", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("1 === 1", () => {
    ESTest(1, "===", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("-1 !== 1", () => {
    ESTest(-1, "!==", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("error message", () => {
    ESTest(-1, "!==", 1, "word");
    expect(_getTestResult()).toBe(true);
  });
});

describe("error situation", () => {
  test("no params", () => {
    expect(() => ESTest()).toThrow();
  });

  test("wrong 2nd argument", () => {
    expect(() => ESTest(1, 123)).toThrow();
    expect(() => ESTest(1, "s")).toThrow();
    expect(() => ESTest(1, [])).toThrow();
    expect(() => ESTest(1, "==")).toThrow();
    expect(() => ESTest(1, "!=")).toThrow();
  });

  test("expect error 1 > 5", () => {
    expect(() => ESTest(1, ">", 5)).toThrow();
  });

  test("expect error 1 >= 5", () => {
    expect(() => ESTest(1, ">=", 5)).toThrow();
  });

  test("expect error 5 < 1", () => {
    expect(() => ESTest(5, "<", 1)).toThrow();
  });

  test("expect error 5 <= 1", () => {
    expect(() => ESTest(5, "<=", 1)).toThrow();
  });

  test("expect error 1 !== 1", () => {
    expect(() => ESTest(1, "!==", 1)).toThrow();
  });

  test("expect error -1 === 1", () => {
    expect(() => ESTest(-1, "===", 1)).toThrow();
  });

  test("type mode msg should be type: string | undefined", () => {
    expect(() => ESTest(10, "number", {})).toThrow();
  });

  test("operator mode msg should be type: string | undefined", () => {
    expect(() => ESTest(10, ">", 1, {})).toThrow();
  });
});
