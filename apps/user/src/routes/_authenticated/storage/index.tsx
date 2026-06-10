import { createFileRoute, Link } from "@tanstack/react-router";

import { EmptyRepoList } from "@/features/storage/components/empty-repo-list";
import { listReposFn } from "@/features/storage/server-functions/list-repos";
import { RepoListItem } from "@/features/storage/components/repo-list-item";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/storage/")({
  loader: () => listReposFn(),
  component: RepoListPage,
});

function RepoListPage() {
  const repos = Route.useLoaderData();

  return (
    <div className="flex size-full flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="font-medium">Storage</h1>
        <Link
          className={buttonVariants()}
          aria-label="New repository"
          to="/storage/new"
        >
          New repository
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {repos.length === 0 ? (
          <EmptyRepoList />
        ) : (
          <ul className="divide-y">
            {repos.map((repo) => (
              <li key={repo.id}>
                <RepoListItem description={repo.description} name={repo.name} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
