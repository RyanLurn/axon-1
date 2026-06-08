import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/storage")({
  component: StoragePage,
});

function StoragePage() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
      Storage — coming soon
    </div>
  );
}
