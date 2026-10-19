import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const toolUrls = tools.map((tool) => ({
    url: `${base}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guideUrls = guides.map((guide) => ({
    url: `${base}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    {
      url: `${base}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    { url: `${base}/termos-de-uso`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ...toolUrls,
    ...guideUrls,
  ];
}
