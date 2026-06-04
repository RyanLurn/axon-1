import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { mkdir } from "node:fs/promises";

import { PathAlreadyExistsError } from "@/errors/path-already-exists";
import { NoEntryError } from "@/errors/no-entry";

export async function makeDirectory({
  path,
  recursive = false,
}: {
  path: string;
  recursive?: boolean;
}): Promise<
  Result<
    undefined | string,
    PathAlreadyExistsError | UnexpectedError | NoEntryError
  >
> {
  try {
    const mkdirResult = await mkdir(path, { recursive });
    return {
      success: true,
      data: mkdirResult,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      const exception = error as ErrnoException;

      switch (exception.code) {
        case "EEXIST": {
          return {
            success: false,
            error: new PathAlreadyExistsError({
              message: `Failed to make a new directory at "${path}" because it already exists.`,
              path,
              cause: exception,
            }),
          };
        }
        case "ENOENT": {
          return {
            success: false,
            error: new NoEntryError({
              message: `Failed to make a new directory at "${path}" because a directory component in path does not exist.`,
              path,
              cause: exception,
            }),
          };
        }
      }
    }
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while creating a directory at "${path}".`,
        cause: error,
      }),
    };
  }
}
