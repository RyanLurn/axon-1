import { z } from "zod";

import type { RepoId } from "@/types/branded";

import { repoNameValidator } from "@/validators/repo/name";

export const repoSelectorValidator = z.discriminatedUnion("column", [
  z.object({ column: z.literal("name"), value: repoNameValidator }),
  z.object({
    column: z.literal("id"),
    value: z.uuidv7().transform((value) => value as RepoId),
  }),
]);
export type RepoSelector = z.infer<typeof repoSelectorValidator>;
