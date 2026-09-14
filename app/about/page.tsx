import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, Lock, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { toolCategories } from "@/lib/tools";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} — fast, free and private client-side developer utilities built for engineers who value speed and data privacy.`,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `About ${site.name}`,
    description: `Learn about ${site.name} — fast, free and private client-side developer utilities built for engineers who value speed and data privacy.`,
    url: `${site.url}/about`,
    locale: "en_US",
  },
};

const PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Zap,
    title: "Fast",
    body: "Every page is statically pre-rendered and served from the edge, so tools open in milliseconds — even on slow connections.",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "All processing happens client-side. Payloads never leave the browser tab, are never uploaded and are never stored anywhere.",
  },
  {
    icon: ArrowLeftRight,
    title: "Free forever",
    body: "The utilities cost nothing to use. The project is sustained by discreet, non-intrusive advertising and affiliate partnerships.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">About {site.name}</h1>
      <p className="mt-3 text-base leading-7 text-ink-2">
        {site.name} is a free, browser-based toolbox for software developers, DevOps engineers and
        IT professionals. We build small, focused utilities — JSON formatters, TypeScript type
        generators, Base64 converters, cron builders, hash generators and more — that run entirely
        on your device.
      </p>

      <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-2">
        <section>
          <h2 className="text-lg font-semibold text-ink">Our mission</h2>
          <p className="mt-2">
            Development workflows are full of tiny, repetitive conversions: turning an API payload
            into typed interfaces, cleaning up a JSON dump, building a cron expression, testing a
            regex. Most existing tools for these tasks are slow, covered in intrusive ads, or send
            your data to a remote server. Our mission is to provide micro-tools that are instant,
            pleasant to use and privacy-first — every one of them processing data locally in your
            browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Why everything runs client-side</h2>
          <p className="mt-2">
            Privacy is the founding principle of the project. Because conversions, formatting and
            encoding happen on your machine, sensitive data — customer records, internal API
            responses, proprietary configuration — never leaves your screen. This also makes the
            tools instant, works offline, and dramatically reduces the attack surface compared with
            server-side converters.
          </p>
          <p className="mt-3">
            It also means there is no sign-up, no rate limiting and no account needed: open a tool,
            paste your data, copy your result.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">What&apos;s inside</h2>
          <div className="mt-3 space-y-3">
            {toolCategories.map((category: (typeof toolCategories)[number]) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-line bg-surface p-4 md:p-5"
                >
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/[0.14] text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    {category.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-2">{category.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3">
            New tools are added continuously. You can browse the full catalog on the{" "}
            <Link href="/#tools" className="font-medium text-accent">
              homepage
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">How the project stays free</h2>
          <p className="mt-2">
            Keeping utilities free for everyone requires funding. {site.name} uses non-intrusive,
            clearly labelled advertising (served by Google AdSense) and affiliate links to hosting
            and developer tool providers. We deliberately avoid pop-ups, overlay ads and
            interstitials that degrade the experience. See our{" "}
            <Link href="/privacy" className="font-medium text-accent">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-medium text-accent">
              Terms of Use
            </Link>{" "}
            for full details and opt-out options.
          </p>
        </section>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.title} className="rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-ink-2">{pillar.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-5 text-center md:p-6">
        <h2 className="flex items-center justify-center gap-2 text-base font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-accent" /> Got feedback or a tool request?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-2">
          We read every message. Tell us what would make {site.name} more useful for your daily
          workflow.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}