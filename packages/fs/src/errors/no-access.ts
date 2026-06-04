import { BaseError } from "@repo/errors/base";

export class NoAccessError extends BaseError<
  "NO_ACCESS_ERROR",
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
      name: "NoAccessError",
      message: message ?? cause.message,
      code: "NO_ACCESS_ERROR",
      cause,
    });
    this.path = path;
  }
}
