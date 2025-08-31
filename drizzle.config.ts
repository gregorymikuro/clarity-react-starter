import { defineConfig } from "drizzle-kit";
import { env } from "~/.server/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/.server/db/schema/index.ts",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
