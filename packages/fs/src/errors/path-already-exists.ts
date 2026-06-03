import { BaseError } from "@repo/errors/base";

export class PathAlreadyExistsError extends BaseError<
  "PATH_ALREADY_EXISTS_ERROR",
  ErrnoException
> {
  path: string;

  constructor({
    message,
    path,
    cause,
  }: {
    message?: string;
    path: string;
    cause: ErrnoException;
  }) {
    super({
      name: "PathAlreadyExistsError",
      message: message ?? `"${path}" already exists.`,
      code: "PATH_ALREADY_EXISTS_ERROR",
      cause,
    });
    this.path = path;
  }
}
