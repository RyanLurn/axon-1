import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * This function is created for writing tests.
 * Currently, there isn't a place for it in the business logic.
 * Therefore, it is just a dumb wrapper around the mkdtemp function.
 */
export async function makeTemporaryDirectory(
  prefix: string
): Promise<Result<string, UnexpectedError>> {
  const joinedPath = join(tmpdir(), prefix);
  try {
    const returnedPath = await mkdtemp(joinedPath);
    return {
      success: true,
      data: returnedPath,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Failed to create a temporary directory "${joinedPath}".`,
        cause: error,
      }),
    };
  }
}
