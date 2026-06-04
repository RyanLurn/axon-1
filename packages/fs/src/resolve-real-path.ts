import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { realpath } from "node:fs/promises";

import { PermissionDeniedError } from "@/errors/permission-denied";
import { NoEntryError } from "@/errors/no-entry";

export async function resolveRealPath(
  path: string
): Promise<
  Result<string, PermissionDeniedError | UnexpectedError | NoEntryError>
> {
  try {
    const resolvedPath = await realpath(path);
    return {
      success: true,
      data: resolvedPath,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      const cause = error as ErrnoException;

      switch (cause.code) {
        case "ENOENT": {
          return {
            success: false,
            error: new NoEntryError({ path, cause }),
          };
        }
        case "EACCES": {
          return {
            success: false,
            error: new PermissionDeniedError({ path, cause }),
          };
        }
      }
    }

    return {
      success: false,
      error: new UnexpectedError({
        message: `An unexpected error occurred while resolving "${path}".`,
        cause: error,
      }),
    };
  }
}
