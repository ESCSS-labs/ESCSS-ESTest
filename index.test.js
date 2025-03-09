import { ESTest, unSafeESTest } from ".";
/* test command:
  - npm install bun --global
  - bun test
*/

describe("ESTest", () => {
  describe("return object", () => {
    test("string", () => {
      expect(typeof ESTest("Hello World", "string")).toBe("object");
    });

    test("number", () => {
      expect(typeof ESTest(1, "number")).toBe("object");
    });

    test("array", () => {
      expect(typeof ESTest([1, 2, 3], "array")).toBe("object");
    });

    test("object", () => {
      expect(typeof ESTest({}, "object")).toBe("object");
    });

    test("boolean", () => {
      expect(typeof ESTest(true, "boolean")).toBe("object");
    });

    test("date", () => {
      expect(typeof ESTest(new Date(), "date")).toBe("object");
    });

    test("bigint", () => {
      expect(typeof ESTest(1n, "bigint")).toBe("object");
    });

    test("undefined", () => {
      expect(typeof ESTest(undefined, "undefined")).toBe("object");
    });

    test("null", () => {
      expect(typeof ESTest(null, "null")).toBe("object");
    });

    test("NaN", () => {
      expect(typeof ESTest(NaN, "NaN")).toBe("object");
    });

    test("symbol", () => {
      expect(typeof ESTest(Symbol("foo"), "symbol")).toBe("object");
    });

    test("function", () => {
      expect(typeof ESTest(function test() {}, "function")).toBe("object");
    });

    test("regex", () => {
      expect(typeof ESTest(/foo/, "regex")).toBe("object");
    });
  });
});

describe("unSafeESTest", () => {
  describe("return object", () => {
    test("string", () => {
      expect(typeof unSafeESTest("Hello World", "string")).toBe("object");
    });

    test("number", () => {
      expect(typeof unSafeESTest(1, "number")).toBe("object");
    });

    test("array", () => {
      expect(typeof unSafeESTest([1, 2, 3], "array")).toBe("object");
    });

    test("object", () => {
      expect(typeof unSafeESTest({}, "object")).toBe("object");
    });

    test("boolean", () => {
      expect(typeof unSafeESTest(true, "boolean")).toBe("object");
    });

    test("date", () => {
      expect(typeof unSafeESTest(new Date(), "date")).toBe("object");
    });

    test("bigint", () => {
      expect(typeof unSafeESTest(1n, "bigint")).toBe("object");
    });

    test("undefined", () => {
      expect(typeof unSafeESTest(undefined, "undefined")).toBe("object");
    });

    test("null", () => {
      expect(typeof unSafeESTest(null, "null")).toBe("object");
    });

    test("NaN", () => {
      expect(typeof unSafeESTest(NaN, "NaN")).toBe("object");
    });

    test("symbol", () => {
      expect(typeof unSafeESTest(Symbol("foo"), "symbol")).toBe("object");
    });

    test("function", () => {
      expect(typeof unSafeESTest(function test() {}, "function")).toBe(
        "object",
      );
    });

    test("regex", () => {
      expect(typeof unSafeESTest(/foo/, "regex")).toBe("object");
    });
  });
});

describe("globalThis config", () => {
  test("name", () => {
    expect(globalThis.__ESCSS_ESTEST__.name).toBe("escss-estest");
  });
  test("license", () => {
    expect(globalThis.__ESCSS_ESTEST__.license).toBe(
      "Copyright (c) 2024 Mike Lee, AGPL-3.0-only OR Commercial",
    );
  });
  test("publicMessage", () => {
    expect(globalThis.__ESCSS_ESTEST__.publicMessage).toBe(
      "Customize your public message, visible in development / production.",
    );
  });
});
