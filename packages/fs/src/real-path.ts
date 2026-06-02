import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { realpath } from "node:fs/promises";
import { stat } from "node:fs/promises";

import type { RealDirectoryPath, RealPath } from "@/types";

import { NotADirectoryPathError } from "@/errors/not-a-directory-path";
import { NoEntryError } from "@/errors/no-entry";

export async function resolveRealPath(
  path: string
): Promise<Result<RealPath, UnexpectedError | NoEntryError>> {
  try {
    const resolvedPath = await realpath(path);
    return {
      isOk: true,
      data: resolvedPath as RealPath,
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

export async function resolveRealDirectoryPath(
  path: string
): Promise<
  Result<
    RealDirectoryPath,
    NotADirectoryPathError | UnexpectedError | NoEntryError
  >
> {
  const resolveRealPathResult = await resolveRealPath(path);
  if (resolveRealPathResult.isOk === false) {
    return resolveRealPathResult;
  }
  const realPath = resolveRealPathResult.data;

  try {
    const stats = await stat(realPath);
    if (stats.isDirectory()) {
      return {
        isOk: true,
        data: realPath as unknown as RealDirectoryPath,
      };
    }
    return {
      isOk: false,
      error: new NotADirectoryPathError({ path, realPath }),
    };
  } catch (error) {
    return {
      isOk: false,
      error: new UnexpectedError({
        message: `An unexpected error occurred while checking information about ${path}.`,
        cause: error,
      }),
    };
  }
}
