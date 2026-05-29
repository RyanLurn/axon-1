import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/chat")({
  component: ChatPage,
});

/**
 * Placeholder page for future user-agent chat feature.
 * Currently used for testing route protection logic.
 */
function ChatPage() {
  const { user } = Route.useRouteContext();

  return <div>Welcome back, {user.name}</div>;
}
