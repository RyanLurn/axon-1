import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@repo/auth";

export const getSession = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  return await auth.api.getSession({ headers });
});
