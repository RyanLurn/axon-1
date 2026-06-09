import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";

export const Route = createFileRoute(
  "/_authenticated/storage/$repoName/changes"
)({
  component: ChangesTab,
});

function ChangesTab() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <Construction className="size-8 text-muted-foreground/50" />
      <p className="text-sm font-medium">Change requests are coming soon</p>
      <p className="text-xs text-muted-foreground">
        This tab will show open and merged change requests.
      </p>
    </div>
  );
}
