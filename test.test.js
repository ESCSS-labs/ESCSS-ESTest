import { expect, test, describe } from "bun:test";
import { test as escssTest, _getTestResult } from "./test";

describe("mode: type", () => {
  test("undefined", () => {
    escssTest(undefined, "undefined");
    expect(_getTestResult()).toBe("undefined");
  });

  test("null", () => {
    escssTest(null, "null");
    expect(_getTestResult()).toBe("null");
  });

  test("array", () => {
    escssTest([], "array");
    expect(_getTestResult()).toBe("array");
  });

  test("object", () => {
    escssTest({}, "object");
    expect(_getTestResult()).toBe("object");
  });

  test("boolean", () => {
    escssTest(true, "boolean");
    expect(_getTestResult()).toBe("boolean");
  });

  test("NaN", () => {
    escssTest(NaN, "NaN");
    expect(_getTestResult()).toBe("NaN");
  });

  test("number", () => {
    escssTest(123, "number");
    expect(_getTestResult()).toBe("number");
  });

  test("bigint", () => {
    escssTest(123n, "bigint");
    expect(_getTestResult()).toBe("bigint");
  });

  test("string", () => {
    escssTest("Hello World", "string");
    expect(_getTestResult()).toBe("string");
  });

  test("symbol", () => {
    escssTest(Symbol(), "symbol");
    expect(_getTestResult()).toBe("symbol");
  });

  test("function", () => {
    escssTest(function () {}, "function");
    expect(_getTestResult()).toBe("function");
  });

  test("number w/ errMsg", () => {
    escssTest(123, "number", "number text");
    expect(_getTestResult()).toBe("number");
  });
});

describe("mode: operator", () => {
  test("1 < 5", () => {
    escssTest(1, "<", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("1 <= 5", () => {
    escssTest(1, "<=", 5);
    expect(_getTestResult()).toBe(true);
  });

  test("5 > 1", () => {
    escssTest(5, ">", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("5 >= 1", () => {
    escssTest(5, ">=", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("1 === 1", () => {
    escssTest(1, "===", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("-1 !== 1", () => {
    escssTest(-1, "!==", 1);
    expect(_getTestResult()).toBe(true);
  });

  test("error message", () => {
    escssTest(-1, "!==", 1, "word");
    expect(_getTestResult()).toBe(true);
  });
});

describe("error situation", () => {
  test("no params", () => {
    expect(() => escssTest()).toThrow();
  });

  test("wrong 2nd argument", () => {
    expect(() => escssTest(1, 123)).toThrow();
    expect(() => escssTest(1, "s")).toThrow();
    expect(() => escssTest(1, [])).toThrow();
    expect(() => escssTest(1, "==")).toThrow();
    expect(() => escssTest(1, "!=")).toThrow();
  });

  test("expect error 1 > 5", () => {
    expect(() => escssTest(1, ">", 5)).toThrow();
  });

  test("expect error 1 >= 5", () => {
    expect(() => escssTest(1, ">=", 5)).toThrow();
  });

  test("expect error 5 < 1", () => {
    expect(() => escssTest(5, "<", 1)).toThrow();
  });

  test("expect error 5 <= 1", () => {
    expect(() => escssTest(5, "<=", 1)).toThrow();
  });

  test("expect error 1 !== 1", () => {
    expect(() => escssTest(1, "!==", 1)).toThrow();
  });

  test("expect error -1 === 1", () => {
    expect(() => escssTest(-1, "===", 1)).toThrow();
  });

  test("type mode msg should be type: string | undefined", () => {
    expect(() => escssTest(10, "number", {})).toThrow();
  });

  test("operator mode msg should be type: string | undefined", () => {
    expect(() => escssTest(10, ">", 1, {})).toThrow();
  });
});
