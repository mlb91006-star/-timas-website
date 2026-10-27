import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Omitted until a real domain is confirmed (config/site.ts `url`) —
    // an empty/placeholder sitemap URL would be worse than none at all.
    ...(siteConfig.url ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
