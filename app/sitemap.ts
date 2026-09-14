import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const toolUrls = tools.map(
    (tool) =>
      ({
        url: `${base}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: tool.status === "live" ? 0.9 : 0.5,
      }) as const,
  );
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ...toolUrls,
  ];
}