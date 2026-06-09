import { MatchRoute, Link } from "@tanstack/react-router";

import { Route as SettingsRoute } from "@/routes/_authenticated/storage/$repoName/settings";
import { Route as ChangesRoute } from "@/routes/_authenticated/storage/$repoName/changes";
import { Route as FilesRoute } from "@/routes/_authenticated/storage/$repoName";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Files", to: FilesRoute.to, fuzzy: true },
  { label: "Changes", to: ChangesRoute.to, fuzzy: true },
  { label: "Settings", to: SettingsRoute.to, fuzzy: false },
];

export function RepoTabs({ repoName }: { repoName: string }) {
  return (
    <div className="flex gap-1 border-b px-6">
      {TABS.map(({ label, to, fuzzy }) => {
        return (
          <MatchRoute fuzzy={fuzzy} key={label} to={to}>
            {(match) => (
              <Link
                className={cn(
                  "relative -mb-px border-b-2 px-1 py-3 text-sm transition-colors",
                  match
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                params={{ repoName }}
                to={to}
              >
                {label}
              </Link>
            )}
          </MatchRoute>
        );
      })}
    </div>
  );
}
