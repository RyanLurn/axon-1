import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { auth } from "@repo/auth";

export const getUser = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const getSessionResult = await auth.api.getSession({ headers });

  if (getSessionResult) {
    return getSessionResult.user;
  }

  throw redirect({
    to: "/sign-in",
    search: { redirect: location.href },
  });
});
