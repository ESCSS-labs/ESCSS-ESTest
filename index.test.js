// Run test command: bun test
import { describe, test, expect, spyOn, mock } from "bun:test";
import { ESTest, _testToken } from ".";

describe("Normal Cases", () => {
  test("regexp", () => {
    ESTest(new RegExp(), "regexp");
    expect(_testToken).toBe("regexp");
  });
  
  test("date", () => {
    ESTest(new Date(), "date");
    expect(_testToken).toBe("date");
  });

  test("undefined", () => {
    ESTest(undefined, "undefined");
    expect(_testToken).toBe("undefined");
  });

  test("null", () => {
    ESTest(null, "null");
    expect(_testToken).toBe("null");
  });

  test("array", () => {
    ESTest([], "array");
    expect(_testToken).toBe("array");
  });

  test("object", () => {
    ESTest({}, "object");
    expect(_testToken).toBe("object");
  });

  test("boolean", () => {
    ESTest(true, "boolean");
    expect(_testToken).toBe("boolean");
  });

  test("NaN", () => {
    ESTest(NaN, "NaN");
    expect(_testToken).toBe("NaN");
  });

  test("number", () => {
    ESTest(123, "number");
    expect(_testToken).toBe("number");
  });

  test("bigint", () => {
    ESTest(123n, "bigint");
    expect(_testToken).toBe("bigint");
  });

  test("string", () => {
    ESTest("Hello World", "string");
    expect(_testToken).toBe("string");
  });

  test("symbol", () => {
    ESTest(Symbol(), "symbol");
    expect(_testToken).toBe("symbol");
  });

  test("function", () => {
    ESTest(function () {}, "function");
    expect(_testToken).toBe("function");
  });

  test("custom error msg", () => {
    ESTest(123, "number", "foo");
    expect(_testToken).toBe("number");
  });
});

describe("Error Cases", () => {
  test("Invalid 2nd argument", () => {
    mock.restore();
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
    
    ESTest(123, "undefined")
    ESTest(123, "null")
    ESTest(123, "array")
    ESTest(123, "object")
    ESTest(123, "boolean")
    ESTest(123, "NaN")
    ESTest({}, "number")
    ESTest(123, "bigint")
    ESTest(123, "string")
    ESTest(123, "symbol")
    ESTest(123, "function")
    ESTest(123, "")
    ESTest(123, 123)
    ESTest(123, [])
    ESTest(123, {})
    ESTest(123, null)
    ESTest(123, undefined)
    ESTest(123)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(18);
  });

  test("Error messages type only accepts 'string' or 'undefined'", () => {
    mock.restore();
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(10, "number", []);
    ESTest(10, "number", {});
    ESTest(10, "number", 123);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
  });

  test("Invalid Date", () => {
    mock.restore();
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(new Date('aaa'), 'date');

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});

