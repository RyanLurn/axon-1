import type { SelectedRepo } from "@repo/db/types/inferred";

import { Link } from "@tanstack/react-router";
import { FolderGit2 } from "lucide-react";

export function RepoListItem({
  description,
  name,
}: Pick<SelectedRepo, "description" | "name">) {
  return (
    <Link
      className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted/50"
      params={{ repoName: name }}
      to="/storage/$repoName"
    >
      <FolderGit2 className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>
        {description && (
          <p className="truncate text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
