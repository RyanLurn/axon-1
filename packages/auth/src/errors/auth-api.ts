import type { APIError } from "better-auth";

import { BaseError } from "@repo/errors/base";

export class AuthAPIError<TCode extends string> extends BaseError<
  TCode,
  APIError
> {
  constructor({
    name,
    message,
    code,
    cause,
  }: {
    name: string;
    message?: string;
    code: TCode;
    cause: APIError;
  }) {
    super({ name, message: message ?? cause.message, code, cause });
  }
}
