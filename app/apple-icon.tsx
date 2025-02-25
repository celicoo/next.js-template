import { ImageResponse } from "next/og";

import Favicon from "~/components/favicon";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon(): globalThis.Response {
  return new ImageResponse(<Favicon />, {
    // Re-use the exported icons size metadata config to set the
    // ImageResponse's width and height.
    ...size,
  });
}
