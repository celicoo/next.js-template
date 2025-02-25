"use client";

import type { JSX, ReactNode } from "react";

export default function RootTemplate({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <main
      className={`
        flex
        flex-1
        flex-col
        overflow-y-scroll
      `}
    >
      {children}
    </main>
  );
}
