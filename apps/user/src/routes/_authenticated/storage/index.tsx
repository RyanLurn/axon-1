import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderGit2 } from "lucide-react";

import { listReposFn } from "@/features/storage/server-functions/list-repos";

export const Route = createFileRoute("/_authenticated/storage/")({
  loader: () => listReposFn(),
  component: RepoListPage,
});

function RepoListPage() {
  const repos = Route.useLoaderData();

  return (
    <div className="flex size-full flex-col">
      <div className="border-b px-6 py-4">
        <h1 className="text-sm font-medium">Storage</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {repos.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="divide-y">
            {repos.map((repo) => (
              <li key={repo.id}>
                <Link
                  className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted/50"
                  params={{ repoName: repo.name }}
                  to="/storage/$repoName"
                >
                  <FolderGit2 className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{repo.name}</p>
                    {repo.description && (
                      <p className="truncate text-xs text-muted-foreground">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <FolderGit2 className="size-8 text-muted-foreground/50" />
      <p className="text-sm font-medium">No repositories yet</p>
      <p className="text-xs text-muted-foreground">
        Repositories you create will appear here.
      </p>
    </div>
  );
}
