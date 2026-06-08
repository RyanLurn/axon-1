import { z } from "zod";

import type { RepoName } from "@/types/branded";

export const REPO_DIR_SUFFIX = ".git";

export const REPO_NAME_FORMAT = "repo_name";
export const REPO_NAME_MAX_LENGTH = 100;
export const REPO_NAME_ALLOWED_CHARACTERS_REGEX = /^[a-zA-Z0-9_.-]+$/;

// Checking whether a name starts or ends with a period or hyphen can cover these cases.
// We just add them here for more detailed error messages.
export const RESERVED_GIT_NAMES = new Set([
  ".gitattributes",
  ".gitmodules",
  ".gitignore",
  ".git",
  "..",
  "--",
  "-",
  ".",
]);
// Even though the server runs on Linux, users may clone the repo down to their Windows PCs.
// That's why we also need to check for Windows reserved names.
export const RESERVED_WINDOWS_NAMES = new Set([
  "com0",
  "com1",
  "com2",
  "com3",
  "com4",
  "com5",
  "com6",
  "com7",
  "com8",
  "com9",
  "lpt0",
  "lpt1",
  "lpt2",
  "lpt3",
  "lpt4",
  "lpt5",
  "lpt6",
  "lpt7",
  "lpt8",
  "lpt9",
  "con",
  "prn",
  "aux",
  "nul",
]);

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

    if (value.length === 0) {
      addIssue("Repo name cannot be empty.");
      return;
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
