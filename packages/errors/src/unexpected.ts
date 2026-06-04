import { BaseError } from "@/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  constructor({ message, cause }: { message: string; cause: unknown }) {
    super({
      name: "UnexpectedError",
      message,
      code: "UNEXPECTED_ERROR",
      cause,
    });
  }
}
