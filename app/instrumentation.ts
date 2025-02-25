import env from "~/env";

export async function register(): globalThis.Promise<void> {
  if (env.NEXT_RUNTIME === "nodejs") {
    await import("~/app/instrumentation.node");
  }
}
