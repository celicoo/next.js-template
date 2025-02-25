import type { JSX } from "react";

import {
  Body,
  Head,
  Html,
  Preview,
} from "@react-email/components";

export default function MagicLinkEmail({
  url,
}: {
  url: string;
}): JSX.Element {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#fff",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
        }}
      >
        <Preview>Log in with this magic link</Preview>
      </Body>
    </Html>
  );
}
