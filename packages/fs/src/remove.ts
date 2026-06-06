import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { rm } from "node:fs/promises";

import { NoAccessError } from "@/errors/no-access";
import { NoEntryError } from "@/errors/no-entry";

export async function remove(
  path: string
): Promise<Result<null, UnexpectedError | NoAccessError | NoEntryError>> {
  try {
    await rm(path, { recursive: true });
    return { success: true, data: null };
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
            error: new NoAccessError({ path, cause }),
          };
        }
      }
    }

    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while removing "${path}".`,
        cause: error,
      }),
    };
  }
}
