/* eslint-disable @typescript-eslint/consistent-type-imports */
declare global {
  interface Window {
    ENV: import("~/.server/env").PublicEnv;
  }
}
