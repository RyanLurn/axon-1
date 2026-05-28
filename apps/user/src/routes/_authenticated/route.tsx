import { createFileRoute, redirect } from "@tanstack/react-router";

import { getSession } from "@/lib/auth/server-functions/get-session";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      throw redirect({
        to: "/sign-in",
        search: { redirect: location.href },
      });
    }

    return { user: session.user };
  },
});
