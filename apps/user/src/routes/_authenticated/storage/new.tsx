import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/storage/new")({
  component: NewRepoPage,
});

function NewRepoPage() {
  return <div>Hello "/_authenticated/storage/new"!</div>;
}
