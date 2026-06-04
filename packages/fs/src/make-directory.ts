import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { mkdir } from "node:fs/promises";

import { PathAlreadyExistsError } from "@/errors/path-already-exists";
import { NoAccessError } from "@/errors/no-access";
import { NoEntryError } from "@/errors/no-entry";

export async function makeDirectory({
  path,
  recursive = false,
}: {
  path: string;
  recursive?: boolean;
}): Promise<
  Result<
    null,
    PathAlreadyExistsError | UnexpectedError | NoAccessError | NoEntryError
  >
> {
  try {
    await mkdir(path, { recursive });
    return {
      success: true,
      data: null,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      const cause = error as ErrnoException;

      switch (cause.code) {
        case "EEXIST": {
          return {
            success: false,
            error: new PathAlreadyExistsError({ path, cause }),
          };
        }
        case "ENOENT": {
          return {
            success: false,
            error: new NoEntryError({ path, cause }),
          };
        }
        case "EACCES": {
          return {
            success: false,
            error: new NoAccessError({ path, cause }),
          };
        }
      }
    }

    return {
      success: false,
      error: new UnexpectedError({
        message: `An unexpected error occurred while creating a new directory at "${path}".`,
        cause: error,
      }),
    };
  }
}
