import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/storage/$repoName/")({
  component: FilesPage,
});

function FilesPage() {
  return <div>Hello "/_authenticated/storage/$repoName/"!</div>;
}
