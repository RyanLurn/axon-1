import { BaseError } from "@repo/errors/base";

import type { RealPath } from "@/types";

export class NotDirectoryPathError extends BaseError<
  "NOT_DIRECTORY_PATH_ERROR",
  null
> {
  path: RealPath;

  constructor({ message, path }: { message?: string; path: RealPath }) {
    super({
      name: "NotDirectoryPathError",
      message: message ?? `${path} is not a directory path.`,
      code: "NOT_DIRECTORY_PATH_ERROR",
      cause: null,
    });
    this.path = path;
  }
}
