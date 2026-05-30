import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { userAuth } from "@repo/auth";

export const getCurrentSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  return await userAuth.api.getSession({ headers });
});
