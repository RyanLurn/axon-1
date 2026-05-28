import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
});

function ChatPage() {
  return (
    <div>
      Placeholder page for future user-agent chat feature. Currently used for
      testing route protection logic.
    </div>
  );
}
