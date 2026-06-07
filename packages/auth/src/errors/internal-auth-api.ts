import type { APIError } from "better-auth";

import { AuthAPIError } from "@/errors/auth-api";

export class InternalAuthAPIError extends AuthAPIError<"INTERNAL_AUTH_API_ERROR"> {
  constructor(cause: APIError) {
    super({
      name: "InternalAuthAPIError",
      message: cause.message,
      code: "INTERNAL_AUTH_API_ERROR",
      cause,
    });
  }
}
