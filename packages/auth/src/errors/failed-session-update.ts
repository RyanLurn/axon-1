import type { APIError } from "better-auth";

import { AuthAPIError } from "@/errors/auth-api";

export class FailedSessionUpdateError extends AuthAPIError<"FAILED_SESSION_UPDATE_ERROR"> {
  constructor(cause: APIError) {
    super({
      name: "FailedSessionUpdateError",
      message: "Failed to update session.",
      code: "FAILED_SESSION_UPDATE_ERROR",
      cause,
    });
  }
}
