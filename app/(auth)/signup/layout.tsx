import type { JSX, ReactNode } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {};

export default async function SignUpLayout({
  children,
}: {
  children: ReactNode;
}): globalThis.Promise<JSX.Element> {
  return <>{children}</>;
}
