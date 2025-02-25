import type { JSX, ReactNode } from "react";

import { redirect } from "next/navigation";

import AuthFooter from "~/components/auth/footer";
import AuthHeader from "~/components/auth/header";

import { auth } from "~/libs/next-auth";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}): globalThis.Promise<JSX.Element> {
  const session = await auth();
  if (session !== null) redirect("/");

  return (
    <>
      <AuthHeader />
      {children}
      <AuthFooter />
    </>
  );
}
