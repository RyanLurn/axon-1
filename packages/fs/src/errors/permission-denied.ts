import { BaseError } from "@repo/errors/base";

export class PermissionDeniedError extends BaseError<
  "PERMISSION_DENIED_ERROR",
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
      name: "PermissionDeniedError",
      message:
        message ??
        `The current process doesn't have permission to access ${path}.`,
      code: "PERMISSION_DENIED_ERROR",
      cause,
    });
    this.path = path;
  }
}
