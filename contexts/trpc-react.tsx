"use client";

import { type JSX, type ReactNode, useState } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import {
  type HTTPHeaders,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import SuperJSON from "superjson";

import queryClient from "~/libs/query-client";

import type { TRPCRouter } from "~/trpc/router";

import env from "~/env";

export const trpc = createTRPCReact<TRPCRouter>();

export function TRPCReactProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (operation) =>
            env.NEXT_PUBLIC_NODE_ENV === "development" ||
            (operation.direction === "down" &&
              operation.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${env.NEXT_PUBLIC_URL}/api/trpc`,
          headers: (): HTTPHeaders => {
            const headers = new globalThis.Headers();
            headers.set("X-TRPC-Source", "nextjs-react");
            return headers;
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
