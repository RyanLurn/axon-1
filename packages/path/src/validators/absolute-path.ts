import type { Result } from "@repo/types/result";

import { isAbsolute } from "node:path";

import type { AbsolutePath } from "@/types";

import { NotAbsolutePathError } from "@/errors/not-absolute-path";

export function validateAbsolutePath(
  path: string
): Result<AbsolutePath, NotAbsolutePathError> {
  if (isAbsolute(path)) {
    return {
      isOk: true,
      data: path as AbsolutePath,
    };
  }

  return {
    isOk: false,
    error: new NotAbsolutePathError({ path }),
  };
}
