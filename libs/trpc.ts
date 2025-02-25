import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type {
  TRPC_ERROR_CODE_KEY,
  TRPC_ERROR_CODE_NUMBER,
} from "@trpc/server/rpc";

import { headers } from "next/headers";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/libs/next-auth";

export type Context = Awaited<ReturnType<typeof createContext>>;

export async function createContext(opts?: CreateNextContextOptions) {
  const headersList = new globalThis.Headers(await headers());
  headersList.set("X-TRPC-Source", "rsc");

  return {
    headers: headersList,
    session: await auth(),
  };
}

type DefaultErrorShape = {
  message: string;
  code: TRPC_ERROR_CODE_NUMBER;
  data: {
    code: TRPC_ERROR_CODE_KEY;
    httpStatus: number;
    path?: string;
    stack?: string;
  };
};

export const { createCallerFactory, router, procedure } = initTRPC
  .context<Context>()
  .create({
    transformer: superjson,
    errorFormatter({
      error,
      shape,
    }: {
      error: TRPCError;
      shape: DefaultErrorShape;
    }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

procedure.use(async (opts) => {
  const { ctx } = opts;
  if (ctx.session === null) throw new TRPCError({ code: "UNAUTHORIZED", });
  return opts.next({
    ctx: {
      session: ctx.session,
    },
  });
});
