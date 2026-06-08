import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { loadUserFn } from "@/features/auth/server-functions/load-user";
import { NavRail } from "@/components/nav/rail";

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
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <div className="flex h-screen">
      <NavRail />
      <main className="flex flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
