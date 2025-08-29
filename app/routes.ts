import type { RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: [
      "**/.*", // ignore dotfiles - files starting with .
      "**/__*.*", // ignore files starting with (double underscore) __
      "**/*.server.ts", // ignore server-only files - files ending with .server.ts
      "**/*.client.ts", // ignore client-only files - files ending with .client.ts
      "**/[A-Z]*.{ts,tsx}", // ignore files starting with an uppercase letter
    ],
  });
}) satisfies RouteConfig;
