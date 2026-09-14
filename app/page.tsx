import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ClipboardPaste,
  Copy,
  FileCode2,
  Keyboard,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { toolCategories, toolsByCategory } from "@/lib/tools";
import { site } from "@/lib/site";
import { ToolCard } from "@/components/tool-card";

export const metadata: Metadata = {
  title: `${site.name} — Free developer utilities that run in your browser`,
  description:
    "Format JSON, generate TypeScript types, build cron expressions, encode Base64, hash text and test regex — free, instant and 100% client-side. Your data never leaves your browser.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Free developer utilities in your browser`,
    description:
      "Format JSON, generate TypeScript types, build cron expressions, encode Base64, hash text and test regex — free, instant and 100% client-side.",
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Free developer utilities in your browser`,
    description:
      "Format JSON, generate TypeScript types, build cron expressions, encode Base64, hash text and test regex — free, instant and 100% client-side.",
  },
};

const FEATURES = [
  {
    icon: Lock,
    title: "Privacy first",
    body: "Every conversion, format and hash runs entirely in your browser. Payloads are never uploaded or stored.",
  },
  {
    icon: Zap,
    title: "Instantly fast",
    body: "Static pre-rendered pages served from the edge deliver core content in under a second, anywhere.",
  },
  {
    icon: Keyboard,
    title: "Keyboard workflow",
    body: "Press Ctrl/Cmd + Enter to run any tool and Ctrl/Cmd + C to copy the result — no mouse needed.",
  },
  {
    icon: Sparkles,
    title: "Zero setup",
    body: "Open a tool, paste your data, copy the output. No accounts, no installs, no sign-ups.",
  },
];

const STEPS = [
  {
    icon: FileCode2,
    title: "1. Open a tool",
    body: "Pick a utility from the list — every one has a dedicated URL you can bookmark and share.",
  },
  {
    icon: ClipboardPaste,
    title: "2. Paste your data",
    body: "Drop in raw JSON, a UUID batch, a cron need or a regex pattern. Sample data is one click away.",
  },
  {
    icon: Copy,
    title: "3. Copy the result",
    body: "Get formatted, converted or generated output instantly and copy it with a single tap or keystroke.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <section className="flex flex-col items-center py-12 text-center md:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.1] px-3 py-1 text-xs font-medium text-accent">
          Free · 100% client-side · No sign-up
        </span>
        <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl md:leading-[1.1]">
          Developer utilities that{" "}
          <span className="bg-gradient-to-r from-accent to-[#9db3ff] bg-clip-text text-transparent">
            never leave your browser
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink-2 md:text-lg">
          Format JSON, generate TypeScript types, build cron expressions, hash text and more —
          fast, private and free. Built for frontend and DevOps engineers.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/tools/json-to-typescript"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Try JSON to TypeScript
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#tools"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:bg-surface-2"
          >
            Browse all tools
          </Link>
        </div>
      </section>

      <section id="tools" className="scroll-mt-24 py-8 md:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Toolbox
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>
        </div>

        <div className="mt-8 space-y-12">
          {toolCategories.map((category) => {
            const Icon = category.icon;
            const items = toolsByCategory(category.id);
            return (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 id={`cat-${category.id}`} className="text-lg font-semibold text-ink">
                      {category.label}
                    </h3>
                    <p className="text-sm text-ink-2">{category.description}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section id="features" className="scroll-mt-24 py-8 md:py-12">
        <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Built for speed and privacy
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/[0.14] text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">{feature.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-8 md:py-12">
        <div className="rounded-3xl border border-line bg-surface p-6 md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Three steps. No friction.
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-4 md:flex-col md:gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/[0.14] text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-2">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-2">
              Start with the most used tool — convert a JSON payload into TypeScript in seconds.
            </p>
            <Link
              href="/tools/json-to-typescript"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/[0.12] px-5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white sm:w-auto"
            >
              Convert JSON now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}