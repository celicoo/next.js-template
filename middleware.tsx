import { Buffer } from "node:buffer";

import { type NextRequest, NextResponse } from "next/server";

import { auth } from "~/libs/next-auth";

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/image (image optimization files)
    // - _next/static (static files)
    // - favicon.ico (favicon file)
    {
      source: "/((?!_next/image|_next/static|favicon.ico).*)",
      missing: [
        {
          type: "header",
          key: "next-router-prefetch",
        },
        {
          type: "header",
          key: "purpose",
          value: "prefetch",
        },
      ],
    },
  ],
};

export default auth(function middleware(request: NextRequest): NextResponse {
  const requestHeaders = new globalThis.Headers(request.headers);

  const requestId = globalThis.crypto.randomUUID();

  const nonce = Buffer.from(globalThis.crypto.randomUUID()).toString("base64");

  // const contentSecurityPolicy = `
  //   base-uri 'self';
  //   block-all-mixed-content;
  //   connect-src 'self' https://*.analytics.google.com https://*.google-analytics.com  https://*.googletagmanager.com;
  //   default-src 'self';
  //   font-src 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   img-src 'self' blob: data: https://*.google-analytics.com https://*.googletagmanager.com;
  //   object-src 'none';
  //   script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline';
  //   style-src 'self' 'nonce-${nonce}';
  //   upgrade-insecure-requests;
  // `
  //   .replace(/\s{2,}/gu, " ")
  //   .trim();

  requestHeaders.set("X-Request-ID", requestId);
  requestHeaders.set("X-Nonce", nonce);
  // requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("X-Nonce", nonce);
  response.headers.set("X-Request-ID", requestId);

  return response;
});
