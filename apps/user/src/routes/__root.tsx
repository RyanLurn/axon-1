import type { ReactNode } from "react";

import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { ThemeProvider } from "@/components/providers/theme";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import styles from "@/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Axon 1",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { type: "image/svg+xml", href: "/favicon.svg", rel: "icon" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <Toaster position="top-center" closeButton richColors />
          <div className="h-screen">{children}</div>
          <ModeToggle className="fixed top-3 right-3 z-50" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
