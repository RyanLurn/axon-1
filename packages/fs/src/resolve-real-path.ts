import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { realpath } from "node:fs/promises";

import { NoEntryError } from "@/errors/no-entry";

export async function resolveRealPath(
  path: string
): Promise<Result<string, UnexpectedError | NoEntryError>> {
  try {
    const resolvedPath = await realpath(path);
    return {
      isOk: true,
      data: resolvedPath,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return {
        isOk: false,
        error: new NoEntryError({ path, cause: error as ErrnoException }),
      };
    }

    return {
      isOk: false,
      error: new UnexpectedError({
        message: `An unexpected error occurred while resolving ${path}.`,
        cause: error,
      }),
    };
  }
}
