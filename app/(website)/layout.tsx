import type { JSX, ReactNode } from "react";

import WebsiteFooter from "~/components/website/footer";
import WebsiteHeader from "~/components/website/header";

export default async function WebsiteLayout({
  children,
}: {
  children: ReactNode;
}): globalThis.Promise<JSX.Element> {
  return (
    <>
      <WebsiteHeader />
      {children}
      <WebsiteFooter />
    </>
  );
}
