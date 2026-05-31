import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  REPO_NAME_MAX_LENGTH,
  GIT_SERVICES,
} from "@/constants";

export const repoNameValidator = z
  .string()
  .max(REPO_NAME_MAX_LENGTH)
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX)
  .refine((name) => !name.startsWith("-") && !name.endsWith("-"), {
    error: "Repo name cannot start or end with a hyphen",
  });

export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
