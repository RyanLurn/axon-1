import { BaseError } from "@repo/errors/base";

export class NotAbsolutePathError extends BaseError<
  "NOT_ABSOLUTE_PATH_ERROR",
  null
> {
  constructor({ path }: { path: string }) {
    super({
      name: "NotAbsolutePathError",
      message: `${path} is not an absolute path.`,
      code: "NOT_ABSOLUTE_PATH_ERROR",
      cause: null,
    });
  }
}
