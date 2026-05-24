import tanstackRouter from "@tanstack/eslint-plugin-router";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

import { baseConfig } from "./base.js";

export const userAppConfig = defineConfig([
  baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.bunBuiltin,
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  tanstackRouter.configs["flat/recommended"],
  reactHooks.configs.flat.recommended,
  prettier,
]);
