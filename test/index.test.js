import { describe, test, expect, vi } from "vitest";
import { ESTest, unSafeESTest } from "../src/index.js";

describe("ESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string?")).toBeTypeOf("object");
      expect(ESTest(undefined, "string?")).toBeTypeOf("object");
      expect(ESTest("a", "string")).toBeTypeOf("object");
      expect(ESTest(undefined, "number?")).toBeTypeOf("object");
      expect(ESTest(1, "number")).toBeTypeOf("object");
      expect(ESTest(undefined, "array?")).toBeTypeOf("object");
      expect(ESTest([], "array")).toBeTypeOf("object");
      expect(ESTest(undefined, "object?")).toBeTypeOf("object");
      expect(ESTest({}, "object")).toBeTypeOf("object");
      expect(ESTest(undefined, "boolean?")).toBeTypeOf("object");
      expect(ESTest(true, "boolean")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date")).toBeTypeOf("object");
      expect(ESTest(undefined, "bigint?")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(ESTest(null, "null")).toBeTypeOf("object");
      expect(ESTest(NaN, "nan")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function")).toBeTypeOf("object");
      expect(ESTest(/a/, "regexp")).toBeTypeOf("object");
    });

    test("fail", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest(/a/, "string?")).toBeTypeOf("object");
      expect(ESTest(/a/, "string")).toBeTypeOf("object");
      expect(ESTest("a", "number?")).toBeTypeOf("object");
      expect(ESTest("a", "number")).toBeTypeOf("object");
      expect(ESTest(1, "array?")).toBeTypeOf("object");
      expect(ESTest(1, "array")).toBeTypeOf("object");
      expect(ESTest([], "object?")).toBeTypeOf("object");
      expect(ESTest([], "object")).toBeTypeOf("object");
      expect(ESTest({}, "boolean?")).toBeTypeOf("object");
      expect(ESTest({}, "boolean")).toBeTypeOf("object");
      expect(ESTest(true, "date")).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint?")).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint")).toBeTypeOf("object");
      expect(ESTest(1n, "undefined")).toBeTypeOf("object");
      expect(ESTest(undefined, "null")).toBeTypeOf("object");
      expect(ESTest(null, "nan")).toBeTypeOf("object");
      expect(ESTest(NaN, "symbol")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "function")).toBeTypeOf("object");
      expect(ESTest(() => {}, "regexp")).toBeTypeOf("object");

      expect(message).toHaveBeenCalledTimes(19);
      expect(information).toHaveBeenCalledTimes(19);
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string?", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "string?", "1")).toBeTypeOf("object");
      expect(ESTest("a", "string", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "number?", "1")).toBeTypeOf("object");
      expect(ESTest(1, "number", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "array?", "1")).toBeTypeOf("object");
      expect(ESTest([], "array", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "object?", "1")).toBeTypeOf("object");
      expect(ESTest({}, "object", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "boolean?", "1")).toBeTypeOf("object");
      expect(ESTest(true, "boolean", "1")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "bigint?", "1")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", "1")).toBeTypeOf("object");
      expect(ESTest(null, "null", "1")).toBeTypeOf("object");
      expect(ESTest(NaN, "nan", "1")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol", "1")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function", "1")).toBeTypeOf("object");
      expect(ESTest(/a/, "regexp", "1")).toBeTypeOf("object");
    });

    test("fail", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      expect(ESTest(/a/, "string?", 1)).toBeTypeOf("object");
      expect(ESTest(/a/, "string", 1)).toBeTypeOf("object");
      expect(ESTest("a", "number?", 1)).toBeTypeOf("object");
      expect(ESTest("a", "number", 1)).toBeTypeOf("object");
      expect(ESTest(1, "array?", 1)).toBeTypeOf("object");
      expect(ESTest(1, "array", 1)).toBeTypeOf("object");
      expect(ESTest([], "object?", 1)).toBeTypeOf("object");
      expect(ESTest([], "object", 1)).toBeTypeOf("object");
      expect(ESTest({}, "boolean?", 1)).toBeTypeOf("object");
      expect(ESTest({}, "boolean", 1)).toBeTypeOf("object");
      expect(ESTest(true, "date", 1)).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint?", 1)).toBeTypeOf("object");
      expect(ESTest(new Date(), "bigint", 1)).toBeTypeOf("object");
      expect(ESTest(1n, "undefined", 1)).toBeTypeOf("object");
      expect(ESTest(undefined, "null", 1)).toBeTypeOf("object");
      expect(ESTest(null, "nan", 1)).toBeTypeOf("object");
      expect(ESTest(NaN, "symbol", 1)).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "function", 1)).toBeTypeOf("object");
      expect(ESTest(() => {}, "regexp", 1)).toBeTypeOf("object");

      expect(message).toHaveBeenCalledTimes(38);
      expect(information).toHaveBeenCalledTimes(38);
    });
  });

  describe("common", () => {
    test("description", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      ESTest("a", "string?").description("test");
      ESTest("a", "string").description("test");
      ESTest(1, "number?").description("test");
      ESTest(1, "number").description("test");
      ESTest([], "array?").description("test");
      ESTest([], "array").description("test");
      ESTest({}, "object?").description("test");
      ESTest({}, "object").description("test");
      ESTest(true, "boolean?").description("test");
      ESTest(true, "boolean").description("test");
      ESTest(new Date(), "date").description("test");
      ESTest(1n, "bigint?").description("test");
      ESTest(1n, "bigint").description("test");
      ESTest(undefined, "undefined").description("test");
      ESTest(null, "null").description("test");
      ESTest(NaN, "nan").description("test");
      ESTest(Symbol("a"), "symbol").description("test");
      ESTest(() => {}, "function").description("test");
      ESTest(/a/, "regexp").description("test");

      expect(message).toHaveBeenCalledTimes(0);
      expect(information).toHaveBeenCalledTimes(0);
    });
  });

  describe("string", () => {
    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").max(10);
        ESTest("foo", "string?").max(3);
        ESTest("foo", "string").max(10);
        ESTest("foo", "string").max(3);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").max(-10);
        ESTest("foo", "string").max(-10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").min(1);
        ESTest("foo", "string?").min(3);
        ESTest("foo", "string").min(1);
        ESTest("foo", "string").min(3);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").min(10);
        ESTest("foo", "string").min(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("length", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").length(3);
        ESTest("foo", "string").length(3);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").length(5);
        ESTest("foo", "string").length(5);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("email", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foobar@gmail.com", "string?").email();
        ESTest("foobar@gmail.com", "string").email();

        ESTest("john.doe+newsletter@example-domain.com", "string?").email(
          "html5Email",
        );
        ESTest("john.doe+newsletter@example-domain.com", "string").email(
          "html5Email",
        );

        ESTest(
          "user.name+tag+filter@sub.example-domain.co.uk",
          "string?",
        ).email("rfc5322Email");
        ESTest("user.name+tag+filter@sub.example-domain.co.uk", "string").email(
          "rfc5322Email",
        );

        ESTest("user.name123@example-domain.com", "string?").email(
          "unicodeEmail",
        );
        ESTest("user.name123@example-domain.com", "string").email(
          "unicodeEmail",
        );

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("..john@gmail.com", "string?").email();
        ESTest(".john@", "string?").email();
        ESTest("john.com", "string?").email();
        ESTest("john@", "string?").email();
        ESTest("john doe@example.com", "string?").email();

        ESTest("..john@gmail.com", "string").email();
        ESTest(".john@", "string").email();
        ESTest("john.com", "string").email();
        ESTest("john@", "string").email();
        ESTest("john doe@example.com", "string").email();

        ESTest(" name@example.com", "string?").email("html5Email");
        ESTest("user@-example.com", "string?").email("html5Email");
        ESTest("user@@example.com", "string?").email("html5Email");
        ESTest("user@example..com", "string?").email("html5Email");
        ESTest("user@.example.com", "string?").email("html5Email");

        ESTest(" name@example.com", "string").email("html5Email");
        ESTest("user@-example.com", "string").email("html5Email");
        ESTest("user@@example.com", "string").email("html5Email");
        ESTest("user@example..com", "string").email("html5Email");
        ESTest("user@.example.com", "string").email("html5Email");

        ESTest("#@%^%#$#.com", "string?").email("rfc5322Email");
        ESTest("plainApples", "string?").email("rfc5322Email");
        ESTest("@example.com", "string?").email("rfc5322Email");
        ESTest("test@example", "string?").email("rfc5322Email");
        ESTest("test@.abcde", "string?").email("rfc5322Email");

        ESTest("#@%^%#$#.com", "string").email("rfc5322Email");
        ESTest("plainApples", "string").email("rfc5322Email");
        ESTest("@example.com", "string").email("rfc5322Email");
        ESTest("test@example", "string").email("rfc5322Email");
        ESTest("test@.abcde", "string").email("rfc5322Email");

        ESTest(
          "too_long_local_part_this_is_more_than_sixty_four_characters_to_test_the_limit@example.com",
          "string?",
        ).email("unicodeEmail");
        ESTest(
          "test@too_long_domain_part_this_is_definitely_more_than_two_hundred_fifty_five_characters_to_test_the_limit_and_it_will_fail_because_of_its_excessive_length_which_is_not_allowed_by_the_regular_expression_for_email_validation_as_it_exceeds_the_specified_maximum_length_limit.com",
          "string?",
        ).email("unicodeEmail");
        ESTest("test with spaces@example.com", "string?").email("unicodeEmail");
        ESTest("test@example.com test", "string?").email("unicodeEmail");
        ESTest("test!example.com", "string?").email("unicodeEmail");

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

        expect(message).toHaveBeenCalledTimes(40);
        expect(information).toHaveBeenCalledTimes(40);
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

        ESTest("550e8400-e29b-41d4-a716-446655440000", "string?").uuid4();
        ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string?").uuid7();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("123e4567|e89b|12d3|a456|426614174000", "string?").uuid4();
        ESTest("123e4567-e89b-12d3-a456-426g14174000", "string?").uuid4();
        ESTest("123e4567--e89b-12d3-a456-426614174000", "string?").uuid4();
        ESTest("123e4567-e89b-12d3-a456-@426614174000", "string?").uuid4();
        ESTest("123e/4567/e89b/12d3/a456/426614174000", "string?").uuid4();

        ESTest("123e4567|e89b|12d3|a456|426614174000", "string").uuid4();
        ESTest("123e4567-e89b-12d3-a456-426g14174000", "string").uuid4();
        ESTest("123e4567--e89b-12d3-a456-426614174000", "string").uuid4();
        ESTest("123e4567-e89b-12d3-a456-@426614174000", "string").uuid4();
        ESTest("123e/4567/e89b/12d3/a456/426614174000", "string").uuid4();

        ESTest("0189c7e4-3b8a-4e3b-8291-4e6f2b1a4c7d", "string?").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-c291-4e6f2b1a4c7d", "string?").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c", "string?").uuid7();
        ESTest("0189c7e43b8a7e3b82914e6f2b1a4c7d", "string?").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-z291-4e6f2b1a4c7d", "string?").uuid7();

        ESTest("0189c7e4-3b8a-4e3b-8291-4e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-c291-4e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c", "string").uuid7();
        ESTest("0189c7e43b8a7e3b82914e6f2b1a4c7d", "string").uuid7();
        ESTest("0189c7e4-3b8a-7e3b-z291-4e6f2b1a4c7d", "string").uuid7();

        expect(message).toHaveBeenCalledTimes(20);
        expect(information).toHaveBeenCalledTimes(20);
      });
    });

    describe("regexp", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").regexp(/foo/);
        ESTest("foo", "string").regexp(/foo/);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("foo", "string?").regexp(/aa/);
        ESTest("foo", "string").regexp(/aa/);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("base64", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQh", "string?").base64();
        ESTest("SGVsbG8gd29ybGQh", "string").base64();

        ESTest("Zm9vYmFyXzEyMw", "string?").base64url();
        ESTest("Zm9vYmFyXzEyMw", "string").base64url();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("SGVsbG8gd29ybGQ@!#", "string?").base64();
        ESTest("SGVsbG8gd29ybGQ===", "string?").base64();
        ESTest("SGVsbG8gd29ybGQ--", "string?").base64();
        ESTest("!@#SGVsbG8gd29ybGQ=", "string?").base64();
        ESTest("SGVsbG8gd29ybGQ$%^&", "string?").base64();

        ESTest("SGVsbG8gd29ybGQ@!#", "string").base64();
        ESTest("SGVsbG8gd29ybGQ===", "string").base64();
        ESTest("SGVsbG8gd29ybGQ--", "string").base64();
        ESTest("!@#SGVsbG8gd29ybGQ=", "string").base64();
        ESTest("SGVsbG8gd29ybGQ$%^&", "string").base64();

        ESTest("SGVsbG8gV29ybGQ=", "string?").base64url();
        ESTest("invalid+char/example", "string?").base64url();
        ESTest("another=fail", "string?").base64url();
        ESTest("你好世界", "string?").base64url();
        ESTest("padded==", "string?").base64url();

        ESTest("SGVsbG8gV29ybGQ=", "string").base64url();
        ESTest("invalid+char/example", "string").base64url();
        ESTest("another=fail", "string").base64url();
        ESTest("你好世界", "string").base64url();
        ESTest("padded==", "string").base64url();

        expect(message).toHaveBeenCalledTimes(20);
        expect(information).toHaveBeenCalledTimes(20);
      });
    });

    describe("ip", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("192.168.1.1", "string?").ip4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string?").ip6();
        ESTest("192.168.1.1", "string").ip4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("256.256.256.256", "string?").ip4();
        ESTest("192.168.1", "string?").ip4();
        ESTest("192.168.a.1", "string?").ip4();
        ESTest("192..168.1.1", "string?").ip4();
        ESTest("192.168.1.1.1", "string?").ip4();
        ESTest("2001:db8::a8::::4a:257:202", "string?").ip6();
        ESTest("2001:db8::a8:4a:257g:202", "string?").ip6();
        ESTest("2001:db8:abcd:1234:abcd:1234:abcd:1234:5678", "string?").ip6();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string?").ip6();

        ESTest("256.256.256.256", "string").ip4();
        ESTest("192.168.1", "string").ip4();
        ESTest("192.168.a.1", "string").ip4();
        ESTest("192..168.1.1", "string").ip4();
        ESTest("192.168.1.1.1", "string").ip4();
        ESTest("2001:db8::a8::::4a:257:202", "string").ip6();
        ESTest("2001:db8::a8:4a:257g:202", "string").ip6();
        ESTest("2001:db8:abcd:1234:abcd:1234:abcd:1234:5678", "string").ip6();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678", "string").ip6();

        expect(message).toHaveBeenCalledTimes(18);
        expect(information).toHaveBeenCalledTimes(18);
      });
    });

    describe("cidr", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("192.168.1.1/16", "string?").cidr4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string?").cidr6();
        ESTest("192.168.1.1/16", "string").cidr4();
        ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("256.256.256.256/255", "string?").cidr4();
        ESTest("192.168.1+16", "string?").cidr4();
        ESTest("192.168.a.1-16", "string?").cidr4();
        ESTest("192..168.1.1_16", "string?").cidr4();
        ESTest("192.168.1.1.1/-16", "string?").cidr4();
        ESTest("2001:db8::a8::::4a:257:202/255", "string?").cidr6();
        ESTest("2001:db8::a8:4a:257g:202+16", "string?").cidr6();
        ESTest("2001:db8::a8:4a:257g:202-16", "string?").cidr6();
        ESTest(
          "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678_16",
          "string?",
        ).cidr6();
        ESTest("2001:db8:abcd:1234:xyz:1234:abcd:5678/-16", "string?").cidr6();

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

        expect(message).toHaveBeenCalledTimes(20);
        expect(information).toHaveBeenCalledTimes(20);
      });
    });

    describe("emoji", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("🌀", "string?").emoji();
        ESTest("🌀", "string").emoji();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("_1", "string?").emoji();
        ESTest("_1", "string").emoji();

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("e164", () => {
      test("success", () => {
        ESTest("+886912345678", "string?").e164();
        ESTest("+8860912345678", "string?").e164();

        ESTest("+886912345678", "string").e164();
        ESTest("+8860912345678", "string").e164();
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("0912-345-678", "string?").e164();
        ESTest("0912345678", "string?").e164();
        ESTest("886912345678", "string?").e164();
        ESTest("8860912345678", "string?").e164();

        ESTest("0912-345-678", "string").e164();
        ESTest("0912345678", "string").e164();
        ESTest("886912345678", "string").e164();
        ESTest("8860912345678", "string").e164();

        expect(message).toHaveBeenCalledTimes(8);
        expect(information).toHaveBeenCalledTimes(8);
      });
    });

    describe("lowercase", () => {
      test("success", () => {
        ESTest("foobar", "string?").lowercase();

        ESTest("foobar", "string").lowercase();
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest("FOOBAR", "string?").lowercase();
        ESTest("FooBar", "string?").lowercase();
        ESTest("FoOBaR", "string?").lowercase();
        ESTest("_FooBar", "string?").lowercase();
        ESTest("$FooBar", "string?").lowercase();

        ESTest("FOOBAR", "string").lowercase();
        ESTest("FooBar", "string").lowercase();
        ESTest("FoOBaR", "string").lowercase();
        ESTest("_FooBar", "string").lowercase();
        ESTest("$FooBar", "string").lowercase();

        expect(message).toHaveBeenCalledTimes(10);
        expect(information).toHaveBeenCalledTimes(10);
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

        ESTest(1, "number?").less(10);
        ESTest(1, "number").less(10);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number?").less(10);
        ESTest(20, "number").less(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1, "number?").max(10);
        ESTest(1, "number?").max(1);
        ESTest(1, "number").max(10);
        ESTest(1, "number").max(1);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20, "number?").max(10);
        ESTest(20, "number").max(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").greater(10);
        ESTest(15, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number?").greater(10);
        ESTest(3, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").min(10);
        ESTest(15, "number?").min(15);

        ESTest(15, "number").min(10);
        ESTest(15, "number").min(15);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3, "number?").min(10);
        ESTest(3, "number").min(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("integer", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").integer();
        ESTest(15, "number").integer();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number?").integer();
        ESTest(-3.1, "number?").integer();
        ESTest(1 / 2, "number?").integer();
        ESTest(-1 / 2, "number?").integer();

        ESTest(3.1, "number").integer();
        ESTest(-3.1, "number").integer();
        ESTest(1 / 2, "number").integer();
        ESTest(-1 / 2, "number").integer();

        expect(message).toHaveBeenCalledTimes(8);
        expect(information).toHaveBeenCalledTimes(8);
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").positive();
        ESTest(15, "number").positive();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-3.1, "number?").positive();
        ESTest(-1 / 2, "number?").positive();
        ESTest(-3.1, "number").positive();
        ESTest(-1 / 2, "number").positive();

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-15, "number?").negative();
        ESTest(-15, "number").negative();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3.1, "number?").negative();
        ESTest(1 / 2, "number?").negative();

        ESTest(3.1, "number").negative();
        ESTest(1 / 2, "number").negative();

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").multiple(5);
        ESTest(15, "number").multiple(5);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15, "number?").multiple(2);
        ESTest(15, "number?").multiple(4);

        ESTest(15, "number").multiple(2);
        ESTest(15, "number").multiple(4);

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
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

        ESTest([1], "array?").max(10);
        ESTest([1], "array").max(10);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array?").max(-10);
        ESTest([1], "array").max(-10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array?").min(1);
        ESTest([1], "array").min(1);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest([1], "array?").min(10);
        ESTest([1], "array").min(10);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
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

        ESTest(1n, "bigint?").less(10n);
        ESTest(1n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20n, "bigint?").less(10n);
        ESTest(20n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(1n, "bigint?").max(10n);
        ESTest(1n, "bigint?").max(1n);
        ESTest(1n, "bigint").max(10n);
        ESTest(1n, "bigint").max(1n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(20n, "bigint?").max(10n);
        ESTest(20n, "bigint").max(10n);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint?").greater(10n);
        ESTest(15n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint?").greater(10n);
        ESTest(3n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint?").min(10n);
        ESTest(15n, "bigint?").min(15n);

        ESTest(15n, "bigint").min(10n);
        ESTest(15n, "bigint").min(15n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint?").min(10n);
        ESTest(3n, "bigint").min(10n);

        expect(message).toHaveBeenCalledTimes(2);
        expect(information).toHaveBeenCalledTimes(2);
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint?").positive();
        ESTest(15n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-3n, "bigint?").positive();
        ESTest(-1n, "bigint?").positive();
        ESTest(-3n, "bigint").positive();
        ESTest(-1n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
      });
    });

    describe("negative", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(-15n, "bigint?").negative();
        ESTest(-15n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(3n, "bigint?").negative();
        ESTest(1n, "bigint?").negative();

        ESTest(3n, "bigint").negative();
        ESTest(1n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
      });
    });

    describe("multiple", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint?").multiple(5n);
        ESTest(15n, "bigint").multiple(5n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        ESTest(15n, "bigint?").multiple(2n);
        ESTest(15n, "bigint?").multiple(4n);

        ESTest(15n, "bigint").multiple(2n);
        ESTest(15n, "bigint").multiple(4n);

        expect(message).toHaveBeenCalledTimes(4);
        expect(information).toHaveBeenCalledTimes(4);
      });
    });
  });
});

describe("unSafeESTest", () => {
  describe("1st / 2nd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string?")).toBeTypeOf("object");
      expect(ESTest(undefined, "string?")).toBeTypeOf("object");
      expect(ESTest("a", "string")).toBeTypeOf("object");
      expect(ESTest(undefined, "number?")).toBeTypeOf("object");
      expect(ESTest(1, "number")).toBeTypeOf("object");
      expect(ESTest(undefined, "array?")).toBeTypeOf("object");
      expect(ESTest([], "array")).toBeTypeOf("object");
      expect(ESTest(undefined, "object?")).toBeTypeOf("object");
      expect(ESTest({}, "object")).toBeTypeOf("object");
      expect(ESTest(undefined, "boolean?")).toBeTypeOf("object");
      expect(ESTest(true, "boolean")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date")).toBeTypeOf("object");
      expect(ESTest(undefined, "bigint?")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined")).toBeTypeOf("object");
      expect(ESTest(null, "null")).toBeTypeOf("object");
      expect(ESTest(NaN, "nan")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function")).toBeTypeOf("object");
      expect(ESTest(/a/, "regexp")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest(/a/, "string?")).toThrow();
      expect(() => unSafeESTest(/a/, "string")).toThrow();
      expect(() => unSafeESTest("a", "number?")).toThrow();
      expect(() => unSafeESTest("a", "number")).toThrow();
      expect(() => unSafeESTest(1, "array?")).toThrow();
      expect(() => unSafeESTest(1, "array")).toThrow();
      expect(() => unSafeESTest([], "object?")).toThrow();
      expect(() => unSafeESTest([], "object")).toThrow();
      expect(() => unSafeESTest({}, "boolean?")).toThrow();
      expect(() => unSafeESTest({}, "boolean")).toThrow();
      expect(() => unSafeESTest(true, "date")).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint?")).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint")).toThrow();
      expect(() => unSafeESTest(1n, "undefined")).toThrow();
      expect(() => unSafeESTest(undefined, "null")).toThrow();
      expect(() => unSafeESTest(null, "nan")).toThrow();
      expect(() => unSafeESTest(NaN, "symbol")).toThrow();
      expect(() => unSafeESTest(Symbol("a"), "function")).toThrow();
      expect(() => unSafeESTest(() => {}, "regexp")).toThrow();
    });
  });

  describe("3rd argument", () => {
    test("success", () => {
      expect(ESTest("a", "string?", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "string?", "1")).toBeTypeOf("object");
      expect(ESTest("a", "string", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "number?", "1")).toBeTypeOf("object");
      expect(ESTest(1, "number", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "array?", "1")).toBeTypeOf("object");
      expect(ESTest([], "array", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "object?", "1")).toBeTypeOf("object");
      expect(ESTest({}, "object", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "boolean?", "1")).toBeTypeOf("object");
      expect(ESTest(true, "boolean", "1")).toBeTypeOf("object");
      expect(ESTest(new Date(), "date", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "bigint?", "1")).toBeTypeOf("object");
      expect(ESTest(1n, "bigint", "1")).toBeTypeOf("object");
      expect(ESTest(undefined, "undefined", "1")).toBeTypeOf("object");
      expect(ESTest(null, "null", "1")).toBeTypeOf("object");
      expect(ESTest(NaN, "nan", "1")).toBeTypeOf("object");
      expect(ESTest(Symbol("a"), "symbol", "1")).toBeTypeOf("object");
      expect(ESTest(() => {}, "function", "1")).toBeTypeOf("object");
      expect(ESTest(/a/, "regexp", "1")).toBeTypeOf("object");
    });

    test("fail", () => {
      expect(() => unSafeESTest(/a/, "string?", 1)).toThrow();
      expect(() => unSafeESTest(/a/, "string", 1)).toThrow();
      expect(() => unSafeESTest("a", "number?", 1)).toThrow();
      expect(() => unSafeESTest("a", "number", 1)).toThrow();
      expect(() => unSafeESTest(1, "array?", 1)).toThrow();
      expect(() => unSafeESTest(1, "array", 1)).toThrow();
      expect(() => unSafeESTest([], "object?", 1)).toThrow();
      expect(() => unSafeESTest([], "object", 1)).toThrow();
      expect(() => unSafeESTest({}, "boolean?", 1)).toThrow();
      expect(() => unSafeESTest({}, "boolean", 1)).toThrow();
      expect(() => unSafeESTest(true, "date", 1)).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint?", 1)).toThrow();
      expect(() => unSafeESTest(new Date(), "bigint", 1)).toThrow();
      expect(() => unSafeESTest(1n, "undefined", 1)).toThrow();
      expect(() => unSafeESTest(undefined, "null", 1)).toThrow();
      expect(() => unSafeESTest(null, "nan", 1)).toThrow();
      expect(() => unSafeESTest(NaN, "symbol", 1)).toThrow();
      expect(() => unSafeESTest(Symbol("a"), "function", 1)).toThrow();
      expect(() => unSafeESTest(() => {}, "regexp", 1)).toThrow();
    });
  });

  describe("common", () => {
    test("description", () => {
      const message = vi.spyOn(console, "error").mockImplementation(() => {});
      const information = vi
        .spyOn(console, "trace")
        .mockImplementation(() => {});

      unSafeESTest("a", "string?").description("test");
      unSafeESTest("a", "string").description("test");
      unSafeESTest(1, "number?").description("test");
      unSafeESTest(1, "number").description("test");
      unSafeESTest([], "array?").description("test");
      unSafeESTest([], "array").description("test");
      unSafeESTest({}, "object?").description("test");
      unSafeESTest({}, "object").description("test");
      unSafeESTest(true, "boolean?").description("test");
      unSafeESTest(true, "boolean").description("test");
      unSafeESTest(new Date(), "date").description("test");
      unSafeESTest(1n, "bigint?").description("test");
      unSafeESTest(1n, "bigint").description("test");
      unSafeESTest(undefined, "undefined").description("test");
      unSafeESTest(null, "null").description("test");
      unSafeESTest(NaN, "nan").description("test");
      unSafeESTest(Symbol("a"), "symbol").description("test");
      unSafeESTest(() => {}, "function").description("test");
      unSafeESTest(/a/, "regexp").description("test");

      expect(message).toHaveBeenCalledTimes(0);
      expect(information).toHaveBeenCalledTimes(0);
    });
  });

  describe("string", () => {
    describe("max", () => {
      test("success", () => {
        unSafeESTest("foo", "string?").max(10);
        unSafeESTest("foo", "string?").max(3);

        unSafeESTest("foo", "string").max(10);
        unSafeESTest("foo", "string").max(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string?").max(1)).toThrowError();
        expect(() => unSafeESTest("foo", "string").max(1)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        unSafeESTest("foo", "string?").min(1);
        unSafeESTest("foo", "string?").min(3);

        unSafeESTest("foo", "string").min(1);
        unSafeESTest("foo", "string").min(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string?").min(10)).toThrowError();
        expect(() => unSafeESTest("foo", "string").min(10)).toThrowError();
      });
    });

    describe("length", () => {
      test("success", () => {
        unSafeESTest("foo", "string?").length(3);
        unSafeESTest("foo", "string").length(3);
      });

      test("fail", () => {
        expect(() => unSafeESTest("foo", "string?").length(5)).toThrowError();
        expect(() => unSafeESTest("foo", "string").length(5)).toThrowError();
      });
    });

    describe("email", () => {
      test("success", () => {
        unSafeESTest("foobar@gmail.com", "string?").email();
        unSafeESTest("foobar@gmail.com", "string").email();

        unSafeESTest("john.doe+newsletter@example-domain.com", "string?").email(
          "html5Email",
        );
        unSafeESTest("john.doe+newsletter@example-domain.com", "string").email(
          "html5Email",
        );

        unSafeESTest(
          "user.name+tag+filter@sub.example-domain.co.uk",
          "string?",
        ).email("rfc5322Email");
        unSafeESTest(
          "user.name+tag+filter@sub.example-domain.co.uk",
          "string",
        ).email("rfc5322Email");

        unSafeESTest("user.name123@example-domain.com", "string?").email(
          "unicodeEmail",
        );
        unSafeESTest("user.name123@example-domain.com", "string").email(
          "unicodeEmail",
        );
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("..john@gmail.com", "string?").email(),
        ).toThrowError();
        expect(() => unSafeESTest(".john@", "string?").email()).toThrowError();
        expect(() =>
          unSafeESTest("john.com", "string?").email(),
        ).toThrowError();
        expect(() => unSafeESTest("john@", "string?").email()).toThrowError();
        expect(() =>
          unSafeESTest("john doe@example.com", "string?").email(),
        ).toThrowError();

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
          unSafeESTest(" name@example.com", "string?").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@-example.com", "string?").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@@example.com", "string?").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@example..com", "string?").email("html5Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("user@.example.com", "string?").email("html5Email"),
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
          unSafeESTest("#@%^%#$#.com", "string?").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("plainApples", "string?").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("@example.com", "string?").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@example", "string?").email("rfc5322Email"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@.abcde", "string?").email("rfc5322Email"),
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
            "string?",
          ).email("unicodeEmail"),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "test@too_long_domain_part_this_is_definitely_more_than_two_hundred_fifty_five_characters_to_test_the_limit_and_it_will_fail_because_of_its_excessive_length_which_is_not_allowed_by_the_regular_expression_for_email_validation_as_it_exceeds_the_specified_maximum_length_limit.com",
            "string?",
          ).email("unicodeEmail"),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test with spaces@example.com", "string?").email(
            "unicodeEmail",
          ),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test@example.com test", "string?").email(
            "unicodeEmail",
          ),
        ).toThrowError();
        expect(() =>
          unSafeESTest("test!example.com", "string?").email("unicodeEmail"),
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

        unSafeESTest("550e8400-e29b-41d4-a716-446655440000", "string?").uuid4();
        unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string?").uuid7();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest(
            "123e4567|e89b|12d3|a456|426614174000",
            "string?",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-426g14174000",
            "string?",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567--e89b-12d3-a456-426614174000",
            "string?",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e4567-e89b-12d3-a456-@426614174000",
            "string?",
          ).uuid4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "123e/4567/e89b/12d3/a456/426614174000",
            "string?",
          ).uuid4(),
        ).toThrowError();

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
            "string?",
          ).uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "0189c7e4-3b8a-7e3b-c291-4e6f2b1a4c7d",
            "string?",
          ).uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c", "string?").uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0189c7e43b8a7e3b82914e6f2b1a4c7d", "string?").uuid7(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "0189c7e4-3b8a-7e3b-z291-4e6f2b1a4c7d",
            "string?",
          ).uuid7(),
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

    describe("regexp", () => {
      test("success", () => {
        unSafeESTest("foo", "string?").regexp(/foo/);
        unSafeESTest("foo", "string").regexp(/foo/);
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("foo", "string?").regexp(/aa/),
        ).toThrowError();
        expect(() => unSafeESTest("foo", "string").regexp(/aa/)).toThrowError();
      });
    });

    describe("base64", () => {
      test("success", () => {
        unSafeESTest("SGVsbG8gd29ybGQh", "string?").base64();
        unSafeESTest("SGVsbG8gd29ybGQh", "string").base64();

        unSafeESTest("Zm9vYmFyXzEyMw", "string?").base64url();
        unSafeESTest("Zm9vYmFyXzEyMw", "string").base64url();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ@!#", "string?").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ===", "string?").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ--", "string?").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("!@#SGVsbG8gd29ybGQ=", "string?").base64(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("SGVsbG8gd29ybGQ$%^&", "string?").base64(),
        ).toThrowError();

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
          unSafeESTest("SGVsbG8gV29ybGQ=", "string?").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("invalid+char/example", "string?").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("another=fail", "string?").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("你好世界", "string?").base64url(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("padded==", "string?").base64url(),
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
        unSafeESTest("192.168.1.1", "string?").ip4();
        unSafeESTest(
          "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
          "string?",
        ).ip6();

        unSafeESTest("192.168.1.1", "string").ip4();
        unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("256.256.256.256", "string?").ip4(),
        ).toThrowError();
        expect(() => unSafeESTest("192.168.1", "string?").ip4()).toThrowError();
        expect(() =>
          unSafeESTest("192.168.a.1", "string?").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192..168.1.1", "string?").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1.1.1", "string?").ip4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8::::4a:257:202", "string?").ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202", "string?").ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678",
            "string",
          ).ip6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:xyz:1234:abcd:5678",
            "string?",
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

        unSafeESTest("192.168.1.1/16", "string?").cidr4();
        unSafeESTest(
          "2001:0db8:85a3:0000:0000:8a2e:0370:7334/16",
          "string?",
        ).cidr6();
        unSafeESTest("192.168.1.1/16", "string").cidr4();
        unSafeESTest(
          "2001:0db8:85a3:0000:0000:8a2e:0370:7334/16",
          "string",
        ).cidr6();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("256.256.256.256/255", "string?").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1+16", "string?").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.a.1-16", "string?").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192..168.1.1_16", "string?").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("192.168.1.1.1/-16", "string?").cidr4(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8::::4a:257:202/255", "string?").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202+16", "string?").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("2001:db8::a8:4a:257g:202-16", "string?").cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:abcd:1234:abcd:1234:5678_16",
            "string?",
          ).cidr6(),
        ).toThrowError();
        expect(() =>
          unSafeESTest(
            "2001:db8:abcd:1234:xyz:1234:abcd:5678/-16",
            "string?",
          ).cidr6(),
        ).toThrowError();

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
        unSafeESTest("🌀", "string?").emoji();
        unSafeESTest("🌀", "string").emoji();
      });

      test("fail", () => {
        expect(() => unSafeESTest("_1", "string?").emoji()).toThrowError();
        expect(() => unSafeESTest("_1", "string").emoji()).toThrowError();
      });
    });

    describe("e164", () => {
      test("success", () => {
        unSafeESTest("+886912345678", "string?").e164();
        unSafeESTest("+8860912345678", "string?").e164();

        unSafeESTest("+886912345678", "string").e164();
        unSafeESTest("+8860912345678", "string").e164();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("0912-345-678", "string?").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("0912345678", "string?").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("886912345678", "string?").e164(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("8860912345678", "string?").e164(),
        ).toThrowError();

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
        unSafeESTest("foobar", "string?").lowercase();

        unSafeESTest("foobar", "string").lowercase();
      });

      test("fail", () => {
        expect(() =>
          unSafeESTest("FOOBAR", "string?").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("FooBar", "string?").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("FoOBaR", "string?").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("_FooBar", "string?").lowercase(),
        ).toThrowError();
        expect(() =>
          unSafeESTest("$FooBar", "string?").lowercase(),
        ).toThrowError();

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

        unSafeESTest(1, "number?").less(10);
        unSafeESTest(1, "number").less(10);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number?").less(10)).toThrow();
        expect(() => unSafeESTest(20, "number").less(10)).toThrow();
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1, "number?").max(10);
        unSafeESTest(1, "number?").max(1);

        unSafeESTest(1, "number").max(10);
        unSafeESTest(1, "number").max(1);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20, "number?").max(10)).toThrowError();
        expect(() => unSafeESTest(20, "number").max(10)).toThrowError();
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number?").greater(10);
        unSafeESTest(15, "number").greater(10);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number?").greater(10)).toThrowError();
        expect(() => unSafeESTest(3, "number").greater(10)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number?").min(10);
        unSafeESTest(15, "number?").min(15);

        unSafeESTest(15, "number").min(10);
        unSafeESTest(15, "number").min(15);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3, "number?").min(10)).toThrowError();
        expect(() => unSafeESTest(3, "number").min(10)).toThrowError();
      });
    });

    describe("integer", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15, "number?").integer();
        unSafeESTest(15, "number").integer();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3.1, "number?").integer()).toThrowError();
        expect(() => unSafeESTest(-3.1, "number?").integer()).toThrowError();
        expect(() => unSafeESTest(1 / 2, "number?").integer()).toThrowError();
        expect(() => unSafeESTest(-1 / 2, "number?").integer()).toThrowError();

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

        unSafeESTest(15, "number?").positive();
        unSafeESTest(15, "number").positive();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(-3.1, "number?").positive()).toThrowError();
        expect(() => unSafeESTest(-1 / 2, "number?").positive()).toThrowError();

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

        unSafeESTest(-15, "number?").negative();
        unSafeESTest(-15, "number").negative();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3.1, "number?").negative()).toThrowError();
        expect(() => unSafeESTest(1 / 2, "number?").negative()).toThrowError();

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

        unSafeESTest(15, "number?").multiple(5);
        unSafeESTest(15, "number").multiple(5);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(15, "number?").multiple(2)).toThrowError();
        expect(() => unSafeESTest(15, "number?").multiple(4)).toThrowError();

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

        unSafeESTest([1], "array?").max(10);
        unSafeESTest([1], "array?").max(1);

        unSafeESTest([1], "array").max(10);
        unSafeESTest([1], "array").max(1);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array?").max(-10)).toThrow();
        expect(() => unSafeESTest([1], "array").max(-10)).toThrow();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest([1], "array?").min(0);
        unSafeESTest([1], "array?").min(1);

        unSafeESTest([1], "array").min(0);
        unSafeESTest([1], "array").min(1);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest([1], "array?").min(10)).toThrowError();
        expect(() => unSafeESTest([1], "array").min(10)).toThrowError();
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

        unSafeESTest(1n, "bigint?").less(10n);
        unSafeESTest(1n, "bigint").less(10n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20n, "bigint?").less(10n)).toThrowError();
        expect(() => unSafeESTest(20n, "bigint").less(10n)).toThrowError();
      });
    });

    describe("max", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(1n, "bigint?").max(10n);
        unSafeESTest(1n, "bigint?").max(1n);
        unSafeESTest(1n, "bigint").max(10n);
        unSafeESTest(1n, "bigint").max(1n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(20n, "bigint?").max(10n)).toThrowError();
        expect(() => unSafeESTest(20n, "bigint").max(10n)).toThrowError();
      });
    });

    describe("greater", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint?").greater(10n);
        unSafeESTest(15n, "bigint").greater(10n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint?").greater(10n)).toThrowError();
        expect(() => unSafeESTest(3n, "bigint").greater(10n)).toThrowError();
      });
    });

    describe("min", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint?").min(10n);
        unSafeESTest(15n, "bigint?").min(15n);

        unSafeESTest(15n, "bigint").min(10n);
        unSafeESTest(15n, "bigint").min(15n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint?").min(10n)).toThrowError();
        expect(() => unSafeESTest(3n, "bigint").min(10n)).toThrowError();
      });
    });

    describe("positive", () => {
      test("success", () => {
        const message = vi.spyOn(console, "error").mockImplementation(() => {});
        const information = vi
          .spyOn(console, "trace")
          .mockImplementation(() => {});

        unSafeESTest(15n, "bigint?").positive();
        unSafeESTest(15n, "bigint").positive();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(-3n, "bigint?").positive()).toThrowError();
        expect(() => unSafeESTest(-1n, "bigint?").positive()).toThrowError();
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

        unSafeESTest(-15n, "bigint?").negative();
        unSafeESTest(-15n, "bigint").negative();

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(3n, "bigint?").negative()).toThrowError();
        expect(() => unSafeESTest(1n, "bigint?").negative()).toThrowError();

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

        unSafeESTest(15n, "bigint?").multiple(5n);
        unSafeESTest(15n, "bigint").multiple(5n);

        expect(message).toHaveBeenCalledTimes(0);
        expect(information).toHaveBeenCalledTimes(0);
      });

      test("fail", () => {
        expect(() => unSafeESTest(15n, "bigint?").multiple(2n)).toThrowError();
        expect(() => unSafeESTest(15n, "bigint?").multiple(4n)).toThrowError();

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
    expect(ESTest(1, "string?")).toBe(undefined);
    expect(ESTest("1", "string?")).toBe(undefined);

    expect(ESTest(1, "string")).toBe(undefined);
    expect(ESTest("1", "string")).toBe(undefined);
  });
  test("unSafeESTest should not be affected by isESTestDisabled (security)", () => {
    globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;
    expect(() => unSafeESTest(1, "string?")).toThrow();
    expect(() => unSafeESTest(1, "string")).toThrow();
  });
});
