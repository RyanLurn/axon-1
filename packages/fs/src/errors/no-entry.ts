import { BaseError } from "@repo/errors/base";

export class NoEntryError extends BaseError<"NO_ENTRY_ERROR", ErrnoException> {
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
      name: "NoEntryError",
      message: message ?? cause.message,
      code: "NO_ENTRY_ERROR",
      cause,
    });
    this.path = path;
  }
}
