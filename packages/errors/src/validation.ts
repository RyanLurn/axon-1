import { prettifyError, type ZodError } from "zod";

import { BaseError } from "@/base";

export class ValidationError<TValidatorName extends string> extends BaseError<
  "VALIDATION_ERROR",
  ZodError
> {
  validatorName: TValidatorName;

  constructor({
    message,
    validatorName,
    cause,
  }: {
    message?: string;
    validatorName: TValidatorName;
    cause: ZodError;
  }) {
    super({
      name: "ValidationError",
      message: message ?? prettifyError(cause),
      code: "VALIDATION_ERROR",
      cause,
    });
    this.validatorName = validatorName;
  }
}
