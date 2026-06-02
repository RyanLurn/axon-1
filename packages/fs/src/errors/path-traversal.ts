import { BaseError } from "@repo/errors/base";

import type { RealDirectoryPath, RealPath } from "@/types";

export class PathTraversalError extends BaseError<
  "PATH_TRAVERSAL_ERROR",
  null
> {
  path: string;
  realPath: RealPath;
  requiredPrefix: RealDirectoryPath;

  constructor({
    message,
    path,
    realPath,
    requiredPrefix,
  }: {
    message?: string;
    path: string;
    realPath: RealPath;
    requiredPrefix: RealDirectoryPath;
  }) {
    super({
      name: "PathTraversalError",
      message: message ?? `${path} escapses ${requiredPrefix}.`,
      code: "PATH_TRAVERSAL_ERROR",
      cause: null,
    });
    this.path = path;
    this.realPath = realPath;
    this.requiredPrefix = requiredPrefix;
  }
}
