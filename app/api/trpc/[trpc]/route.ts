import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { type Context, createContext } from "~/libs/trpc";

import { trpcRouter } from "~/trpc/router";

import env from "~/env";

function handler(
  req: globalThis.Request,
): globalThis.Promise<globalThis.Response> {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext: (): globalThis.Promise<Context> =>
      createContext(),
    onError:
      env.NODE_ENV === "development"
        ? ({ error, path }): void => {
          globalThis.console.error(
            `❌ TRPC failed on ${path ?? "<no-path>"}:`,
            error.message,
          );
        }
        : undefined,
  });
}

export { handler as GET, handler as POST };
