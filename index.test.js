// Run test command: bun test
import { describe, test, expect, spyOn } from "bun:test";
import { ESTest, _testToken, isDisabledLibrary } from ".";

describe("Normal Cases", () => {  
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

  test("Date", () => {
    ESTest(new Date(), "Date");
    expect(_testToken).toBe("Date");
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

  test("RegExp", () => {
    ESTest(new RegExp(), "RegExp");
    expect(_testToken).toBe("RegExp");
  });
});

describe("Error Cases", () => {
  test("Invalid 1st argument (Invalid Date)", () => {
    const consoleSpy = spyOn(console, "log").mockImplementation(() => {});
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(new Date('aaa'), 'date');

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test("Invalid 2nd argument", () => {
    const consoleSpy = spyOn(console, "log").mockImplementation(() => {});
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    ESTest(123, "Undefined")
    ESTest(123, "Null")
    ESTest(123, "Array")
    ESTest(123, "Date")
    ESTest(123, "Object")
    ESTest(123, "Boolean")
    ESTest(123, "NaN")
    ESTest({}, "Number")
    ESTest(123, "BigInt")
    ESTest(123, "String")
    ESTest(123, "Symbol")
    ESTest(123, "Function")
    ESTest(123, "RegExp")
    ESTest(123, undefined)
    ESTest(123, null)
    ESTest(123, [])
    ESTest(123, {})
    ESTest(123, true)
    ESTest(123, NaN)
    ESTest(123, 123)
    ESTest(123, 123n)
    ESTest(123, 'test')
    ESTest(123, Symbol('test'))
    ESTest(123, () => alert('test'))
    ESTest(123, /test/)

    expect(consoleSpy).toHaveBeenCalledTimes(25);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(25);
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test("Invalid 3rd argument", () => {
    const consoleSpy = spyOn(console, "log").mockImplementation(() => {});
    const consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});

    // all pass situations
    ESTest(123, 'Number', 'test')
    ESTest(123, 'Number', undefined) // use defaultPubMsg('String')
    
    // all error situations
    ESTest(123, 'Number', null)
    ESTest(123, 'Number', [])
    ESTest(123, 'Number', {})
    ESTest(123, 'Number', true)
    ESTest(123, 'Number', NaN)
    ESTest(123, 'Number', 123)
    ESTest(123, 'Number', 123n)
    ESTest(123, 'Number', Symbol('test'))
    ESTest(123, 'Number', () => alert('test'))
    ESTest(123, 'Number', /test/)

    expect(consoleSpy).toHaveBeenCalledTimes(10);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(10);
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});

describe("Default Setting", () => {
  test('isDisabledLibrary should be false', () => {
    expect(isDisabledLibrary).toBe(false);
  })
});