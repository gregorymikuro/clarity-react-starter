import type { Session } from "~/.server/auth";
import type { HonoServerOptions } from "react-router-hono-server/node";

export type SessionVariables = {
  user: Session["user"] | null;
  session: Session["session"] | null;
  isAuthenticated: boolean;
};

export type AppBindings = {
  Variables: SessionVariables;
};

export type GetLoadContextFunction = Exclude<
  HonoServerOptions<AppBindings>["getLoadContext"],
  undefined
>;

export type GetLoadContextFunctionOptions = Parameters<GetLoadContextFunction>["1"];

export type HonoContext = Parameters<GetLoadContextFunction>["0"];
