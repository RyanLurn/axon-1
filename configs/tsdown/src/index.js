import { defineConfig } from "tsdown";

export const internalPackageConfig = defineConfig({
  dts: {
    sourcemap: true,
  },
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/try.ts"],
  unbundle: true,
});
