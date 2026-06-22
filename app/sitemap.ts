import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getListedServiceMeta } from "@/lib/content";
import { getZonaRouteSlugs } from "@/lib/zonas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = ["", "/servicios", "/quienes-somos", "/contacto"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getListedServiceMeta().map(
    (s) => ({
      url: `${base}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  const zonaEntries: MetadataRoute.Sitemap = getZonaRouteSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...serviceEntries, ...zonaEntries];
}
