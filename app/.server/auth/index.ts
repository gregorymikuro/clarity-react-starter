import { db, schema } from "../db";
import { env } from "../env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  appName: env.PUBLIC_APP_NAME,
  basePath: "/api/auth",
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  onAPIError: {
    onError(error) {
      console.error("[BetterAuth] API Error:", error);
    },
  },
  database: drizzleAdapter(db, {
    provider: "mysql",
    usePlural: true,
    schema,
  }),
});

export type AuthType = typeof auth;
export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];
