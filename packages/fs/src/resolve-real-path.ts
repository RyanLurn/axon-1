import type { Result } from "@repo/path/types/src/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { realpath } from "node:fs/promises";

import type { RealPath } from "@/types";

import { PathTooLongError } from "@/errors/path-too-long";
import { NoEntryError } from "@/errors/no-entry";

export async function resolveRealPath(
  path: string
): Promise<
  Result<RealPath, PathTooLongError | UnexpectedError | NoEntryError>
> {
  try {
    const resolvedPath = await realpath(path);
    return {
      isOk: true,
      data: resolvedPath as RealPath,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      typeof error.code === "string"
    ) {
      switch (error.code) {
        case "ENAMETOOLONG": {
          return {
            isOk: false,
            error: new PathTooLongError({
              path,
              cause: error as ErrnoException,
            }),
          };
        }
        case "ENOENT": {
          return {
            isOk: false,
            error: new NoEntryError({ path, cause: error as ErrnoException }),
          };
        }
      }
    }

    return {
      isOk: false,
      error: new UnexpectedError({
        message: "An unexpected error occurred while executing realpath.",
        cause: error,
      }),
    };
  }
}
