import { ESTest, unSafeESTest } from "../src/index.js";

/**
 * Happy path test
 * Run: pnpm test
 * Expected: All tests pass with no console logs or errors in terminal
 */

// ESTest
ESTest("1", "string");
ESTest("1", "string").description("test");
ESTest("1", "string").max(10);
ESTest("1", "string").min(0);
ESTest("1", "string").length(1);
ESTest("foo@gmail.com", "string").email();
ESTest("john.doe+@example-domain.com", "string").email("html5Email");
ESTest("user.tag+filter@sub.example-domain.co.uk", "string").email(
  "rfc5322Email",
);
ESTest("user.name123@example-domain.com", "string").email("unicodeEmail");
ESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();
ESTest("foo bar", "string").regex(/(foo|bar)/);
ESTest("SGVsbG8gd29ybGQh", "string").base64();
ESTest("Zm9vYmFyXzEyMw", "string").base64url();
ESTest("192.168.1.1", "string").ip4();
ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
ESTest("192.168.1.1/16", "string").cidr4();
ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();
ESTest("🌀", "string").emoji();
ESTest("+886912345678", "string").e164();
ESTest("foobar", "string").lowercase();
ESTest(undefined, "string?");
ESTest(undefined, "string?").description("test");

ESTest(1, "number");
ESTest(1, "number").description("test");
ESTest(5, "number").less(10);
ESTest(5, "number").max(10);
ESTest(15, "number").greater(10);
ESTest(15, "number").min(10);
ESTest(15, "number").integer();
ESTest(15, "number").positive();
ESTest(-15, "number").negative();
ESTest(15, "number").multiple(3);
ESTest(undefined, "number?");
ESTest(undefined, "number?").description("test");

ESTest([], "array");
ESTest([], "array").description("test");
ESTest([1, 2, 3], "array").min(3);
ESTest([1, 2, 3], "array").max(3);
ESTest([1, 2, 3], "array").length(3);
ESTest(undefined, "array?");
ESTest(undefined, "array?").description("test");

ESTest({}, "object");
ESTest({}, "object").description("test");
ESTest(undefined, "object?");
ESTest(undefined, "object?").description("test");

ESTest(true, "boolean");
ESTest(true, "boolean").description("test");
ESTest(undefined, "boolean?");
ESTest(undefined, "boolean?").description("test");

ESTest(1n, "bigint");
ESTest(1n, "bigint").description("test");
ESTest(5n, "bigint").less(10n);
ESTest(5n, "bigint").max(10n);
ESTest(15n, "bigint").greater(10n);
ESTest(15n, "bigint").min(10n);
ESTest(15n, "bigint").positive();
ESTest(-15n, "bigint").negative();
ESTest(15n, "bigint").multiple(3n);
ESTest(undefined, "bigint?");
ESTest(undefined, "bigint?").description("test");

ESTest(undefined, "undefined");
ESTest(undefined, "undefined").description("test");

ESTest(null);
ESTest(null, "null");
ESTest(null, "null").description("test");

ESTest(Symbol("tt"), "symbol");
ESTest(Symbol("tt"), "symbol").description("test");

ESTest(function test() {}, "function");
ESTest(function test() {}, "function").description("test");

// unsafeESTest
unSafeESTest("1", "string");
unSafeESTest("1", "string").description("test");
unSafeESTest("1", "string").max(10);
unSafeESTest("1", "string").min(0);
unSafeESTest("1", "string").length(1);
unSafeESTest("foo@gmail.com", "string").email();
unSafeESTest("john.doe+@example-domain.com", "string").email("html5Email");
unSafeESTest("user.tag+filter@sub.example-domain.co.uk", "string").email(
  "rfc5322Email",
);
unSafeESTest("user.name123@example-domain.com", "string").email("unicodeEmail");
unSafeESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();
unSafeESTest("foo bar", "string").regex(/(foo|bar)/);
unSafeESTest("SGVsbG8gd29ybGQh", "string").base64();
unSafeESTest("Zm9vYmFyXzEyMw", "string").base64url();
unSafeESTest("192.168.1.1", "string").ip4();
unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
unSafeESTest("192.168.1.1/16", "string").cidr4();
unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();
unSafeESTest("🌀", "string").emoji();
unSafeESTest("+886912345678", "string").e164();
unSafeESTest("foobar", "string").lowercase();
unSafeESTest(undefined, "string?");
unSafeESTest(undefined, "string?").description("test");

unSafeESTest(1, "number");
unSafeESTest(1, "number").description("test");
unSafeESTest(5, "number").less(10);
unSafeESTest(5, "number").max(10);
unSafeESTest(15, "number").greater(10);
unSafeESTest(15, "number").min(10);
unSafeESTest(15, "number").integer();
unSafeESTest(15, "number").positive();
unSafeESTest(-15, "number").negative();
unSafeESTest(15, "number").multiple(3);
unSafeESTest(undefined, "number?");
unSafeESTest(undefined, "number?").description("test");

unSafeESTest([], "array");
unSafeESTest([], "array").description("test");
unSafeESTest([1, 2, 3], "array").min(3);
unSafeESTest([1, 2, 3], "array").max(3);
unSafeESTest([1, 2, 3], "array").length(3);
unSafeESTest(undefined, "array?");
unSafeESTest(undefined, "array?").description("test");

unSafeESTest({}, "object");
unSafeESTest({}, "object").description("test");
unSafeESTest(undefined, "object?");
unSafeESTest(undefined, "object?").description("test");

unSafeESTest(true, "boolean");
unSafeESTest(true, "boolean").description("test");
unSafeESTest(undefined, "boolean?");
unSafeESTest(undefined, "boolean?").description("test");

unSafeESTest(1n, "bigint");
unSafeESTest(1n, "bigint").description("test");
unSafeESTest(5n, "bigint").less(10n);
unSafeESTest(5n, "bigint").max(10n);
unSafeESTest(15n, "bigint").greater(10n);
unSafeESTest(15n, "bigint").min(10n);
unSafeESTest(15n, "bigint").positive();
unSafeESTest(-15n, "bigint").negative();
unSafeESTest(15n, "bigint").multiple(3n);
unSafeESTest(undefined, "bigint?");
unSafeESTest(undefined, "bigint?").description("test");

unSafeESTest(undefined, "undefined");
unSafeESTest(undefined, "undefined").description("test");

unSafeESTest(null);
unSafeESTest(null, "null");
unSafeESTest(null, "null").description("test");

unSafeESTest(Symbol("tt"), "symbol");
unSafeESTest(Symbol("tt"), "symbol").description("test");

unSafeESTest(function test() {}, "function");
unSafeESTest(function test() {}, "function").description("test");

// test true is break or not

globalThis.__ESCSS_ESTEST__.isESTestDisabled = true;

// ESTest
ESTest("1", "string");
ESTest("1", "string").description("test");
ESTest("1", "string").max(10);
ESTest("1", "string").min(0);
ESTest("1", "string").length(1);
ESTest("foo@gmail.com", "string").email();
ESTest("john.doe+@example-domain.com", "string").email("html5Email");
ESTest("user.tag+filter@sub.example-domain.co.uk", "string").email(
  "rfc5322Email",
);
ESTest("user.name123@example-domain.com", "string").email("unicodeEmail");
ESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
ESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();
ESTest("foo bar", "string").regex(/(foo|bar)/);
ESTest("SGVsbG8gd29ybGQh", "string").base64();
ESTest("Zm9vYmFyXzEyMw", "string").base64url();
ESTest("192.168.1.1", "string").ip4();
ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
ESTest("192.168.1.1/16", "string").cidr4();
ESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();
ESTest("🌀", "string").emoji();
ESTest("+886912345678", "string").e164();
ESTest("foobar", "string").lowercase();
ESTest(undefined, "string?");
ESTest(undefined, "string?").description("test");

ESTest(1, "number");
ESTest(1, "number").description("test");
ESTest(5, "number").less(10);
ESTest(5, "number").max(10);
ESTest(15, "number").greater(10);
ESTest(15, "number").min(10);
ESTest(15, "number").integer();
ESTest(15, "number").positive();
ESTest(-15, "number").negative();
ESTest(15, "number").multiple(3);
ESTest(undefined, "number?");
ESTest(undefined, "number?").description("test");

ESTest([], "array");
ESTest([], "array").description("test");
ESTest([1, 2, 3], "array").min(3);
ESTest([1, 2, 3], "array").max(3);
ESTest([1, 2, 3], "array").length(3);
ESTest(undefined, "array?");
ESTest(undefined, "array?").description("test");

ESTest({}, "object");
ESTest({}, "object").description("test");
ESTest(undefined, "object?");
ESTest(undefined, "object?").description("test");

ESTest(true, "boolean");
ESTest(true, "boolean").description("test");
ESTest(undefined, "boolean?");
ESTest(undefined, "boolean?").description("test");

ESTest(1n, "bigint");
ESTest(1n, "bigint").description("test");
ESTest(5n, "bigint").less(10n);
ESTest(5n, "bigint").max(10n);
ESTest(15n, "bigint").greater(10n);
ESTest(15n, "bigint").min(10n);
ESTest(15n, "bigint").positive();
ESTest(-15n, "bigint").negative();
ESTest(15n, "bigint").multiple(3n);
ESTest(undefined, "bigint?");
ESTest(undefined, "bigint?").description("test");

ESTest(undefined, "undefined");
ESTest(undefined, "undefined").description("test");

ESTest(null, "null");
ESTest(null, "null").description("test");

ESTest(Symbol("tt"), "symbol");
ESTest(Symbol("tt"), "symbol").description("test");

ESTest(function test() {}, "function");
ESTest(function test() {}, "function").description("test");

// unsafeESTest
unSafeESTest("1", "string");
unSafeESTest("1", "string").description("test");
unSafeESTest("1", "string").max(10);
unSafeESTest("1", "string").min(0);
unSafeESTest("1", "string").length(1);
unSafeESTest("foo@gmail.com", "string").email();
unSafeESTest("john.doe+@example-domain.com", "string").email("html5Email");
unSafeESTest("user.tag+filter@sub.example-domain.co.uk", "string").email(
  "rfc5322Email",
);
unSafeESTest("user.name123@example-domain.com", "string").email("unicodeEmail");
unSafeESTest("550e8400-e29b-41d4-a716-446655440000", "string").uuid4();
unSafeESTest("0189c7e4-3b8a-7e3b-8291-4e6f2b1a4c7d", "string").uuid7();
unSafeESTest("foo bar", "string").regex(/(foo|bar)/);
unSafeESTest("SGVsbG8gd29ybGQh", "string").base64();
unSafeESTest("Zm9vYmFyXzEyMw", "string").base64url();
unSafeESTest("192.168.1.1", "string").ip4();
unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334", "string").ip6();
unSafeESTest("192.168.1.1/16", "string").cidr4();
unSafeESTest("2001:0db8:85a3:0000:0000:8a2e:0370:7334/16", "string").cidr6();
unSafeESTest("🌀", "string").emoji();
unSafeESTest("+886912345678", "string").e164();
unSafeESTest("foobar", "string").lowercase();
unSafeESTest(undefined, "string?");
unSafeESTest(undefined, "string?").description("test");

unSafeESTest(1, "number");
unSafeESTest(1, "number").description("test");
unSafeESTest(5, "number").less(10);
unSafeESTest(5, "number").max(10);
unSafeESTest(15, "number").greater(10);
unSafeESTest(15, "number").min(10);
unSafeESTest(15, "number").integer();
unSafeESTest(15, "number").positive();
unSafeESTest(-15, "number").negative();
unSafeESTest(15, "number").multiple(3);
unSafeESTest(undefined, "number?");
unSafeESTest(undefined, "number?").description("test");

unSafeESTest([], "array");
unSafeESTest([], "array").description("test");
unSafeESTest([1, 2, 3], "array").min(3);
unSafeESTest([1, 2, 3], "array").max(3);
unSafeESTest([1, 2, 3], "array").length(3);
unSafeESTest(undefined, "array?");
unSafeESTest(undefined, "array?").description("test");

unSafeESTest({}, "object");
unSafeESTest({}, "object").description("test");
unSafeESTest(undefined, "object?");
unSafeESTest(undefined, "object?").description("test");

unSafeESTest(true, "boolean");
unSafeESTest(true, "boolean").description("test");
unSafeESTest(undefined, "boolean?");
unSafeESTest(undefined, "boolean?").description("test");

unSafeESTest(1n, "bigint");
unSafeESTest(1n, "bigint").description("test");
unSafeESTest(5n, "bigint").less(10n);
unSafeESTest(5n, "bigint").max(10n);
unSafeESTest(15n, "bigint").greater(10n);
unSafeESTest(15n, "bigint").min(10n);
unSafeESTest(15n, "bigint").positive();
unSafeESTest(-15n, "bigint").negative();
unSafeESTest(15n, "bigint").multiple(3n);
unSafeESTest(undefined, "bigint?");
unSafeESTest(undefined, "bigint?").description("test");

unSafeESTest(undefined, "undefined");
unSafeESTest(undefined, "undefined").description("test");

unSafeESTest(null, "null");
unSafeESTest(null, "null").description("test");

unSafeESTest(Symbol("tt"), "symbol");
unSafeESTest(Symbol("tt"), "symbol").description("test");

unSafeESTest(function test() {}, "function");
unSafeESTest(function test() {}, "function").description("test");
