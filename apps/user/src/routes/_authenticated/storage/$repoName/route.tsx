import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/storage/$repoName")({
  component: RepoLayout,
});

function RepoLayout() {
  return <div>Hello "/_authenticated/storage/$repoName"!</div>;
}
