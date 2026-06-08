import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadUserFn } from "@/features/auth/server-functions/load-user";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = await loadUserFn();

    if (!user) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }

    return { user };
  },
});
