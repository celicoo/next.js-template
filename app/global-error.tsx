"use client";

import type { JSX } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  globalThis.console.error("Global error caught:", { ...error });

  return (
    <html lang={"en-US"} />
  );
}
