import {
  unstable_createContext,
  unstable_RouterContextProvider,
} from "react-router";
import type { GetLoadContextFunction, SessionVariables } from "./types";
import { clientEnv, env, type Env, type PublicEnv } from "~/.server/env";

interface AppLoadContext extends SessionVariables {
  appVersion: string;
  clientEnv: PublicEnv;
  env: Env;
}

export const appContext = unstable_createContext<AppLoadContext>();

export const getLoadContext: GetLoadContextFunction = async (
  ctx,
  { build }
) => {
  const context = new unstable_RouterContextProvider();
  context.set(appContext, {
    appVersion: env.PROD ? build.assets.version : "dev",
    env,
    clientEnv,
    user: ctx.get("user"),
    session: ctx.get("session"),
    isAuthenticated: ctx.get("isAuthenticated"),
  });

  return context;
};
