import { expect, test, describe } from "bun:test";
import { esTest } from "./ESTest";

describe("mode: type", () => {
  test("undefined", () => {
    expect(esTest(undefined, "undefined")).toBe("undefined");
  });

  test("null", () => {
    expect(esTest(null, "null")).toBe("null");
  });

  test("array", () => {
    expect(esTest([], "array")).toBe("array");
  });

  test("object", () => {
    expect(esTest({}, "object")).toBe("object");
  });

  test("boolean", () => {
    expect(esTest(true, "boolean")).toBe("boolean");
  });

  test("NaN", () => {
    expect(esTest(NaN, "NaN")).toBe("NaN");
  });

  test("number", () => {
    expect(esTest(123, "number")).toBe("number");
  });

  test("bigint", () => {
    expect(esTest(123n, "bigint")).toBe("bigint");
  });

  test("string", () => {
    expect(esTest("Hello World", "string")).toBe("string");
  });

  test("symbol", () => {
    expect(esTest(Symbol(), "symbol")).toBe("symbol");
  });

  test("function", () => {
    expect(esTest(function () {}, "function")).toBe("function");
  });

  test("number w/ errMsg", () => {
    expect(esTest(123, "number", "number text")).toBe("number");
  });
});

describe("mode: operator", () => {
  test("1 < 5", () => {
    expect(esTest(1, "<", 5)).toBe(true);
  });

  test("1 <= 5", () => {
    expect(esTest(1, "<=", 5)).toBe(true);
  });

  test("5 > 1", () => {
    expect(esTest(5, ">", 1)).toBe(true);
  });

  test("5 >= 1", () => {
    expect(esTest(5, ">=", 1)).toBe(true);
  });

  test("1 === 1", () => {
    expect(esTest(1, "===", 1)).toBe(true);
  });

  test("-1 !== 1", () => {
    expect(esTest(-1, "!==", 1)).toBe(true);
  });

  test("error message", () => {
    expect(esTest(-1, "!==", 1, "word")).toBe(true);
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

  test("type errMsg 3th argument should be type: string | undefined", () => {
    expect(() => esTest(10, "number", {})).toThrow();
  });

  test("operator errMsg 4th argument should be type: string | undefined", () => {
    expect(() => esTest(10, ">", 1, {})).toThrow();
  });
});
