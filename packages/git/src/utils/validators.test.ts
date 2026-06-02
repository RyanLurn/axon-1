import { expect, test } from "bun:test";

import { repoNameValidator } from "@/utils/validators";

const injectionInputs = [
  "<script>alert('xss')</script>",
  "'; DROP TABLE repositories; --",
  "$(rm -rf /)",
  "`cat /etc/passwd`",
  "${7*7}", // Template injection
  "{{constructor.constructor('return process')().exit()}}", // SSTI
  "../../../etc/passwd", // Path traversal
  "..\\..\\windows\\system32",
];

const lengthInputs = [
  "", // Empty string
  " ", // Just whitespace
  "a".repeat(101), // Over common 100-char limit
  "a".repeat(256), // Over 255-char limit
];

const specialCharInputs = [
  "my repo", // Space
  "my/repo", // Forward slash (URL conflict)
  "my\\repo", // Backslash
  "my.repo.", // Trailing dot
  ".hidden-repo", // Leading dot
  "repo?foo=bar", // Query string chars
  "repo#anchor", // Hash
  "repo%20name", // URL encoded space
  "repo%00name", // Null byte encoded
  "repo@v1", // @ symbol
  "repo:name", // Colon
  "repo*glob", // Glob wildcard
  "repo!name", // Bang
];

const unicodeInputs = [
  "rëpo-nàme", // Accented chars
  "repo\u0000name", // Null byte
  "repo\u200Bname", // Zero-width space
  "repo\uFEFFname", // BOM character
  "\u202E\u202Erepo", // Right-to-left override
  "реро", // Cyrillic lookalikes
  "repo\nname", // Newline
  "repo\tname", // Tab
  "🔥repo", // Emoji
  "repo\r\nname", // CRLF injection
];

const reservedNameInputs = [
  ".",
  "..",
  "CON",
  "PRN",
  "AUX",
  "NUL", // Windows reserved
  "COM1",
  "COM9",
  "LPT1", // Windows device names
  "-repo", // Leading hyphen (git conflict)
  "repo-", // Trailing hyphen
  "--repo", // Double leading hyphen
];

const typeConfusionInputs = [null, undefined, 0, false, {}, NaN, Infinity];

const allInputs = [
  ...injectionInputs,
  ...lengthInputs,
  ...specialCharInputs,
  ...unicodeInputs,
  ...reservedNameInputs,
  ...typeConfusionInputs,
];

test.each(allInputs)("repoNameValidator should reject %p", (input) => {
  const parseInputResult = repoNameValidator.safeParse(input);
  expect(parseInputResult.success).toBeFalse();
});
