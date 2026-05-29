import { createFileRoute } from "@tanstack/react-router";
import { userAuth } from "@repo/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        return await userAuth.handler(request);
      },
      POST: async ({ request }: { request: Request }) => {
        return await userAuth.handler(request);
      },
    },
  },
});
