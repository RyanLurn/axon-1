import { BaseError } from "@repo/errors/base";

export class UIError extends BaseError<string, null> {
  constructor({ message, code }: { message: string; code: string }) {
    super({ name: "UIError", message, code, cause: null });
  }
}

export const INTERNAL_SERVER_ERROR_CODE = "INTERNAL_SERVER_ERROR";

export function createInternalServerError() {
  return new UIError({
    message: "Something went wrong. Please try again later or contact support.",
    code: INTERNAL_SERVER_ERROR_CODE,
  });
}
