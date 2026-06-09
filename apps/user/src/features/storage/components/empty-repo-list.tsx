import { FolderGit2 } from "lucide-react";

export function EmptyRepoList() {
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
