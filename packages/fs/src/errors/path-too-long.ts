import { BaseError } from "@repo/errors/base";

export class PathTooLongError extends BaseError<"PATH_TOO_LONG_ERROR"> {
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
      name: "PathTooLongError",
      message: message ?? "Path is too long.",
      code: "PATH_TOO_LONG_ERROR",
      cause,
    });
    this.path = path;
  }
}
