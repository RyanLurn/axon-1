import type { Branded } from "@repo/types/branded";

import { z } from "zod";

import {
  FS_NAME_ALLOWED_CHARACTERS_REGEX,
  CLEAN_DIRECTORY_NAME_FORMAT,
  FS_NAME_MAX_BYTE_LENGTH,
} from "@/constants";
import { getUtf8ByteLength } from "@/utils/get-utf8-byte-length";

export const cleanDirectoryNameValidator = z
  .string()
  .min(1)
  .normalize()
  .regex(FS_NAME_ALLOWED_CHARACTERS_REGEX)
  .superRefine((value, ctx) => {
    function addIssue(message: string) {
      ctx.addIssue({
        code: "invalid_format",
        format: CLEAN_DIRECTORY_NAME_FORMAT,
        message,
      });
    }

    if (value === ".") {
      addIssue("Clean directory cannot be the current directory.");
    }

    if (value === "..") {
      addIssue("Clean directory cannot be the parent directory.");
    }

    if (value.startsWith(".")) {
      addIssue("Clean directory cannot be hidden.");
    }

    if (value.endsWith(".")) {
      addIssue("Clean directory name cannot end with a dot.");
    }

    if (value.startsWith("-")) {
      addIssue("Clean directory name cannot start with a hyphen.");
    }

    if (value.endsWith("-")) {
      addIssue("Clean directory name cannot end with a hyphen.");
    }

    if (value.includes("\0")) {
      addIssue("Clean directory name cannot contain null bytes.");
    }

    if (getUtf8ByteLength(value) > FS_NAME_MAX_BYTE_LENGTH) {
      addIssue(
        `Directory name's byte length cannot exceed ${FS_NAME_MAX_BYTE_LENGTH}.`
      );
    }
  })
  .transform((value) => value as Branded<string, "CleanDirectoryName">);
export type CleanDirectoryName = z.infer<typeof cleanDirectoryNameValidator>;
