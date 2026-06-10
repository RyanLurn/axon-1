import { BaseError } from "@repo/errors/base";

export class UIError extends BaseError<string, null> {
  constructor({ message, code }: { message: string; code: string }) {
    super({ name: "UIError", message, code, cause: null });
  }
}
