import { FailedSessionUpdateError } from "@repo/auth/errors/failed-session-update";
import { InternalAuthAPIError } from "@repo/auth/errors/internal-auth-api";
import { setResponseStatus } from "@tanstack/react-start/server";
import { UnexpectedError } from "@repo/errors/unexpected";
import { createMiddleware } from "@tanstack/react-start";
import { isAPIError } from "better-auth/api";
import { userAuth } from "@repo/auth";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    try {
      const session = await userAuth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        setResponseStatus(403);
        throw new Error("Unauthorized");
      }

      // Inject session into context for downstream handlers
      return next({ context: { user: session.user } });
    } catch (error) {
      if (isAPIError(error)) {
        // From Better Auth's source code (see "https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/api/routes/session.ts#L461"), we know that if the status is "UNAUTHORIZED", it's because the library "Handle case where session update fails (e.g., concurrent deletion)"
        const authError =
          error.status === "UNAUTHORIZED"
            ? new FailedSessionUpdateError(error)
            : new InternalAuthAPIError(error);
        console.error(authError);
      } else {
        const unexpectedError = new UnexpectedError({
          message: "Something went wrong while getting user's auth session.",
          cause: error,
        });
        console.error(unexpectedError);
      }

      setResponseStatus(403);
      // eslint-disable-next-line preserve-caught-error
      throw new Error("Unauthorized");
    }
  }
);
