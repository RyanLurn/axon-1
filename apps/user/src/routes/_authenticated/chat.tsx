import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
});

function ChatPage() {
  return (
    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
      Chat — coming soon
    </div>
  );
}
