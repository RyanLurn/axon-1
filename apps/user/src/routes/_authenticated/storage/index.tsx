import { createFileRoute } from "@tanstack/react-router";

import { EmptyRepoList } from "@/features/storage/components/empty-repo-list";
import { listReposFn } from "@/features/storage/server-functions/list-repos";
import { RepoListItem } from "@/features/storage/components/repo-list-item";

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
