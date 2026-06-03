import type { Result } from "@repo/types/result";
import type { RmOptions } from "node:fs";

import { UnexpectedError } from "@repo/errors/unexpected";
import { rm } from "node:fs/promises";

/**
 * This function is created for writing tests.
 * Currently, there isn't a place for it in the business logic.
 * Therefore, it is just a dumb wrapper around the rm function.
 */
export async function remove(
  path: string,
  options: RmOptions = {}
): Promise<Result<null, UnexpectedError>> {
  try {
    await rm(path, options);
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Failed to remove files and directories in "${path}".`,
        cause: error,
      }),
    };
  }
}
