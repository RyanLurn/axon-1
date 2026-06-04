export class BaseError<TCode extends string, TCause = unknown> extends Error {
  code: TCode;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
  }
}
