import { describe, test, expect, vi } from "vitest";
import { ESTest, unSafeESTest } from "../src/index.js";

describe("ESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string")).toBeTypeOf("object");
      expect(ESTest(1, "number")).toBeTypeOf("object");
      expect(ESTest([], "array")).toBeTypeOf("object");
      expect(ESTest({}, "object")).toBeTypeOf("object");
      expect(ESTest(true, "boolean")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(ESTest(null, "null")).toBeTypeOf("object");
      expect(ESTest(NaN, "NaN")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function")).toBeTypeOf("object");
      expect(ESTest(/a/, "regex")).toBeTypeOf("object");
    });

    test("fail", () => {
      const publicMessage = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const privateMessage = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest(/a/, "string")).toBeTypeOf("object");
      expect(ESTest("a", "number")).toBeTypeOf("object");
      expect(ESTest(1, "array")).toBeTypeOf("object");
      expect(ESTest([], "object")).toBeTypeOf("object");
      expect(ESTest({}, "boolean")).toBeTypeOf("object");
      expect(ESTest(true, "date")).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint")).toBeTypeOf("object");
      expect(ESTest(1n, "undefined")).toBeTypeOf("object");
      expect(ESTest(undefined, "null")).toBeTypeOf("object");
      expect(ESTest(null, "NaN")).toBeTypeOf("object");
      expect(ESTest(NaN, "symbol")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "function")).toBeTypeOf("object");
      expect(ESTest(() => {}, "regex")).toBeTypeOf("object");

      expect(publicMessage).toHaveBeenCalledTimes(13);
      expect(privateMessage).toHaveBeenCalledTimes(13);
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string", "foo")).toBeTypeOf("object");
      expect(ESTest(1, "number", "foo")).toBeTypeOf("object");
      expect(ESTest([], "array", "foo")).toBeTypeOf("object");
      expect(ESTest({}, "object", "foo")).toBeTypeOf("object");
      expect(ESTest(true, "boolean", "foo")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date", "foo")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", "foo")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", "foo")).toBeTypeOf("object");
      expect(ESTest(null, "null", "foo")).toBeTypeOf("object");
      expect(ESTest(NaN, "NaN", "foo")).toBeTypeOf("object");
      expect(ESTest(Symbol("a", "foo"), "symbol", "foo")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function", "foo")).toBeTypeOf("object");
      expect(ESTest(/a/, "regex", "foo")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => ESTest("a", "string", 1)).toBeTypeOf("function");
      expect(() => ESTest(1, "number", 1)).toBeTypeOf("function");
      expect(() => ESTest([], "array", [])).toBeTypeOf("function");
      expect(() => ESTest({}, "object", {})).toBeTypeOf("function");
      expect(() => ESTest(true, "boolean", true)).toBeTypeOf("function");
      expect(() => ESTest(new Date(), "date", new Date())).toBeTypeOf(
        "function",
      );
      expect(() => ESTest(1n, "bigint", 1n)).toBeTypeOf("function");
      expect(() => ESTest(undefined, "undefined", 1)).toBeTypeOf("function");
      expect(() => ESTest(null, "null", null)).toBeTypeOf("function");
      expect(() => ESTest(NaN, "NaN", NaN)).toBeTypeOf("function");
      expect(() =>
        ESTest(Symbol("a", "foo"), "symbol", Symbol("a", "foo")),
      ).toBeTypeOf("function");
      expect(() =>
        ESTest(
          () => {},
          "function",
          () => {},
        ),
      ).toBeTypeOf("function");
      expect(() => ESTest(/a/, "regex", /a/)).toBeTypeOf("function");
    });
  });

  describe("common", () => {
    test("description", () => {
      const publicMessage = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const privateMessage = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      ESTest("a", "string").description("test");
      ESTest(1, "number").description("test");
      ESTest([], "array").description("test");
      ESTest({}, "object").description("test");
      ESTest(true, "boolean").description("test");
      ESTest(new Date(), "date").description("test");
      ESTest(1n, "bigint").description("test");
      ESTest(undefined, "undefined").description("test");
      ESTest(null, "null").description("test");
      ESTest(NaN, "NaN").description("test");
      ESTest(Symbol("a"), "symbol").description("test");
      ESTest(() => {}, "function").description("test");
      ESTest(/a/, "regex").description("test");

      expect(publicMessage).toHaveBeenCalledTimes(0);
      expect(privateMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe("string", () => {
    describe("max", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").max(10);
        ESTest("foo", "string").max(3);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").max(-10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("min", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").min(1);
        ESTest("foo", "string").min(3);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").min(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("length", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").length(3);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").length(5);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("email", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foobar@gmail.com", "string").email();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("..john@gmail.com", "string").email();
        ESTest(".john@", "string").email();
        ESTest("john.com", "string").email();
        ESTest("john@", "string").email();
        ESTest("john doe@example.com", "string").email();
        ESTest("john.doe@@example.com", "string").email();
        ESTest("john.doe@example.c", "string").email();
        ESTest("john.doe@example", "string").email();
        ESTest("john.doe@example.com.", "string").email();
        ESTest("john.doe@com", "string").email();
        ESTest("john.doe@example..com", "string").email();
        ESTest("john.doe@example.x", "string").email();
        ESTest("john.doe@example#com", "string").email();
        ESTest("john..doe@example.com", "string").email();
        ESTest("john@doe@example.com", "string").email();

        expect(publicMessage).toHaveBeenCalledTimes(15);
        expect(privateMessage).toHaveBeenCalledTimes(15);
      });
    });

    describe("uuid", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("123e4567-e89b-12d3-a456-426614174000", "string").uuid();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("123e4567-e89b-12d3-a456", "string").uuid();
        ESTest("123e4567-e89b-12d3-a456-42661417400z", "string").uuid();
        ESTest("123e--4567-e89b-12d3-a456-426614174000", "string").uuid();
        ESTest("123e4567|e89b|12d3|a456|426614174000", "string").uuid();
        ESTest("123e4567-e89b-12d3-a456-4266141740000000", "string").uuid();
        ESTest("123e4567-e89b-12d3-a456-426g14174000", "string").uuid();
        ESTest("123e4567--e89b-12d3-a456-426614174000", "string").uuid();
        ESTest("123e4567-e89b-12d3-a456-@426614174000", "string").uuid();
        ESTest("123e/4567/e89b/12d3/a456/426614174000", "string").uuid();
        ESTest("123e4567-e89b-12d3-a456-42661417400", "string").uuid();

        expect(publicMessage).toHaveBeenCalledTimes(10);
        expect(privateMessage).toHaveBeenCalledTimes(10);
      });
    });

    describe("regex", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").regex(/foo/);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").regex(/aa/);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("base64", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQh", "string").base64();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQ@123", "string").base64();
        ESTest("SGVsbG8gd29ybGQ@!#", "string").base64();
        ESTest("SGVsbG8gd29yb", "string").base64();
        ESTest("SGVsbG8gd29ybGQ===", "string").base64();
        ESTest("SGVsbG8!d29ybGQ=", "string").base64();
        ESTest("U29mdHowUuY29tL2ZpbGU=", "string").base64();
        ESTest("SGVsbG8gd29ybGQ--", "string").base64();
        ESTest("SGVsbG8gd29ybGQ$%^&", "string").base64();
        ESTest("!@#SGVsbG8gd29ybGQ=", "string").base64();
        ESTest("==============", "string").base64();

        expect(publicMessage).toHaveBeenCalledTimes(10);
        expect(privateMessage).toHaveBeenCalledTimes(10);
      });
    });

    describe("ip", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("192.168.1.1", "string").ip();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("256.256.256.256", "string").ip();
        ESTest("192.168.1", "string").ip();
        ESTest("192.168.a.1", "string").ip();
        ESTest("192..168.1.1", "string").ip();
        ESTest("192.168.1.1.1", "string").ip();
        ESTest("2001:db8::a8::::4a:257:202", "string").ip();
        ESTest("2001:db8::a8:4a:257g:202", "string").ip();
        ESTest("2001:db8:abcd:1234:abcd:1234:abcd:1234:5678", "string").ip();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string").ip();
        ESTest("=========", "string").ip();

        expect(publicMessage).toHaveBeenCalledTimes(10);
        expect(privateMessage).toHaveBeenCalledTimes(10);
      });
    });
  });

  describe("number", () => {
    describe("less", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1, "number").less(10);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number").less(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("max", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1, "number").max(10);
        ESTest(1, "number").max(1);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number").max(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("greater", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").greater(10);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number").greater(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("min", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").min(10);
        ESTest(15, "number").min(15);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number").min(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("integer", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").integer();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number").integer();
        ESTest(-3.1, "number").integer();
        ESTest(1 / 2, "number").integer();
        ESTest(-1 / 2, "number").integer();

        expect(publicMessage).toHaveBeenCalledTimes(4);
        expect(privateMessage).toHaveBeenCalledTimes(4);
      });
    });

    describe("positive", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").positive();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-3.1, "number").positive();
        ESTest(-1 / 2, "number").positive();

        expect(publicMessage).toHaveBeenCalledTimes(2);
        expect(privateMessage).toHaveBeenCalledTimes(2);
      });
    });

    describe("negative", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-15, "number").negative();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number").negative();
        ESTest(1 / 2, "number").negative();

        expect(publicMessage).toHaveBeenCalledTimes(2);
        expect(privateMessage).toHaveBeenCalledTimes(2);
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").multiple(5);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").multiple(2);
        ESTest(15, "number").multiple(4);

        expect(publicMessage).toHaveBeenCalledTimes(2);
        expect(privateMessage).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("array", () => {
    describe("max", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").max(10);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").max(-10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe("min", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").min(1);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").min(10);

        expect(publicMessage).toHaveBeenCalledTimes(1);
        expect(privateMessage).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("edge case", () => {
    test("3rd argument is wrong", () => {
      const publicMessage = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const privateMessage = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest(1, "string", 123).max(10)).toBeTypeOf("object");

      expect(publicMessage).toHaveBeenCalledTimes(2);
      expect(privateMessage).toHaveBeenCalledTimes(2);
    });

    test("2nd & 3rd argument is wrong", () => {
      const publicMessage = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const privateMessage = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest(1, "strings", 123).max(10)).toBeTypeOf("object");

      expect(publicMessage).toHaveBeenCalledTimes(2);
      expect(privateMessage).toHaveBeenCalledTimes(2);
    });
  });
});

describe("unSafeESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(unSafeESTest("a", "string")).toBeTypeOf("object");
      expect(unSafeESTest(1, "number")).toBeTypeOf("object");
      expect(unSafeESTest([], "array")).toBeTypeOf("object");
      expect(unSafeESTest({}, "object")).toBeTypeOf("object");
      expect(unSafeESTest(true, "boolean")).toBeTypeOf("object");
      expect(unSafeESTest(new Date(), "date")).toBeTypeOf("object");
      expect(unSafeESTest(1n, "bigint")).toBeTypeOf("object");
      expect(unSafeESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(unSafeESTest(null, "null")).toBeTypeOf("object");
      expect(unSafeESTest(NaN, "NaN")).toBeTypeOf("object");
      expect(unSafeESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(unSafeESTest(() => {}, "function")).toBeTypeOf("object");
      expect(unSafeESTest(/a/, "regex")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest(/a/, "string")).toThrow();
      expect(() => unSafeESTest("a", "number")).toThrow();
      expect(() => unSafeESTest(1, "array")).toThrow();
      expect(() => unSafeESTest([], "object")).toThrow();
      expect(() => unSafeESTest({}, "boolean")).toThrow();
      expect(() => unSafeESTest(true, "date")).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint")).toThrow();
      expect(() => unSafeESTest(1n, "undefined")).toThrow();
      expect(() => unSafeESTest(undefined, "null")).toThrow();
      expect(() => unSafeESTest(null, "NaN")).toThrow();
      expect(() => unSafeESTest(NaN, "symbol")).toThrow();
      expect(() => unSafeESTest(Symbol("a"), "function")).toThrow();
      expect(() => unSafeESTest(() => {}, "regex")).toThrow();

      expect(() => unSafeESTest("a", "aa")).toThrow();
      expect(() => unSafeESTest([], [])).toThrow();
      expect(() => unSafeESTest({}, {})).toThrow();
      expect(() => unSafeESTest(true, true)).toThrow();
      expect(() => unSafeESTest(new Date(), new Date())).toThrow();
      expect(() => unSafeESTest(1n, 1n)).toThrow();
      expect(() => unSafeESTest(undefined, undefined)).toThrow();
      expect(() => unSafeESTest(null, null)).toThrow();
      expect(() => unSafeESTest(NaN, NaN)).toThrow();
      expect(() => unSafeESTest(Symbol("a"), Symbol("a"))).toThrow();
      expect(() =>
        unSafeESTest(
          () => {},
          () => {},
        ),
      ).toThrow();
      expect(() => unSafeESTest(/a/, /a/)).toThrow();
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(unSafeESTest("a", "string", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(1, "number", "foo")).toBeTypeOf("object");
      expect(unSafeESTest([], "array", "foo")).toBeTypeOf("object");
      expect(unSafeESTest({}, "object", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(true, "boolean", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(new Date(), "date", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(1n, "bigint", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(undefined, "undefined", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(null, "null", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(NaN, "NaN", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(Symbol("a", "foo"), "symbol", "foo")).toBeTypeOf(
        "object",
      );
      expect(unSafeESTest(() => {}, "function", "foo")).toBeTypeOf("object");
      expect(unSafeESTest(/a/, "regex", "foo")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest("a", "string", 1)).toThrow();
      expect(() => unSafeESTest(1, "number", 1)).toThrow();
      expect(() => unSafeESTest([], "array", [])).toThrow();
      expect(() => unSafeESTest({}, "object", {})).toThrow();
      expect(() => unSafeESTest(true, "boolean", true)).toThrow();
      expect(() => unSafeESTest(new Date(), "date", new Date())).toThrow();
      expect(() => unSafeESTest(1n, "bigint", 1n)).toThrow();
      expect(() => unSafeESTest(undefined, "undefined", 1)).toThrow();
      expect(() => unSafeESTest(null, "null", null)).toThrow();
      expect(() => unSafeESTest(NaN, "NaN", NaN)).toThrow();
      expect(() =>
        unSafeESTest(Symbol("a", "foo"), "symbol", Symbol("a", "foo")),
      ).toThrow();
      expect(() =>
        unSafeESTest(
          () => {},
          "function",
          () => {},
        ),
      ).toThrow();
      expect(() => unSafeESTest(/a/, "regex", /a/)).toThrow();
    });
  });

  describe("common", () => {
    test("description", () => {
      const publicMessage = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const privateMessage = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      unSafeESTest("a", "string").description("test");
      unSafeESTest(1, "number").description("test");
      unSafeESTest([], "array").description("test");
      unSafeESTest({}, "object").description("test");
      unSafeESTest(true, "boolean").description("test");
      unSafeESTest(new Date(), "date").description("test");
      unSafeESTest(1n, "bigint").description("test");
      unSafeESTest(undefined, "undefined").description("test");
      unSafeESTest(null, "null").description("test");
      unSafeESTest(NaN, "NaN").description("test");
      unSafeESTest(Symbol("a"), "symbol").description("test");
      unSafeESTest(() => {}, "function").description("test");
      unSafeESTest(/a/, "regex").description("test");

      expect(publicMessage).toHaveBeenCalledTimes(0);
      expect(privateMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe("string", () => {
    describe("max", () => {
      test("success", () => {
        unSafeESTest("foo", "string").max(10);
        unSafeESTest("foo", "string").max(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string").max(1)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        unSafeESTest("foo", "string").min(1);
        unSafeESTest("foo", "string").min(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string").min(10)).toThrowError();
      });
    });

    describe("length", () => {
      test("success", () => {
        unSafeESTest("foo", "string").length(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string").length(5)).toThrowError();
      });
    });

    describe("email", () => {
      test("success", () => {
        unSafeESTest("foobar@gmail.com", "string").email();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("..john@gmail.com", "string").email(),
        ).toThrowError();
        expect(() => unSafeESTest(".john@", "string").email()).toThrowError();
        expect(() => unSafeESTest("john.com", "string").email()).toThrowError();
        expect(() => unSafeESTest("john@", "string").email()).toThrowError();
        expect(() =>
          unSafeESTest("john doe@example.com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@@example.com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example.c", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example.com.", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example..com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example.x", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john.doe@example#com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john..doe@example.com", "string").email(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("john@doe@example.com", "string").email(),
        ).toThrowError();
      });
    });

    describe("uuid", () => {
      test("success", () => {
        unSafeESTest("123e4567-e89b-12d3-a456-426614174000", "string").uuid();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("123e4567-e89b-12d3-a456", "string").uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("123e4567-e89b-12d3-a456-42661417400z", "string").uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e--4567-e89b-12d3-a456-426614174000",
            "string",
          ).uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("123e4567|e89b|12d3|a456|426614174000", "string").uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-4266141740000000",
            "string",
          ).uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("123e4567-e89b-12d3-a456-426g14174000", "string").uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567--e89b-12d3-a456-426614174000",
            "string",
          ).uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-@426614174000",
            "string",
          ).uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e/4567/e89b/12d3/a456/426614174000",
            "string",
          ).uuid(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("123e4567-e89b-12d3-a456-42661417400", "string").uuid(),
        ).toThrowError();
      });
    });

    describe("regex", () => {
      test("success", () => {
        unSafeESTest("foo", "string").regex(/foo/);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string").regex(/aa/)).toThrowError();
      });
    });

    describe("base64", () => {
      test("success", () => {
        unSafeESTest("SGVsbG8gd29ybGQh", "string").base64();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ@123", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ@!#", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29yb", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ===", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8!d29ybGQ=", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("U29mdHowUuY29tL2ZpbGU=", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ--", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ$%^&", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("!@#SGVsbG8gd29ybGQ=", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("==============", "string").base64(),
        ).toThrowError();
      });
    });

    describe("ip", () => {
      test("success", () => {
        unSafeESTest("192.168.1.1", "string").ip();
        unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("256.256.256.256", "string").ip(),
        ).toThrowError();
        expect(() => unSafeESTest("192.168.1", "string").ip()).toThrowError();
        expect(() => unSafeESTest("192.168.a.1", "string").ip()).toThrowError();
        expect(() =>
          unSafeESTest("192..168.1.1", "string").ip(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1.1.1", "string").ip(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8::::4a:257:202", "string").ip(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202", "string").ip(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678",
            "string",
          ).ip(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string").ip(),
        ).toThrowError();
        expect(() => unSafeESTest("=========", "string").ip()).toThrowError();
      });
    });
  });

  describe("number", () => {
    describe("less", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1, "number").less(10);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number").less(10)).toThrow();
      });
    });

    describe("max", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1, "number").max(10);
        unSafeESTest(1, "number").max(1);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number").max(10)).toThrowError();
      });
    });

    describe("greater", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").greater(10);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number").greater(10)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").min(10);
        unSafeESTest(15, "number").min(15);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number").min(10)).toThrowError();
      });
    });

    describe("integer", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").integer();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3.1, "number").integer()).toThrowError();
        expect(() => unSafeESTest(-3.1, "number").integer()).toThrowError();
        expect(() => unSafeESTest(1 / 2, "number").integer()).toThrowError();
        expect(() => unSafeESTest(-1 / 2, "number").integer()).toThrowError();
      });
    });

    describe("positive", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").positive();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(-3.1, "number").positive()).toThrowError();
        expect(() => unSafeESTest(-1 / 2, "number").positive()).toThrowError();
      });
    });

    describe("negative", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(-15, "number").negative();

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3.1, "number").negative()).toThrowError();
        expect(() => unSafeESTest(1 / 2, "number").negative()).toThrowError();
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").multiple(5);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(15, "number").multiple(2)).toThrowError();
        expect(() => unSafeESTest(15, "number").multiple(4)).toThrowError();
      });
    });
  });

  describe("array", () => {
    describe("max", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array").max(10);
        unSafeESTest([1], "array").max(1);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array").max(-10)).toThrow();
      });
    });

    describe("min", () => {
      test("success", () => {
        const publicMessage = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});
        const privateMessage = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array").min(0);
        unSafeESTest([1], "array").min(1);

        expect(publicMessage).toHaveBeenCalledTimes(0);
        expect(privateMessage).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array").min(10)).toThrowError();
      });
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
      "Set 'globalThis.__ESCSS_ESTEST__.publicMessage' for customize message",
    );
  });
  test("isESTestDisabled", () => {
    expect(globalThis.__ESCSS_ESTEST__.isESTestDisabled).toBe(false);
  });
  test("ESTest can be disabled to get undefined", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;
    expect(ESTest(1, "string")).toBe(undefined);
  });
  test("ESTest can be disabled to get undefined - 2", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;
    expect(ESTest("1", "string")).toBe(undefined);
  });
  test("unSafeESTest should not be affected by isESTestDisabled (security)", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;
    expect(() => unSafeESTest(1, "string")).toThrow();
  });
});
