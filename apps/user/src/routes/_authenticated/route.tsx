import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedPathlessLayout,
});

function AuthenticatedPathlessLayout() {
  return <div>Hello "/_authenticated"!</div>;
}
