import { BaseError } from "@repo/errors/base";

export class IOError extends BaseError<"IO_ERROR"> {
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
      name: "IOError",
      message:
        message ??
        `An I/O error occurred while reading ${path} from the filesystem.`,
      code: "IO_ERROR",
      cause,
    });
    this.path = path;
  }
}
