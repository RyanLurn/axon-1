import { createRouter } from "@tanstack/react-router";

import { DefaultNotFoundComponent } from "@/components/default/not-found";
import { DefaultErrorComponent } from "@/components/default/error";
import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: DefaultNotFoundComponent,
    defaultErrorComponent: DefaultErrorComponent,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
