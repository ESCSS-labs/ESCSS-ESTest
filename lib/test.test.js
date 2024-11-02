// Run test command (bun required): bun test
import { describe, test, expect } from "bun:test";
import { ESTest, _internalTestToken } from ".";

describe("Normal Cases", () => {
  test("undefined", () => {
    ESTest(undefined, "undefined");
    expect(_internalTestToken).toBe("undefined");
  });

  test("null", () => {
    ESTest(null, "null");
    expect(_internalTestToken).toBe("null");
  });

  test("array", () => {
    ESTest([], "array");
    expect(_internalTestToken).toBe("array");
  });

  test("object", () => {
    ESTest({}, "object");
    expect(_internalTestToken).toBe("object");
  });

  test("boolean", () => {
    ESTest(true, "boolean");
    expect(_internalTestToken).toBe("boolean");
  });

  test("NaN", () => {
    ESTest(NaN, "NaN");
    expect(_internalTestToken).toBe("NaN");
  });

  test("number", () => {
    ESTest(123, "number");
    expect(_internalTestToken).toBe("number");
  });

  test("bigint", () => {
    ESTest(123n, "bigint");
    expect(_internalTestToken).toBe("bigint");
  });

  test("string", () => {
    ESTest("Hello World", "string");
    expect(_internalTestToken).toBe("string");
  });

  test("symbol", () => {
    ESTest(Symbol(), "symbol");
    expect(_internalTestToken).toBe("symbol");
  });

  test("function", () => {
    ESTest(function () {}, "function");
    expect(_internalTestToken).toBe("function");
  });

  test("custom error msg", () => {
    ESTest(123, "number", "foo");
    expect(_internalTestToken).toBe("number");
  });
});

describe("Error Cases", () => {
  test("Invalid 2nd argument", () => {
    expect(() => ESTest(123, "undefined")).toThrow();
    expect(() => ESTest(123, "null")).toThrow();
    expect(() => ESTest(123, "array")).toThrow();
    expect(() => ESTest(123, "object")).toThrow();
    expect(() => ESTest(123, "boolean")).toThrow();
    expect(() => ESTest(123, "NaN")).toThrow();
    expect(() => ESTest({}, "number")).toThrow();
    expect(() => ESTest(123, "bigint")).toThrow();
    expect(() => ESTest(123, "string")).toThrow();
    expect(() => ESTest(123, "symbol")).toThrow();
    expect(() => ESTest(123, "function")).toThrow();
    expect(() => ESTest(123, "")).toThrow();
    expect(() => ESTest(123, 123)).toThrow();
    expect(() => ESTest(123, [])).toThrow();
    expect(() => ESTest(123, {})).toThrow();
    expect(() => ESTest(123, null)).toThrow();
    expect(() => ESTest(123, undefined)).toThrow();
    expect(() => ESTest(123)).toThrow();
  });

  test("Error messages type only accepts 'string' or 'undefined'", () => {
    expect(() => ESTest(10, "number", [])).toThrow();
    expect(() => ESTest(10, "number", {})).toThrow();
    expect(() => ESTest(10, "number", 123)).toThrow();
  });
});
