import { createFileRoute } from "@tanstack/react-router";
import { gitServer } from "@repo/git";

export const Route = createFileRoute("/git/$")({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        return gitServer.basePath("/git").fetch(request);
      },
    },
  },
});
