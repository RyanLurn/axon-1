import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/repos/")({
  component: ReposPage,
});

function ReposPage() {
  return <div>Hello "/_authenticated/repos/"!</div>;
}
