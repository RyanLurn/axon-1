import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { mkdir } from "node:fs/promises";

export async function makeDirectory({
  path,
  recursive = false,
}: {
  path: string;
  recursive?: boolean;
}): Promise<Result<undefined | string, UnexpectedError>> {
  try {
    const mkdirResult = await mkdir(path, { recursive });
    return {
      success: true,
      data: mkdirResult,
    };
  } catch (error) {
    return {
      success: false,
      error: new UnexpectedError({
        message: `Something went wrong while creating a directory at "${path}".`,
        cause: error,
      }),
    };
  }
}
