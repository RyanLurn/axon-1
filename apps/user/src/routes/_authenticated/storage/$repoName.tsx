import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderGit2, ArrowLeft } from "lucide-react";

import { getRepoFn } from "@/features/storage/server-functions/get-repo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/storage/$repoName")({
  loader: ({ params }) =>
    getRepoFn({ data: { column: "name", value: params.repoName } }),
  notFoundComponent: RepoNotFound,
  component: RepoDetailPage,
});

function RepoDetailPage() {
  const repo = Route.useLoaderData();

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "-ml-1.5"
          )}
          aria-label="Back to storage"
          to="/storage"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-sm font-medium">{repo.name}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex items-start gap-3">
          <FolderGit2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-sm font-medium">{repo.name}</p>
            {repo.description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {repo.description}
              </p>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground/60 italic">
                No description.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RepoNotFound() {
  const { repoName } = Route.useParams();

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "-ml-1.5"
          )}
          aria-label="Back to storage"
          to="/storage"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-sm font-medium text-muted-foreground">Not found</h1>
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <FolderGit2 className="size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium">
          No repository named &ldquo;{repoName}&rdquo;
        </p>
        <p className="text-xs text-muted-foreground">
          It may have been deleted or the link may be wrong.
        </p>
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-2"
          )}
          to="/storage"
        >
          Back to storage
        </Link>
      </div>
    </div>
  );
}
