import { setResponseStatus } from "@tanstack/react-start/server";
import { getAppUser } from "@repo/auth/operations/get-app-user";
import { createMiddleware } from "@tanstack/react-start";

import { UIError } from "@/lib/error";

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const getAppUserResult = await getAppUser(request);

    if (!getAppUserResult.success) {
      console.error(getAppUserResult.error);
      setResponseStatus(401);
      throw new UIError({
        message: "Unauthenticated",
        code: "UNAUTHENTICATED_ERROR",
      });
    }

    return next({ context: { user: getAppUserResult.data } });
  }
);
