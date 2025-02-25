import type { JSX, ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Script from "next/script";

import { MotionConfig } from "motion/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import TailwindIndicator from "~/components/tailwind-indicator";

import siteConfig from "~/configs/site";

import { ToastProvider } from "~/contexts/toast";
import { TRPCReactProvider } from "~/contexts/trpc-react";

import env from "~/env";

import "~/styles/globals.css";

const fontSans = localFont({
  src: [],
  variable: "--font-sans",
});

export async function generateMetadata(): globalThis.Promise<Metadata> {
  const { name, description, url } = siteConfig;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_URL),
    title: {
      absolute: `${name}: ${description}`,
      template: `${name}: %s`,
    },
    description,
    authors: [
      {
        url,
        name,
      },
    ],
    referrer: "no-referrer-when-downgrade",
    creator: name,
    openGraph: {
      title: name,
      description,
      url,
      siteName: name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      // site: "",
      // siteId: "",
      // creator: "",
      // creatorId: "",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      color: "white",
      media: "(prefers-color-scheme: light)",
    },
    {
      color: "black",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): globalThis.Promise<JSX.Element> {
  const nonce = (await headers()).get("X-Nonce") ?? undefined;

  return (
    <html suppressHydrationWarning={true} lang={"en-US"}>
      <head>
        {env.NODE_ENV === "production" && env.GTM_ID !== undefined && (
          <Script
            strategy={"afterInteractive"}
            id={"gtm"}
            async={true}
            nonce={nonce}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Using dangerouslySetInnerHTML is necessary to include the Google Tag Manager (GTM) script with a nonce for security purposes. The script is only rendered in production environments and is sourced directly from the official GTM URL. The GTM ID is securely provided through an environment variable.
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new globalThis.Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=${env.GTM_ID}"+dl;f.parentNode.insertBefore(j,f);})(globalThis.window,globalThis.document,"script","dataLayer","${env.GTM_ID}");`,
            }}
          />
        )}
      </head>
      <body className={fontSans.variable}>
        <MotionConfig nonce={nonce}>
          <ThemeProvider
            enableSystem={true}
            defaultTheme={"system"}
            attribute={"class"}
            nonce={nonce}
          >
            <SessionProvider>
              <TRPCReactProvider>
                <ToastProvider>{children}</ToastProvider>
              </TRPCReactProvider>
            </SessionProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
