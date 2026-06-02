import type { Branded } from "@repo/types/branded";

import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  REPO_NAME_MAX_LENGTH,
  REPO_NAME_FORMAT,
  GIT_SERVICES,
} from "@/utils/constants";

export const repoNameValidator = z
  .string()
  .max(REPO_NAME_MAX_LENGTH)
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX)
  .superRefine((value, ctx) => {
    function addIssue(message: string) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message,
      });
    }

    switch (value) {
      case "..": {
        addIssue("Repo name cannot be 2 periods.");
        break;
      }
      case "--": {
        addIssue("Repo name cannot be 2 hyphens.");
        break;
      }
      case ".": {
        addIssue("Repo name cannot be a period.");
        break;
      }
      case "-": {
        addIssue("Repo name cannot be a hyphen.");
        break;
      }
      default: {
        if (value.startsWith(".")) {
          addIssue("Repo name cannot start with a period");
        } else if (value.startsWith("-")) {
          addIssue("Repo name cannot start with a hyphen");
        }

        if (value.endsWith(".")) {
          addIssue("Repo name cannot end with a period");
        } else if (value.endsWith("-")) {
          addIssue("Repo name cannot end with a hyphen");
        }
      }
    }
  })
  .transform((value) => value as Branded<string, "RepoName">);
export type RepoName = z.infer<typeof repoNameValidator>;

export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
