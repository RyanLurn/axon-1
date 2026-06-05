import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/storage/")({
  component: StoragePage,
});

function StoragePage() {
  return <div>Hello "/_authenticated/storage/"!</div>;
}
