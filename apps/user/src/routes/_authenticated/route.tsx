import { createFileRoute, redirect } from "@tanstack/react-router";

import { getCurrentSession } from "@/lib/auth/server-functions/get-current-session";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const session = await getCurrentSession();

    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }

    return { user: session.user };
  },
});
