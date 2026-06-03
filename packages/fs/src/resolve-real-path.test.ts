import { UnexpectedError } from "@repo/errors/unexpected";
import { describe, expect, test } from "bun:test";
import { join } from "node:path";

import { resolveRealPath } from "@/resolve-real-path";
import { NoEntryError } from "@/errors/no-entry";

describe("resolveRealPath function should", () => {
  test("successfully resolve a path that exists on the file system", async () => {
    const resolveThisFileResult = await resolveRealPath(import.meta.path);
    expect(resolveThisFileResult.success).toBeTrue();
  });

  test("fail to resolve a path that doesn't exist on the file system", async () => {
    expect.assertions(2);

    const resolveFakeFileResult = await resolveRealPath(
      join(import.meta.dir, "yo.wtf")
    );
    expect(resolveFakeFileResult.success).toBeFalse();

    if (!resolveFakeFileResult.success) {
      expect(resolveFakeFileResult.error).toBeInstanceOf(NoEntryError);
    }
  });

  test("fail to resolve a path that is too long", async () => {
    expect.assertions(3);

    const resolveLongPathResult = await resolveRealPath(
      `${"yo".repeat(10_000)}.wtf`
    );
    expect(resolveLongPathResult.success).toBeFalse();

    if (!resolveLongPathResult.success) {
      const error = resolveLongPathResult.error;
      expect(error).toBeInstanceOf(UnexpectedError);

      if (error.cause instanceof Error) {
        const cause = error.cause;
        if ("code" in cause) {
          expect(cause.code).toBe("ENAMETOOLONG");
        }
      }
    }
  });
});
