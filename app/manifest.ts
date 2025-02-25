import type { MetadataRoute } from "next";

import siteConfig from "~/configs/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#fff",
    display: "standalone",
    lang: "en_US",
    name: siteConfig.name,
    short_name: siteConfig.name,
    theme_color: "#fff",
  };
}
