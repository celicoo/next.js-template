import { createCallerFactory, router } from "~/libs/trpc";

export type TRPCRouter = typeof trpcRouter;

export const trpcRouter = router({
});

export const createCaller = createCallerFactory(trpcRouter);
