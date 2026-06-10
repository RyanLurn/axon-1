import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { CreateRepoForm } from "@/features/storage/components/create-repo-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/storage/new")({
  component: NewRepoPage,
});

function NewRepoPage() {
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
        <h1 className="text-sm font-medium">New repository</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-md">
          <CreateRepoForm />
        </div>
      </div>
    </div>
  );
}
