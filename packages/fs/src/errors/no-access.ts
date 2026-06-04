import { BaseFsError } from "@/errors/base-fs";

export class NoAccessError extends BaseFsError<"NO_ACCESS_ERROR"> {
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
      message,
      code: "NO_ACCESS_ERROR",
      cause,
      path,
    });
  }
}
