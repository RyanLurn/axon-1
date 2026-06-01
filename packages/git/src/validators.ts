import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  REPO_NAME_MAX_LENGTH,
  REPO_NAME_FORMAT,
  GIT_SERVICES,
} from "@/constants";

export const repoNameValidator = z
  .string()
  .max(REPO_NAME_MAX_LENGTH)
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX)
  .superRefine((value, ctx) => {
    if (value.startsWith(".")) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message: "Repo name cannot start with a period",
      });
    }

    if (value.endsWith(".")) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message: "Repo name cannot end with a period",
      });
    }

    if (value.startsWith("-")) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message: "Repo name cannot start with a hyphen",
      });
    }

    if (value.endsWith("-")) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message: "Repo name cannot end with a hyphen",
      });
    }
  });

export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
