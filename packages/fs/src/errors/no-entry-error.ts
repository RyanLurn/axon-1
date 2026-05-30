import { BaseError } from "@repo/errors/base";

export class NoEntryError extends BaseError<"NO_ENTRY_ERROR"> {
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
      message: message ?? `No file or directory exists at ${path}.`,
      code: "NO_ENTRY_ERROR",
      cause,
    });
    this.path = path;
  }
}
