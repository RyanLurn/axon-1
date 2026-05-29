import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@repo/auth/constants";
import { z } from "zod";

export const emailValidator = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email().max(254));

export const passwordValidator = z
  .string()
  .min(MIN_PASSWORD_LENGTH)
  .max(MAX_PASSWORD_LENGTH);
