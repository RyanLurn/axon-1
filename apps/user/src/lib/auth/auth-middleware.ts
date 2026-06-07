import { FailedSessionUpdateError } from "@repo/auth/errors/failed-session-update";
import { InternalAuthAPIError } from "@repo/auth/errors/internal-auth-api";
import { setResponseStatus } from "@tanstack/react-start/server";
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
        switch (error.status) {
          case "INTERNAL_SERVER_ERROR": {
            const authError = new InternalAuthAPIError(error);
            console.error(authError);
            break;
          }
          case "UNAUTHORIZED": {
            const authError = new FailedSessionUpdateError(error);
            console.error(authError);
            break;
          }
        }
      }

      setResponseStatus(403);
      // eslint-disable-next-line preserve-caught-error
      throw new Error("Unauthorized");
    }
  }
);
