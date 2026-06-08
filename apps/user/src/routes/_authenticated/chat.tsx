import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
});

function ChatPage() {
  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
    Chat — coming soon
  </div>;
}
