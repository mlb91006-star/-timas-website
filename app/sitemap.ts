import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Falls back to an empty sitemap if the domain is ever unset again — an
  // empty sitemap is honest; one full of fake/placeholder URLs is not.
  if (!siteConfig.url) return [];

  const routes = ["", "/contacts"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
