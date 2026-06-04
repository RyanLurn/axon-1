import type { Branded } from "@repo/types/branded";

import { z } from "zod";

import {
  REPO_NAME_ALLOWED_CHARACTERS_REGEX,
  RESERVED_WINDOWS_NAMES,
  REPO_NAME_MAX_LENGTH,
  RESERVED_GIT_NAMES,
  REPO_NAME_FORMAT,
  REPO_DIR_SUFFIX,
  GIT_SERVICES,
} from "@/utils/constants";

export type RepoName = Branded<string, "RepoName">;
export const repoNameValidator = z
  .string()
  .min(1)
  .max(REPO_NAME_MAX_LENGTH)
  .normalize()
  .regex(REPO_NAME_ALLOWED_CHARACTERS_REGEX)
  .transform((value) =>
    value.toLowerCase().endsWith(REPO_DIR_SUFFIX)
      ? value.slice(0, -REPO_DIR_SUFFIX.length)
      : value
  )
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
    const [firstPart] = lowercaseValue.split(".");

    if (
      RESERVED_GIT_NAMES.has(lowercaseValue) ||
      RESERVED_WINDOWS_NAMES.has(lowercaseValue) ||
      (firstPart && RESERVED_WINDOWS_NAMES.has(firstPart))
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
  .transform((value) => value as RepoName);

export const gitServiceValidator = z.enum(GIT_SERVICES);
export type GitService = z.infer<typeof gitServiceValidator>;
