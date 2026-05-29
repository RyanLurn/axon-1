import { z } from "zod";

export const emailValidator = z
  .string()
  .trim()
  .toLowerCase()
  .normalize("NFC")
  .pipe(z.email());
