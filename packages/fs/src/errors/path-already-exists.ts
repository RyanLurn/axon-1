import { BaseFsError } from "@/errors/base-fs";

export class PathAlreadyExistsError extends BaseFsError<"PATH_ALREADY_EXISTS_ERROR"> {
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
      name: "PathAlreadyExistsError",
      message,
      code: "PATH_ALREADY_EXISTS_ERROR",
      cause,
      path,
    });
  }
}
