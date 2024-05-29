import { expect, test, describe } from "bun:test";
import { unitTest } from "./UnitTest";

describe("mode: type", () => {
  test("undefined", () => {
    expect(unitTest(undefined, "undefined")).toBe("undefined");
  });

  test("null", () => {
    expect(unitTest(null, "null")).toBe("null");
  });

  test("array", () => {
    expect(unitTest([], "array")).toBe("array");
  });

  test("object", () => {
    expect(unitTest({}, "object")).toBe("object");
  });

  test("boolean", () => {
    expect(unitTest(true, "boolean")).toBe("boolean");
  });

  test("NaN", () => {
    expect(unitTest(NaN, "NaN")).toBe("NaN");
  });

  test("number", () => {
    expect(unitTest(123, "number")).toBe("number");
  });

  test("bigint", () => {
    expect(unitTest(123n, "bigint")).toBe("bigint");
  });

  test("string", () => {
    expect(unitTest("Hello World", "string")).toBe("string");
  });

  test("symbol", () => {
    expect(unitTest(Symbol(), "symbol")).toBe("symbol");
  });

  test("function", () => {
    expect(unitTest(function () {}, "function")).toBe("function");
  });

  test("number w/ errMsg", () => {
    expect(unitTest(123, "number", "number text")).toBe("number");
  });
});

describe("mode: operator", () => {
  test("1 < 5", () => {
    expect(unitTest(1, "<", 5)).toBe(true);
  });

  test("1 <= 5", () => {
    expect(unitTest(1, "<=", 5)).toBe(true);
  });

  test("5 > 1", () => {
    expect(unitTest(5, ">", 1)).toBe(true);
  });

  test("5 >= 1", () => {
    expect(unitTest(5, ">=", 1)).toBe(true);
  });

  test("1 === 1", () => {
    expect(unitTest(1, "===", 1)).toBe(true);
  });

  test("-1 !== 1", () => {
    expect(unitTest(-1, "!==", 1)).toBe(true);
  });

  test("error message", () => {
    expect(unitTest(-1, "!==", 1, "word")).toBe(true);
  });
});

describe("error situation", () => {
  test("no params", () => {
    expect(() => unitTest()).toThrow();
  });

  test("wrong 2nd argument", () => {
    expect(() => unitTest(1, 123)).toThrow();
    expect(() => unitTest(1, "s")).toThrow();
    expect(() => unitTest(1, [])).toThrow();
    expect(() => unitTest(1, "==")).toThrow();
    expect(() => unitTest(1, "!=")).toThrow();
  });

  test("type errMsg 3th argument should be type: string | undefined", () => {
    expect(() => unitTest(10, "number", {})).toThrow();
  });

  test("operator errMsg 4th argument should be type: string | undefined", () => {
    expect(() => unitTest(10, ">", 1, {})).toThrow();
  });
});
