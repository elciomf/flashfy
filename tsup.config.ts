import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  clean: true,
  minify: true,
  sourcemap: true,
});
