import { getAppUser } from "@repo/auth/operations/get-app-user";
import { getRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const loadCurrentUser = createServerFn().handler(async () => {
  const request = getRequest();
  const getAppUserResult = await getAppUser(request);

  if (!getAppUserResult.success) {
    console.error(getAppUserResult.error);
    return null;
  }

  return getAppUserResult.data;
});
