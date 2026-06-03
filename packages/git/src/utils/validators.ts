import type { Branded } from "@repo/types/branded";

import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  RESERVED_WINDOWS_NAMES,
  REPO_NAME_MAX_LENGTH,
  RESERVED_GIT_NAMES,
  REMOTE_REPO_SUFFIX,
  REPO_NAME_FORMAT,
  GIT_SERVICES,
} from "@/utils/constants";

export const repoNameValidator = z
  .string()
  .min(1)
  .max(REPO_NAME_MAX_LENGTH)
  .normalize()
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX)
  .superRefine((value, ctx) => {
    function addIssue(message: string) {
      ctx.addIssue({
        code: "invalid_format",
        format: REPO_NAME_FORMAT,
        message,
      });
    }

    // This is for Windows case-insensitivity.
    const lowercaseValue = value.toLowerCase();

    if (
      RESERVED_GIT_NAMES.has(lowercaseValue) ||
      RESERVED_WINDOWS_NAMES.has(lowercaseValue)
    ) {
      addIssue(`The name "${value}" is reserved.`);
      return;
    }

    if (value.startsWith(".")) {
      addIssue("Repo name cannot start with a period.");
    } else if (value.startsWith("-")) {
      addIssue("Repo name cannot start with a hyphen.");
    }

    if (value.endsWith(".")) {
      addIssue("Repo name cannot end with a period.");
    } else if (value.endsWith("-")) {
      addIssue("Repo name cannot end with a hyphen.");
    }
  })
  .transform((value) =>
    value.toLowerCase().endsWith(REMOTE_REPO_SUFFIX)
      ? (value.slice(0, -REMOTE_REPO_SUFFIX.length) as Branded<
          string,
          "RepoName"
        >)
      : (value as Branded<string, "RepoName">)
  );
export type RepoName = z.infer<typeof repoNameValidator>;

export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
