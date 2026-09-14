import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Sparkles, Timer, Zap } from "lucide-react";
import { getTool, tools } from "@/lib/tools";
import { site } from "@/lib/site";
import { getToolSeo } from "@/lib/tool-content";
import { JsonToTypescript } from "@/components/tools/json-to-typescript";
import { AdSidebar } from "@/components/ads/AdSidebar";
import { ToolSeoDocs } from "@/components/tool-seo-docs";
import { ToolCard } from "@/components/tool-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  const url = `${site.url}/tools/${tool.slug}`;
  const title = `${tool.name} — free online tool`;
  const description = tool.description;
  return {
    title: `${tool.name} — free online tool`,
    description,
    keywords: [...tool.keywords, ...site.keywords],
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | 100% client-side`,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `${title} | 100% client-side`,
      description,
    },
  };
}

const LEGAL_CHIPS = [
  { icon: ShieldCheck, label: "Free · No upload" },
  { icon: Zap, label: "100% local" },
  { icon: Timer, label: "Instant results" },
];

function Hero({ name, tagline }: { name: string; tagline: string }) {
  return (
    <header className="py-6 md:py-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-4xl">{name}</h1>
        <p className="mt-2 text-base leading-7 text-ink-2 md:text-lg">{tagline}.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {LEGAL_CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-2"
              >
                <Icon className="h-3.5 w-3.5 text-accent" />
                {chip.label}
              </span>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function ComingSoon({ name }: { name: string }) {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-surface px-6 py-14 text-center"
      aria-label={`${name} is coming soon`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-accent/25 bg-accent/[0.14] text-accent">
        <Sparkles className="h-7 w-7" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-ink">Coming soon</h2>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-ink-2">
          <strong className="text-ink">{name}</strong> is being built and will ship in the next
          release. It will run 100% in your browser like every other DevPulseTools utility. The
          documentation below explains what it does and how it works.
        </p>
      </div>
    </section>
  );
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const live = tool.status === "live";
  const seo = getToolSeo(slug);
  const related = tools.filter((item) => item.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.name} by ${site.name}`,
    url: `${site.url}/tools/${slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
    featureList: [
      "100% client-side processing",
      "Instant results",
      "One-click copy and download",
      "Keyboard shortcuts",
      "No sign-up required",
    ],
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 py-4 text-xs text-ink-3">
        <Link href="/" className="transition-colors hover:text-accent">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/#tools" className="transition-colors hover:text-accent">
          Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-ink-2">{tool.name}</span>
      </nav>

      <Hero name={tool.name} tagline={tool.tagline} />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-6">
        <div className="min-w-0">
          {live ? <JsonToTypescript /> : <ComingSoon name={tool.name} />}

          {/* Sidebar ad — below the output panel on mobile, before the SEO docs */}
          <div className="mt-6 lg:hidden">
            <AdSidebar />
          </div>

          <section className="mt-14" aria-label="Related tools">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-ink md:text-xl">
                Related tools
              </h2>
              <Link
                href="/#tools"
                className="inline-flex h-10 items-center gap-1 text-sm font-medium text-accent"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ToolCard key={item.slug} tool={item} />
              ))}
            </div>
          </section>

          {seo ? <ToolSeoDocs content={seo} /> : null}
        </div>

        <aside aria-label="Sponsor" className="hidden lg:sticky lg:top-24 lg:block">
          <AdSidebar />
        </aside>
      </div>
    </div>
  );
}