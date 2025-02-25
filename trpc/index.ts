import "server-only";

import { cache } from "react";

import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { type TRPCRouter, createCaller } from "~/trpc/router";

import queryClient from "~/libs/query-client";
import { createContext } from "~/libs/trpc";

const caller = createCaller(await createContext());

const getQueryClient = cache(() => queryClient);

export const { trpc, HydrateClient } = createHydrationHelpers<TRPCRouter>(
  caller,
  getQueryClient,
);
