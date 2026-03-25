import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  target: "node22",
  clean: true,
  minify: false,
  sourcemap: true,

  external: [
    "dotenv",
    "dotenv/config",
    "express",
    "typeorm",
    "pg",
    "reflect-metadata",
  ],
});
