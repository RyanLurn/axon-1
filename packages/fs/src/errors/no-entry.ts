import { BaseFsError } from "@/errors/base-fs";

export class NoEntryError extends BaseFsError<"NO_ENTRY_ERROR"> {
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
      message,
      code: "NO_ENTRY_ERROR",
      cause,
      path,
    });
  }
}
