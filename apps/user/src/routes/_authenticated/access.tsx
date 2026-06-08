import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/access")({
  component: AccessPage,
});

function AccessPage() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
      Access — coming soon
    </div>
  );
}
