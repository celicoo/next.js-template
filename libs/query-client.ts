import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import superjson from "superjson";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
    hydrate: {
      deserializeData: superjson.deserialize,
    },
    dehydrate: {
      serializeData: superjson.serialize,
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
  },
});

export default queryClient;
