import { BaseError } from "@repo/errors/base";

export class BaseFsError<TCode extends string> extends BaseError<
  TCode,
  ErrnoException
> {
  path: string;

  constructor({
    name,
    message,
    code,
    path,
    cause,
  }: {
    name: string;
    message?: string;
    code: TCode;
    path: string;
    cause: ErrnoException;
  }) {
    super({
      name,
      message: message ?? cause.message,
      code,
      cause,
    });
    this.path = path;
  }
}
