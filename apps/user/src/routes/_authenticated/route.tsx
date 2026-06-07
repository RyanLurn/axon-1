import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadCurrentUser } from "@/features/auth/server-functions/load-current-user";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = await loadCurrentUser();

    if (!user) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }

    return { user };
  },
});
