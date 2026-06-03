import { describe, expect, test } from "bun:test";

import { resolveRealPath } from "@/resolve-real-path";

describe("resolveRealPath function should", () => {
  test("successfully resolve a path that exists on the file system", async () => {
    const resolveThisFileResult = await resolveRealPath(import.meta.path);
    expect(resolveThisFileResult.success).toBeTrue();
  });
});
