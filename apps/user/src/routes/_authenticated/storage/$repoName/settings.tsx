import { createFileRoute } from "@tanstack/react-router";

import { DeleteRepoSection } from "@/features/storage/components/delete-repo-section";

export const Route = createFileRoute(
  "/_authenticated/storage/$repoName/settings"
)({
  component: SettingsTab,
});

function SettingsTab() {
  const { repoName } = Route.useParams();

  return (
    <div className="px-6 py-6">
      <div className="max-w-md">
        <DeleteRepoSection repoName={repoName} />
      </div>
    </div>
  );
}
