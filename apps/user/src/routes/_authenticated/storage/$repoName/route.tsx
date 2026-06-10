import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { FolderGit2 } from "lucide-react";
import { ArrowLeft } from "lucide-react";

import { getRepoFn } from "@/features/storage/server-functions/get-repo";
import { RepoTabs } from "@/features/storage/components/repo-tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/storage/$repoName")({
  loader: ({ params }) =>
    getRepoFn({ data: { column: "name", value: params.repoName } }),
  notFoundComponent: RepoNotFound,
  component: RepoLayout,
});

function RepoLayout() {
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

      <RepoTabs repoName={repo.name} />

      <div className="flex-1 overflow-y-auto">
        <Outlet />
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

      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
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
