import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/storage/$repoName/changes",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/storage/$repoName/changes"!</div>;
}
