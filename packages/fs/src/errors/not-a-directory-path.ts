import { BaseError } from "@repo/errors/base";

import type { RealPath } from "@/types";

export class NotADirectoryPathError extends BaseError<
  "NOT_A_DIRECTORY_PATH_ERROR",
  null
> {
  path: string;
  realPath: RealPath;

  constructor({
    message,
    path,
    realPath,
  }: {
    message?: string;
    path: string;
    realPath: RealPath;
  }) {
    super({
      name: "NotADirectoryPathError",
      message: message ?? `${path} is not a directory path.`,
      code: "NOT_A_DIRECTORY_PATH_ERROR",
      cause: null,
    });
    this.path = path;
    this.realPath = realPath;
  }
}
