// Run test command: bun test
import { describe, test, expect, spyOn } from "bun:test";
import { ESTest, _testToken, _isDisabledESTest } from ".";

describe("Normal Cases", () => {  
  test("RegExp", () => {
    ESTest(new RegExp(), "RegExp");
    expect(_testToken).toBe("RegExp");
  });

  test("Date", () => {
    ESTest(new Date(), "Date");
    expect(_testToken).toBe("Date");
  });

  test("Undefined", () => {
    ESTest(undefined, "Undefined");
    expect(_testToken).toBe("Undefined");
  });

  test("Null", () => {
    ESTest(null, "Null");
    expect(_testToken).toBe("Null");
  });

  test("Array", () => {
    ESTest([], "Array");
    expect(_testToken).toBe("Array");
  });

  test("Object", () => {
    ESTest({}, "Object");
    expect(_testToken).toBe("Object");
  });

  test("Boolean", () => {
    ESTest(true, "Boolean");
    expect(_testToken).toBe("Boolean");
  });

  test("NaN", () => {
    ESTest(NaN, "NaN");
    expect(_testToken).toBe("NaN");
  });

  test("Number", () => {
    ESTest(123, "Number");
    expect(_testToken).toBe("Number");
  });

  test("BigInt", () => {
    ESTest(123n, "BigInt");
    expect(_testToken).toBe("BigInt");
  });

  test("String", () => {
    ESTest("Hello World", "String");
    expect(_testToken).toBe("String");
  });

  test("Symbol", () => {
    ESTest(Symbol(), "Symbol");
    expect(_testToken).toBe("Symbol");
  });

  test("Function", () => {
    ESTest(function () {}, "Function");
    expect(_testToken).toBe("Function");
  });

  test("custom error msg", () => {
    ESTest(123, "Number", "foo");
    expect(_testToken).toBe("Number");
  });
});

describe("Error Cases", () => {
  test("Invalid 2nd argument", () => {
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
    
    ESTest(123, "RegExp")
    ESTest(123, "Undefined")
    ESTest(123, "Null")
    ESTest(123, "Array")
    ESTest(123, "Object")
    ESTest(123, "Boolean")
    ESTest(123, "NaN")
    ESTest({}, "Number")
    ESTest(123, "BigInt")
    ESTest(123, "String")
    ESTest(123, "Symbol")
    ESTest(123, "Function")
    ESTest(123, "")
    ESTest(123, 123)
    ESTest(123, [])
    ESTest(123, {})
    ESTest(123, null)
    ESTest(123, undefined)
    ESTest(123)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(19);
    consoleErrorSpy.mockRestore();
  });

  test("Invalid 3rd argument", () => {
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(10, "Number", []);
    ESTest(10, "Number", {});
    ESTest(10, "Number", 123);
    ESTest(10, "Number", true);
    ESTest(10, "Number", null);
    ESTest(10, "Number", NaN);
    ESTest(10, "Number", 10n);
    ESTest(10, "Number", /test/);
    ESTest(10, "Number", () => alert('HACK!'));
    ESTest(10, "Number", new Date());
    ESTest(10, "Number", Symbol('test'));

    expect(consoleErrorSpy).toHaveBeenCalledTimes(11);
    consoleErrorSpy.mockRestore();
  });

  test("Invalid Date", () => {
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(new Date('aaa'), 'date');

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
  });
});

describe("Default Setting", () => {
  test('_isDisabledESTest should be false', () => {
    expect(_isDisabledESTest).toBe(false);
  })
});