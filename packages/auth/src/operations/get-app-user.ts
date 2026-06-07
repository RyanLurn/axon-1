import type { Result } from "@repo/types/result";

import { UnexpectedError } from "@repo/errors/unexpected";
import { isAPIError } from "better-auth/api";

import type { AppUser } from "@/types";

import { FailedSessionUpdateError } from "@/errors/failed-session-update";
import { InternalAuthAPIError } from "@/errors/internal-auth-api";
import { UnauthenticatedError } from "@/errors/unauthenticated";
import { userAuth } from "@/index";

export async function getAppUser({
  headers,
  method,
  url,
}: {
  headers: Headers;
  method: string;
  url: string;
}): Promise<
  Result<
    AppUser,
    | FailedSessionUpdateError
    | InternalAuthAPIError
    | UnauthenticatedError
    | UnexpectedError
  >
> {
  try {
    const session = await userAuth.api.getSession({
      headers,
    });

    if (!session) {
      return {
        success: false,
        error: new UnauthenticatedError({ method, url }),
      };
    }

    return {
      success: true,
      data: session.user as AppUser,
    };
  } catch (error) {
    if (isAPIError(error)) {
      // From Better Auth's source code (see "https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/api/routes/session.ts#L461"), we know that if the status is "UNAUTHORIZED", it's because the library "Handle case where session update fails (e.g., concurrent deletion)"
      const authError =
        error.status === "UNAUTHORIZED"
          ? new FailedSessionUpdateError(error)
          : new InternalAuthAPIError(error);

      return {
        success: false,
        error: authError,
      };
    }

    return {
      success: false,
      error: new UnexpectedError({
        message: "Something went wrong while getting user's auth session.",
        cause: error,
      }),
    };
  }
}
