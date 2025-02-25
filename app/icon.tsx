import { ImageResponse } from "next/og";

import Favicon from "~/components/favicon";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon(): globalThis.Response {
  return new ImageResponse(<Favicon />, {
    // Re-use the exported icons size metadata config to set the
    // ImageResponse's width and height.
    ...size,
  });
}
