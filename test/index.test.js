import { describe, test, expect, vi } from "vitest";
import { ESTest, unSafeESTest } from "../src/index.js";

describe("ESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(ESTest(null)).toBeTypeOf("object");
      expect(ESTest("a", "string")).toBeTypeOf("object");
      expect(ESTest(1, "number")).toBeTypeOf("object");
      expect(ESTest([], "array")).toBeTypeOf("object");
      expect(ESTest({}, "object")).toBeTypeOf("object");
      expect(ESTest(true, "boolean")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(ESTest(null, "null")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function")).toBeTypeOf("object");
    });

    test("fail", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest()).toBeTypeOf("object");
      expect(ESTest().min(10)).toBeTypeOf("object");
      expect(ESTest(1, "1", 1).min(0)).toBeTypeOf("object");
      expect(ESTest(1, 1, "1").min(0)).toBeTypeOf("object");
      expect(ESTest(1, 1, 1).min(0)).toBeTypeOf("object");
      expect(ESTest(/a/, "string")).toBeTypeOf("object");
      expect(ESTest("a", "number")).toBeTypeOf("object");
      expect(ESTest(NaN, "number")).toBeTypeOf("object");
      expect(ESTest(1, "array")).toBeTypeOf("object");
      expect(ESTest([], "object")).toBeTypeOf("object");
      expect(ESTest({}, "boolean")).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint")).toBeTypeOf("object");
      expect(ESTest(1n, "undefined")).toBeTypeOf("object");
      expect(ESTest(undefined, "null")).toBeTypeOf("object");
      expect(ESTest(NaN, "symbol")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "function")).toBeTypeOf("object");

      expect(message).toHaveBeenCalledTimes(16);
      expect(information).toHaveBeenCalledTimes(16);
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string", "1")).toBeTypeOf("object");
      expect(ESTest(1, "number", "1")).toBeTypeOf("object");
      expect(ESTest([], "array", "1")).toBeTypeOf("object");
      expect(ESTest({}, "object", "1")).toBeTypeOf("object");
      expect(ESTest(true, "boolean", "1")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", "1")).toBeTypeOf("object");
      expect(ESTest(null, "null", "1")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol", "1")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function", "1")).toBeTypeOf("object");
    });

    test("fail", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest("a", "string", 1)).toBeTypeOf("object");
      expect(ESTest(1, "number", 1)).toBeTypeOf("object");
      expect(ESTest([], "array", 1)).toBeTypeOf("object");
      expect(ESTest({}, "object", 1)).toBeTypeOf("object");
      expect(ESTest(true, "boolean", 1)).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", 1)).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", 1)).toBeTypeOf("object");
      expect(ESTest(null, "null", 1)).toBeTypeOf("object");
      expect(ESTest(Symbol("1"), "symbol", 1)).toBeTypeOf("object");
      expect(ESTest(function sum() {}, "function", 1)).toBeTypeOf("object");

      expect(message).toHaveBeenCalledTimes(26);
      expect(information).toHaveBeenCalledTimes(26);
    });
  });

  describe("common", () => {
    test("description", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      ESTest("a", "string").describe("test");
      ESTest(1, "number").describe("test");
      ESTest([], "array").describe("test");
      ESTest({}, "object").describe("test");
      ESTest(true, "boolean").describe("test");
      ESTest(1n, "bigint").describe("test");
      ESTest(undefined, "undefined").describe("test");
      ESTest(null, "null").describe("test");
      ESTest(Symbol("a"), "symbol").describe("test");
      ESTest(() => {}, "function").describe("test");

      expect(message).toHaveBeenCalledTimes(26);
      expect(information).toHaveBeenCalledTimes(26);
    });
  });

  describe("string", () => {
    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").max(10);
        ESTest("foo", "string").max(3);

        expect(message).toHaveBeenCalledTimes(26);
        expect(information).toHaveBeenCalledTimes(26);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").max(-10);

        expect(message).toHaveBeenCalledTimes(27);
        expect(information).toHaveBeenCalledTimes(27);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").min(1);
        ESTest("foo", "string").min(3);

        expect(message).toHaveBeenCalledTimes(27);
        expect(information).toHaveBeenCalledTimes(27);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").min(10);

        expect(message).toHaveBeenCalledTimes(28);
        expect(information).toHaveBeenCalledTimes(28);
      });
    });

    describe("length", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").length(3);

        expect(message).toHaveBeenCalledTimes(28);
        expect(information).toHaveBeenCalledTimes(28);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string").length(5);

        expect(message).toHaveBeenCalledTimes(29);
        expect(information).toHaveBeenCalledTimes(29);
      });
    });

    describe("email", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foobar@gmail.com", "string").email();

        ESTest("john.doe+newsletter@example-domain.com", "string").email(
          "html5Email",
        );

        ESTest("user.name+tag+filter@sub.example-domain.co.uk", "string").email(
          "rfc5322Email",
        );

        ESTest("user.name123@example-domain.com", "string").email(
          "unicodeEmail",
        );

        expect(message).toHaveBeenCalledTimes(29);
        expect(information).toHaveBeenCalledTimes(29);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("..john@gmail.com", "string").email();
        ESTest(".john@", "string").email();
        ESTest("john.com", "string").email();
        ESTest("john@", "string").email();
        ESTest("john doe@example.com", "string").email();

        ESTest(" name@example.com", "string").email("html5Email");
        ESTest("user@-example.com", "string").email("html5Email");
        ESTest("user@@example.com", "string").email("html5Email");
        ESTest("user@example..com", "string").email("html5Email");
        ESTest("user@.example.com", "string").email("html5Email");

        ESTest("#@%^%#$#.com", "string").email("rfc5322Email");
        ESTest("plainApples", "string").email("rfc5322Email");
        ESTest("@example.com", "string").email("rfc5322Email");
        ESTest("test@example", "string").email("rfc5322Email");
        ESTest("test@.abcde", "string").email("rfc5322Email");

        ESTest(
          "too_long_local_part_this_is_more_than_sixty_four_characters_to_test_the_limit@example.com",
          "string",
        ).email("unicodeEmail");
        ESTest(
          "test@too_long_domain_part_this_is_definitely_more_than_two_hundred_fifty_five_characters_to_test_the_limit_and_it_will_fail_because_of_its_excessive_length_which_is_not_allowed_by_the_regular_expression_for_email_validation_as_it_exceeds_the_specified_maximum_length_limit.com",
          "string",
        ).email("unicodeEmail");
        ESTest("test with spaces@example.com", "string").email("unicodeEmail");
        ESTest("test@example.com test", "string").email("unicodeEmail");
        ESTest("test!example.com", "string").email("unicodeEmail");

        expect(message).toHaveBeenCalledTimes(49);
        expect(information).toHaveBeenCalledTimes(49);
      });
    });

    describe("uuid", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
        ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();

        expect(message).toHaveBeenCalledTimes(49);
        expect(information).toHaveBeenCalledTimes(49);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("123e4567|e89b|12d3|a456|426614174000", "string").uuid4();
        ESTest("123e4567-e89b-12d3-a456-426g14174000", "string").uuid4();
        ESTest("123e4567--e89b-12d3-a456-426614174000", "string").uuid4();
        ESTest("123e4567-e89b-12d3-a456-@426614174000", "string").uuid4();
        ESTest("123e/4567/e89b/12d3/a456/426614174000", "string").uuid4();

        ESTest("0189c7e4-3b8a-4e3b-8291-4e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-c291-4e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c", "string").uuid7();
        ESTest("0189c7e43b8a7e3b82914e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-z291-4e6f2b1a4c7d", "string").uuid7();

        expect(message).toHaveBeenCalledTimes(59);
        expect(information).toHaveBeenCalledTimes(59);
      });
    });

    describe("base64", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQh", "string").base64();

        ESTest("Zm9vYmFyXzEyMw", "string").base64url();

        expect(message).toHaveBeenCalledTimes(59);
        expect(information).toHaveBeenCalledTimes(59);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQ@!#", "string").base64();
        ESTest("SGVsbG8gd29ybGQ===", "string").base64();
        ESTest("SGVsbG8gd29ybGQ--", "string").base64();
        ESTest("!@#SGVsbG8gd29ybGQ=", "string").base64();
        ESTest("SGVsbG8gd29ybGQ$%^&", "string").base64();

        ESTest("SGVsbG8gV29ybGQ=", "string").base64url();
        ESTest("invalid+char/example", "string").base64url();
        ESTest("another=fail", "string").base64url();
        ESTest("你好世界", "string").base64url();
        ESTest("padded==", "string").base64url();

        expect(message).toHaveBeenCalledTimes(69);
        expect(information).toHaveBeenCalledTimes(69);
      });
    });

    describe("ip", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("192.168.1.1", "string").ip4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();

        expect(message).toHaveBeenCalledTimes(69);
        expect(information).toHaveBeenCalledTimes(69);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("256.256.256.256", "string").ip4();
        ESTest("192.168.1", "string").ip4();
        ESTest("192.168.a.1", "string").ip4();
        ESTest("192..168.1.1", "string").ip4();
        ESTest("192.168.1.1.1", "string").ip4();
        ESTest("2001:db8::a8::::4a:257:202", "string").ip6();
        ESTest("2001:db8::a8:4a:257g:202", "string").ip6();
        ESTest("2001:db8:abcd:1234:abcd:1234:abcd:1234:5678", "string").ip6();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string").ip6();

        expect(message).toHaveBeenCalledTimes(78);
        expect(information).toHaveBeenCalledTimes(78);
      });
    });

    describe("cidr", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("192.168.1.1/16", "string").cidr4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();

        expect(message).toHaveBeenCalledTimes(78);
        expect(information).toHaveBeenCalledTimes(78);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("256.256.256.256/255", "string").cidr4();
        ESTest("192.168.1+16", "string").cidr4();
        ESTest("192.168.a.1-16", "string").cidr4();
        ESTest("192..168.1.1_16", "string").cidr4();
        ESTest("192.168.1.1.1/-16", "string").cidr4();
        ESTest("2001:db8::a8::::4a:257:202/255", "string").cidr6();
        ESTest("2001:db8::a8:4a:257g:202+16", "string").cidr6();
        ESTest("2001:db8::a8:4a:257g:202-16", "string").cidr6();
        ESTest(
          "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678_16",
          "string",
        ).cidr6();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678/-16", "string").cidr6();

        expect(message).toHaveBeenCalledTimes(88);
        expect(information).toHaveBeenCalledTimes(88);
      });
    });

    describe("emoji", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("🌀", "string").emoji();

        expect(message).toHaveBeenCalledTimes(88);
        expect(information).toHaveBeenCalledTimes(88);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("_1", "string").emoji();

        expect(message).toHaveBeenCalledTimes(89);
        expect(information).toHaveBeenCalledTimes(89);
      });
    });

    describe("e164", () => {
      test("success", () => {
        ESTest("+886912345678", "string").e164();
        ESTest("+8860912345678", "string").e164();
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("0912-345-678", "string").e164();
        ESTest("0912345678", "string").e164();
        ESTest("886912345678", "string").e164();
        ESTest("8860912345678", "string").e164();

        expect(message).toHaveBeenCalledTimes(93);
        expect(information).toHaveBeenCalledTimes(93);
      });
    });

    describe("lowercase", () => {
      test("success", () => {
        ESTest("foobar", "string").lowercase();
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("FOOBAR", "string").lowercase();
        ESTest("FooBar", "string").lowercase();
        ESTest("FoOBaR", "string").lowercase();
        ESTest("_FooBar", "string").lowercase();
        ESTest("$FooBar", "string").lowercase();

        expect(message).toHaveBeenCalledTimes(98);
        expect(information).toHaveBeenCalledTimes(98);
      });
    });
  });

  describe("number", () => {
    describe("less", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1, "number").less(10);

        expect(message).toHaveBeenCalledTimes(98);
        expect(information).toHaveBeenCalledTimes(98);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number").less(10);

        expect(message).toHaveBeenCalledTimes(99);
        expect(information).toHaveBeenCalledTimes(99);
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1, "number").max(10);
        ESTest(1, "number").max(1);

        expect(message).toHaveBeenCalledTimes(99);
        expect(information).toHaveBeenCalledTimes(99);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number").max(10);

        expect(message).toHaveBeenCalledTimes(100);
        expect(information).toHaveBeenCalledTimes(100);
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(100);
        expect(information).toHaveBeenCalledTimes(100);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(101);
        expect(information).toHaveBeenCalledTimes(101);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").min(10);
        ESTest(15, "number").min(15);

        expect(message).toHaveBeenCalledTimes(101);
        expect(information).toHaveBeenCalledTimes(101);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number").min(10);

        expect(message).toHaveBeenCalledTimes(102);
        expect(information).toHaveBeenCalledTimes(102);
      });
    });

    describe("integer", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").integer();

        expect(message).toHaveBeenCalledTimes(102);
        expect(information).toHaveBeenCalledTimes(102);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number").integer();
        ESTest(-3.1, "number").integer();
        ESTest(1 / 2, "number").integer();
        ESTest(-1 / 2, "number").integer();

        expect(message).toHaveBeenCalledTimes(106);
        expect(information).toHaveBeenCalledTimes(106);
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").positive();

        expect(message).toHaveBeenCalledTimes(106);
        expect(information).toHaveBeenCalledTimes(106);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-3.1, "number").positive();

        expect(message).toHaveBeenCalledTimes(107);
        expect(information).toHaveBeenCalledTimes(107);
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-15, "number").negative();

        expect(message).toHaveBeenCalledTimes(107);
        expect(information).toHaveBeenCalledTimes(107);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number").negative();

        expect(message).toHaveBeenCalledTimes(108);
        expect(information).toHaveBeenCalledTimes(108);
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").multiple(5);

        expect(message).toHaveBeenCalledTimes(108);
        expect(information).toHaveBeenCalledTimes(108);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number").multiple(2);

        expect(message).toHaveBeenCalledTimes(109);
        expect(information).toHaveBeenCalledTimes(109);
      });
    });
  });

  describe("array", () => {
    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").max(10);

        expect(message).toHaveBeenCalledTimes(109);
        expect(information).toHaveBeenCalledTimes(109);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").max(-10);

        expect(message).toHaveBeenCalledTimes(110);
        expect(information).toHaveBeenCalledTimes(110);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").min(1);

        expect(message).toHaveBeenCalledTimes(110);
        expect(information).toHaveBeenCalledTimes(110);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").min(10);

        expect(message).toHaveBeenCalledTimes(111);
        expect(information).toHaveBeenCalledTimes(111);
      });
    });

    describe("length", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").length(1);

        expect(message).toHaveBeenCalledTimes(111);
        expect(information).toHaveBeenCalledTimes(111);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array").length(3);

        expect(message).toHaveBeenCalledTimes(112);
        expect(information).toHaveBeenCalledTimes(112);
      });
    });

    describe("schema", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const arr_obj = [
          {
            a: 1,
            b: 1,

            info: {
              x: 1,
              y: 1,
            },
          },
        ];

        const arr_arr = [
          {
            a: 1,
            b: 1,

            info: [
              {
                x: 1,
                y: 1,
              },
            ],
          },
        ];

        ESTest(arr_obj, "array").schema({
          a: "number",
          "b?": "number",
          "c?": "number",
          info: [
            {
              x: "number",
              "y?": "number",
              "z?": "number",
            },
          ],
        });

        ESTest(arr_arr, "array").schema({
          a: "number",
          "b?": "number",
          "c?": "number",
          info: {
            x: "number",
            "y?": "number",
            "z?": "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(112);
        expect(information).toHaveBeenCalledTimes(112);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: {},
            },
          ],
          "array",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        ESTest(
          [
            {
              name: "string",
              age: 1,
              info: {
                a: 1,
                b: 1,
                c: 1,
              },
            },
          ],
          "array",
        ).schema({});

        ESTest(null, "array").schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest([], "array").schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest([null, 123], "array").schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: [
                {
                  a: true,
                  b: true,
                },
              ],
            },
          ],
          "array",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
            },
          ],
        });

        ESTest(
          [
            {
              info: [
                {
                  a: true,
                  b: 1,
                },
              ],
            },
          ],
          "array",
        ).schema({
          info: [
            {
              "a?": "number",
              "b?": "number",
              "c?": "number",
            },
          ],
        });

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: [],
            },
          ],
          "array",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          [
            {
              name: "string",
              age: 1,
              info: [
                {
                  a: 1,
                  b: 1,
                  c: 1,
                },
              ],
            },
          ],
          "array",
        ).schema({});

        ESTest(
          {
            name: "1",
            age: 1,
            info: [
              {
                a: 1,
                b: 1,
                c: 1,
              },
            ],
          },
          "array",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(null, "array").schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: {
                a: true,
                b: true,
              },
            },
          ],
          "array",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
          },
        });

        ESTest(
          [
            {
              info: {
                a: true,
                b: 1,
              },
            },
          ],
          "array",
        ).schema({
          info: {
            "a?": "number",
            "b?": "number",
            "c?": "number",
          },
        });

        ESTest([123, true], "array").schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        ESTest(123, "array").schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(132);
        expect(information).toHaveBeenCalledTimes(132);
      });
    });
  });

  describe("object", () => {
    describe("schema", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(
          {
            name: "1",
            age: 1,
            info: [
              {
                a: 1,
                b: 1,
                c: 1,
              },
            ],
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: {
              a: 1,
              b: 1,
              c: 1,
            },
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(132);
        expect(information).toHaveBeenCalledTimes(132);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(null, "object").schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: [
              {
                a: true,
                b: true,
              },
            ],
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
            },
          ],
        });

        ESTest(
          {
            info: [
              {
                a: true,
                b: 1,
              },
            ],
          },
          "object",
        ).schema({
          info: [
            {
              "a?": "number",
              "b?": "number",
              "c?": "number",
            },
          ],
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: [{}],
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: [],
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(
          {
            name: "string",
            age: 1,
            info: [
              {
                a: 1,
                b: 1,
                c: 1,
              },
            ],
          },
          "object",
        ).schema({});

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: {
                a: 1,
                b: 1,
                c: 1,
              },
            },
          ],
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        ESTest(null, "object").schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: {
              a: true,
              b: true,
            },
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
          },
        });

        ESTest(
          {
            info: {
              a: true,
              b: 1,
            },
          },
          "object",
        ).schema({
          info: {
            "a?": "number",
            "b?": "number",
            "c?": "number",
          },
        });

        ESTest(
          {
            name: "1",
            age: 1,
            info: {},
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        ESTest(
          {
            name: "string",
            age: 1,
            info: {
              a: 1,
              b: 1,
              c: 1,
            },
          },
          "object",
        ).schema({});

        ESTest(
          [
            {
              name: "1",
              age: 1,
              info: {
                a: 1,
                b: 1,
                c: 1,
              },
            },
          ],
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(151);
        expect(information).toHaveBeenCalledTimes(151);
      });
    });

    describe("refine", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          password: "1234",
          confirmPassword: "1234",
        };

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine(
            (val) => val.password === val.confirmPassword,
            "password mismatch",
          );

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword);

        expect(message).toHaveBeenCalledTimes(151);
        expect(information).toHaveBeenCalledTimes(151);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          password: "1234",
          confirmPassword: "xyz",
        };

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine(() => "over");

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine(() => "over", 123);

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine(() => "over", {
            message: 123,
          });

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword);

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword, 1);

        ESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword, true);

        expect(message).toHaveBeenCalledTimes(157);
        expect(information).toHaveBeenCalledTimes(157);
      });
    });

    describe("superRefine", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          name: "mike",
          checkName: "mike",
          password: "1234",
          confirmPassword: "1234",
        };

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue("name mismatch");
            }

            if (val.password !== val.confirmPassword) {
              ctx.addIssue("password mismatch");
            }
          });

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue("name mismatch");
            }

            if (val.password !== val.confirmPassword) {
              ctx.addIssue("password mismatch");
            }
          });

        expect(message).toHaveBeenCalledTimes(157);
        expect(information).toHaveBeenCalledTimes(157);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          name: "mike",
          checkName: "leo",
          password: "1234",
          confirmPassword: "5678",
        };

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue("name mismatch");
            }

            if (val.password !== val.confirmPassword) {
              ctx.addIssue("password mismatch");
            }
          });

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue(1);
            }

            if (val.password !== val.confirmPassword) {
              ctx.addIssue(true);
            }
          });

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue("name mismatch");
            }
          });

        ESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name !== val.checkName) {
              ctx.addIssue({});
            }
          });

        expect(message).toHaveBeenCalledTimes(163);
        expect(information).toHaveBeenCalledTimes(163);
      });
    });
  });

  describe("bigint", () => {
    describe("less", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(163);
        expect(information).toHaveBeenCalledTimes(163);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(164);
        expect(information).toHaveBeenCalledTimes(164);
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1n, "bigint").max(10n);
        ESTest(1n, "bigint").max(1n);

        expect(message).toHaveBeenCalledTimes(164);
        expect(information).toHaveBeenCalledTimes(164);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20n, "bigint").max(10n);

        expect(message).toHaveBeenCalledTimes(165);
        expect(information).toHaveBeenCalledTimes(165);
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(165);
        expect(information).toHaveBeenCalledTimes(165);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(166);
        expect(information).toHaveBeenCalledTimes(166);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint").min(10n);
        ESTest(15n, "bigint").min(15n);

        expect(message).toHaveBeenCalledTimes(166);
        expect(information).toHaveBeenCalledTimes(166);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint").min(10n);

        expect(message).toHaveBeenCalledTimes(167);
        expect(information).toHaveBeenCalledTimes(167);
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(167);
        expect(information).toHaveBeenCalledTimes(167);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-3n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(168);
        expect(information).toHaveBeenCalledTimes(168);
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-15n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(168);
        expect(information).toHaveBeenCalledTimes(168);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(169);
        expect(information).toHaveBeenCalledTimes(169);
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint").multiple(5n);

        expect(message).toHaveBeenCalledTimes(169);
        expect(information).toHaveBeenCalledTimes(169);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint").multiple(2n);

        expect(message).toHaveBeenCalledTimes(170);
        expect(information).toHaveBeenCalledTimes(170);
      });
    });
  });
});

describe("unSafeESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(ESTest(null)).toBeTypeOf("object");
      expect(ESTest("a", "string")).toBeTypeOf("object");
      expect(ESTest(1, "number")).toBeTypeOf("object");
      expect(ESTest([], "array")).toBeTypeOf("object");
      expect(ESTest({}, "object")).toBeTypeOf("object");
      expect(ESTest(true, "boolean")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(ESTest(null, "null")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest()).toThrow();
      expect(() => unSafeESTest().min(10)).toThrow();
      expect(() => unSafeESTest(1, "1", 1).min(0)).toThrow();
      expect(() => unSafeESTest(1, 1, "1").min(0)).toThrow();
      expect(() => unSafeESTest(1, 1, 1).min(0)).toThrow();
      expect(() => unSafeESTest()).toThrow();
      expect(() => unSafeESTest(undefined)).toThrow();
      expect(() => unSafeESTest(/a/, "string")).toThrow();
      expect(() => unSafeESTest("a", "number")).toThrow();
      expect(() => unSafeESTest(NaN, "number")).toThrow();
      expect(() => unSafeESTest(1, "array")).toThrow();
      expect(() => unSafeESTest([], "object")).toThrow();
      expect(() => unSafeESTest({}, "boolean")).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint")).toThrow();
      expect(() => unSafeESTest(1n, "undefined")).toThrow();
      expect(() => unSafeESTest(undefined, "null")).toThrow();
      expect(() => unSafeESTest(NaN, "symbol")).toThrow();
      expect(() => unSafeESTest(Symbol("a"), "function")).toThrow();
      expect(() => unSafeESTest(NaN, "number")).toThrow();
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string", "1")).toBeTypeOf("object");
      expect(ESTest(1, "number", "1")).toBeTypeOf("object");
      expect(ESTest([], "array", "1")).toBeTypeOf("object");
      expect(ESTest({}, "object", "1")).toBeTypeOf("object");
      expect(ESTest(true, "boolean", "1")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", "1")).toBeTypeOf("object");
      expect(ESTest(null, "null", "1")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol", "1")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function", "1")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest(/a/, "string", 1)).toThrow();
      expect(() => unSafeESTest("a", "number", 1)).toThrow();
      expect(() => unSafeESTest(1, "array", 1)).toThrow();
      expect(() => unSafeESTest([], "object", 1)).toThrow();
      expect(() => unSafeESTest({}, "boolean", 1)).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint", 1)).toThrow();
      expect(() => unSafeESTest(1n, "undefined", 1)).toThrow();
      expect(() => unSafeESTest(undefined, "null", 1)).toThrow();
      expect(() => unSafeESTest(NaN, "symbol", 1)).toThrow();
      expect(() => unSafeESTest(Symbol("a"), "function", 1)).toThrow();
    });
  });

  describe("common", () => {
    test("description", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      unSafeESTest("a", "string").describe("test");
      unSafeESTest(1, "number").describe("test");
      unSafeESTest([], "array").describe("test");
      unSafeESTest({}, "object").describe("test");
      unSafeESTest(true, "boolean").describe("test");
      unSafeESTest(1n, "bigint").describe("test");
      unSafeESTest(undefined, "undefined").describe("test");
      unSafeESTest(null, "null").describe("test");
      unSafeESTest(Symbol("a"), "symbol").describe("test");
      unSafeESTest(() => {}, "function").describe("test");

      expect(message).toHaveBeenCalledTimes(171);
      expect(information).toHaveBeenCalledTimes(171);
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

        unSafeESTest("john.doe+newsletter@example-domain.com", "string").email(
          "html5Email",
        );

        unSafeESTest(
          "user.name+tag+filter@sub.example-domain.co.uk",
          "string",
        ).email("rfc5322Email");

        unSafeESTest("user.name123@example-domain.com", "string").email(
          "unicodeEmail",
        );
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
          unSafeESTest(" name@example.com", "string").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@-example.com", "string").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@@example.com", "string").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@example..com", "string").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@.example.com", "string").email("html5Email"),
        ).toThrowError();

        expect(() =>
          unSafeESTest("#@%^%#$#.com", "string").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("plainApples", "string").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("@example.com", "string").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@example", "string").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@.abcde", "string").email("rfc5322Email"),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            "too_long_local_part_this_is_more_than_sixty_four_characters_to_test_the_limit@example.com",
            "string",
          ).email("unicodeEmail"),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "test@too_long_domain_part_this_is_definitely_more_than_two_hundred_fifty_five_characters_to_test_the_limit_and_it_will_fail_because_of_its_excessive_length_which_is_not_allowed_by_the_regular_expression_for_email_validation_as_it_exceeds_the_specified_maximum_length_limit.com",
            "string",
          ).email("unicodeEmail"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test with spaces@example.com", "string").email(
            "unicodeEmail",
          ),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@example.com test", "string").email("unicodeEmail"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test!example.com", "string").email("unicodeEmail"),
        ).toThrowError();
      });
    });

    describe("uuid", () => {
      test("success", () => {
        unSafeESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
        unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest(
            "123e4567|e89b|12d3|a456|426614174000",
            "string",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-426g14174000",
            "string",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567--e89b-12d3-a456-426614174000",
            "string",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-@426614174000",
            "string",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e/4567/e89b/12d3/a456/426614174000",
            "string",
          ).uuid4(),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            "0189c7e4-3b8a-4e3b-8291-4e6f2b1a4c7d",
            "string",
          ).uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "0189c7e4-3b8a-7e3b-c291-4e6f2b1a4c7d",
            "string",
          ).uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c", "string").uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0189c7e43b8a7e3b82914e6f2b1a4c7d", "string").uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "0189c7e4-3b8a-7e3b-z291-4e6f2b1a4c7d",
            "string",
          ).uuid7(),
        ).toThrowError();
      });
    });

    describe("base64", () => {
      test("success", () => {
        unSafeESTest("SGVsbG8gd29ybGQh", "string").base64();

        unSafeESTest("Zm9vYmFyXzEyMw", "string").base64url();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ@!#", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ===", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ--", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("!@#SGVsbG8gd29ybGQ=", "string").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ$%^&", "string").base64(),
        ).toThrowError();

        expect(() =>
          unSafeESTest("SGVsbG8gV29ybGQ=", "string").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("invalid+char/example", "string").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("another=fail", "string").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("你好世界", "string").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("padded==", "string").base64url(),
        ).toThrowError();
      });
    });

    describe("ip", () => {
      test("success", () => {
        unSafeESTest("192.168.1.1", "string").ip4();
        unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678",
            "string",
          ).ip6(),
        ).toThrowError();

        expect(() =>
          unSafeESTest("256.256.256.256", "string").ip4(),
        ).toThrowError();
        expect(() => unSafeESTest("192.168.1", "string").ip4()).toThrowError();
        expect(() =>
          unSafeESTest("192.168.a.1", "string").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192..168.1.1", "string").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1.1.1", "string").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8::::4a:257:202", "string").ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202", "string").ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678",
            "string",
          ).ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string").ip6(),
        ).toThrowError();
      });
    });

    describe("cidr", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest("192.168.1.1/16", "string").cidr4();
        unSafeESTest(
          "2001:0db8:85a3:0000:0000:8a2e:0370:7334/16",
          "string",
        ).cidr6();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("256.256.256.256/255", "string").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1+16", "string").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.a.1-16", "string").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192..168.1.1_16", "string").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1.1.1/-16", "string").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8::::4a:257:202/255", "string").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202+16", "string").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202-16", "string").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678_16",
            "string",
          ).cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:xyz:1234:abcd:5678/-16",
            "string",
          ).cidr6(),
        ).toThrowError();
      });
    });

    describe("emoji", () => {
      test("success", () => {
        unSafeESTest("🌀", "string").emoji();
      });

      test("fail", () => {
        expect(() => unSafeESTest("_1", "string").emoji()).toThrowError();
      });
    });

    describe("e164", () => {
      test("success", () => {
        unSafeESTest("+886912345678", "string").e164();
        unSafeESTest("+8860912345678", "string").e164();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("0912-345-678", "string").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0912345678", "string").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("886912345678", "string").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("8860912345678", "string").e164(),
        ).toThrowError();
      });
    });

    describe("lowercase", () => {
      test("success", () => {
        unSafeESTest("foobar", "string").lowercase();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("FOOBAR", "string").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("FooBar", "string").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("FoOBaR", "string").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("_FooBar", "string").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("$FooBar", "string").lowercase(),
        ).toThrowError();
      });
    });
  });

  describe("number", () => {
    describe("less", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1, "number").less(10);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number").less(10)).toThrow();
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1, "number").max(10);
        unSafeESTest(1, "number").max(1);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number").max(10)).toThrowError();
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number").greater(10)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").min(10);
        unSafeESTest(15, "number").min(15);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number").min(10)).toThrowError();
      });
    });

    describe("integer", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").integer();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
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
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").positive();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(-3.1, "number").positive()).toThrowError();
        expect(() => unSafeESTest(-1 / 2, "number").positive()).toThrowError();
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(-15, "number").negative();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3.1, "number").negative()).toThrowError();
        expect(() => unSafeESTest(1 / 2, "number").negative()).toThrowError();
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number").multiple(5);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
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
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array").max(10);
        unSafeESTest([1], "array").max(1);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array").max(-10)).toThrow();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array").min(0);
        unSafeESTest([1], "array").min(1);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array").min(10)).toThrowError();
      });
    });

    describe("length", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array").length(1);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array").length(3)).toThrowError();
      });
    });

    describe("schema", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(
          [
            {
              a: 1,
              b: 1,

              info: {
                x: 1,
                y: 1,
              },
            },
          ],
          "array",
        ).schema({
          a: "number",
          "b?": "number",
          "c?": "number",
          info: [
            {
              x: "number",
              "y?": "number",
              "z?": "number",
            },
          ],
        });

        unSafeESTest(
          [
            {
              a: 1,
              b: 1,

              info: [
                {
                  x: 1,
                  y: 1,
                },
              ],
            },
          ],
          "array",
        ).schema({
          a: "number",
          "b?": "number",
          "c?": "number",
          info: {
            x: "number",
            "y?": "number",
            "z?": "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: {},
              },
            ],
            "array",
          ).schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(null, "array").schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest([], "array").schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest([null, 123], "array").schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: [
                  {
                    a: true,
                    b: true,
                  },
                ],
              },
            ],
            "array",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                info: [
                  {
                    a: true,
                    b: 1,
                  },
                ],
              },
            ],
            "array",
          ).schema({
            info: [
              {
                "a?": "number",
                "b?": "number",
                "c?": "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: [],
              },
            ],
            "array",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: [
                {
                  a: 1,
                  b: 1,
                  c: 1,
                },
              ],
            },
            "array",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(null, "array").schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: {
                  a: true,
                  b: true,
                },
              },
            ],
            "array",
          ).schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                info: {
                  a: true,
                  b: 1,
                },
              },
            ],
            "array",
          ).schema({
            info: {
              "a?": "number",
              "b?": "number",
              "c?": "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest([123, true], "array").schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(123, "array").schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();
      });
    });
  });

  describe("object", () => {
    describe("schema", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(
          {
            name: "1",
            age: 1,
            info: [
              {
                a: 1,
                b: 1,
                c: 1,
              },
            ],
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: [
            {
              a: "number",
              b: "number",
              c: "number",
            },
          ],
        });

        unSafeESTest(
          {
            name: "1",
            age: 1,
            info: {
              a: 1,
              b: 1,
              c: 1,
            },
          },
          "object",
        ).schema({
          name: "string",
          age: "number",
          info: {
            a: "number",
            b: "number",
            c: "number",
          },
        });

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest(null, "object").schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: [
                {
                  a: true,
                  b: true,
                },
              ],
            },
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              info: [
                {
                  a: true,
                  b: 1,
                },
              ],
            },
            "object",
          ).schema({
            info: [
              {
                "a?": "number",
                "b?": "number",
                "c?": "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: [{}],
            },
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: [],
            },
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: {
                  a: 1,
                  b: 1,
                  c: 1,
                },
              },
            ],
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: [
              {
                a: "number",
                b: "number",
                c: "number",
              },
            ],
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(null, "object").schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: {
                a: true,
                b: true,
              },
            },
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              info: {
                a: true,
                b: 1,
              },
            },
            "object",
          ).schema({
            info: {
              "a?": "number",
              "b?": "number",
              "c?": "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            {
              name: "1",
              age: 1,
              info: {},
            },
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(
            [
              {
                name: "1",
                age: 1,
                info: {
                  a: 1,
                  b: 1,
                  c: 1,
                },
              },
            ],
            "object",
          ).schema({
            name: "string",
            age: "number",
            info: {
              a: "number",
              b: "number",
              c: "number",
            },
          }),
        ).toThrowError();
      });
    });

    describe("refine", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          password: "1234",
          confirmPassword: "1234",
        };

        unSafeESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword, "test");

        unSafeESTest(data, "object")
          .schema({
            password: "string",
            confirmPassword: "string",
          })
          .refine((val) => val.password === val.confirmPassword);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        const data = {
          password: "1234",
          confirmPassword: "xyz",
        };

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine(() => "over"),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine(() => "over", 123),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine(() => "over", {
              message: 123,
            }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine((val) => val.password === val.confirmPassword),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine((val) => val.password === val.confirmPassword, 1),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              password: "string",
              confirmPassword: "string",
            })
            .refine((val) => val.password === val.confirmPassword, {
              message: 1,
            }),
        ).toThrowError();
      });
    });

    describe("superRefine", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        const data = {
          name: "mike",
          checkName: "leo",
          password: "1234",
          confirmPassword: "5678",
        };

        unSafeESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name === val.checkName) {
              ctx.addIssue("name mismatch");
            }

            if (val.password === val.confirmPassword) {
              ctx.addIssue("password mismatch");
            }
          });

        unSafeESTest(data, "object")
          .schema({
            name: "string",
            checkName: "string",
            password: "string",
            confirmPassword: "string",
          })
          .superRefine((val, ctx) => {
            if (val.name === val.checkName) {
              ctx.addIssue("name mismatch");
            }
          });

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        const data = {
          name: "mike",
          checkName: "leo",
          password: "1234",
          confirmPassword: "5678",
        };

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              name: "string",
              checkName: "string",
              password: "string",
              confirmPassword: "string",
            })
            .superRefine((val, ctx) => {
              if (val.name !== val.checkName) {
                ctx.addIssue("name mismatch");
              }

              if (val.password !== val.confirmPassword) {
                ctx.addIssue("password mismatch");
              }
            }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              name: "string",
              checkName: "string",
              password: "string",
              confirmPassword: "string",
            })
            .superRefine((val, ctx) => {
              if (val.name !== val.checkName) {
                ctx.addIssue(1);
              }

              if (val.password !== val.confirmPassword) {
                ctx.addIssue(true);
              }
            }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              name: "string",
              checkName: "string",
              password: "string",
              confirmPassword: "string",
            })
            .superRefine((val, ctx) => {
              if (val.name !== val.checkName) {
                ctx.addIssue("name mismatch");
              }
            }),
        ).toThrowError();

        expect(() =>
          unSafeESTest(data, "object")
            .schema({
              name: "string",
              checkName: "string",
              password: "string",
              confirmPassword: "string",
            })
            .superRefine((val, ctx) => {
              if (val.name !== val.checkName) {
                ctx.addIssue({});
              }
            }),
        ).toThrowError();
      });
    });
  });

  describe("bigint", () => {
    describe("less", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20n, "bigint").less(10n)).toThrowError();
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1n, "bigint").max(10n);
        unSafeESTest(1n, "bigint").max(1n);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20n, "bigint").max(10n)).toThrowError();
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint").greater(10n)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint").min(10n);
        unSafeESTest(15n, "bigint").min(15n);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint").min(10n)).toThrowError();
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(-3n, "bigint").positive()).toThrowError();
        expect(() => unSafeESTest(-1n, "bigint").positive()).toThrowError();
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(-15n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint").negative()).toThrowError();
        expect(() => unSafeESTest(1n, "bigint").negative()).toThrowError();
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint").multiple(5n);

        expect(message).toHaveBeenCalledTimes(171);
        expect(information).toHaveBeenCalledTimes(171);
      });

      test("fail", () => {
        expect(() => unSafeESTest(15n, "bigint").multiple(2n)).toThrowError();
        expect(() => unSafeESTest(15n, "bigint").multiple(4n)).toThrowError();
      });
    });
  });
});

describe("globalThis config", () => {
  test("message", () => {
    expect(globalThis.__ESCSS_ESTEST__.message).toBe(
      "Set 'globalThis.__ESCSS_ESTEST__.message' for customize message",
    );
  });
  test("isESTestDisabled", () => {
    expect(globalThis.__ESCSS_ESTEST__.isESTestDisabled).toBe(false);
  });
  test("ESTest can be disabled", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;

    expect(ESTest(1, "string")).toBeTypeOf("object");
    expect(ESTest("1", "string")).toBeTypeOf("object");
  });
  test("unSafeESTest should not be affected by isESTestDisabled (security)", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;
    expect(() => unSafeESTest(1, "string")).toThrow();
  });
});
