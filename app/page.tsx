import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  ClipboardPaste,
  Copy,
  FileCode2,
  Keyboard,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { toolCategories, toolsByCategory } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";
import { ToolCard } from "@/components/tool-card";

export const metadata: Metadata = {
  title: `${site.name} — Free developer utilities that run in your browser`,
  description:
    "Format and validate JSON, generate TypeScript types, encode and decode Base64 and bulk-generate UUIDs — free, instant and 100% client-side. Your data never leaves your browser.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Free developer utilities in your browser`,
    description:
      "Format JSON, generate TypeScript types, encode Base64 and generate UUIDs — free, instant and 100% client-side.",
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Free developer utilities in your browser`,
    description:
      "Format JSON, generate TypeScript types, encode Base64 and generate UUIDs — free, instant and 100% client-side.",
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
    body: "Drop in raw JSON, a Base64 string or a text to encode. Sample data is one click away.",
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
          Format JSON, generate TypeScript types, encode Base64 and bulk-create UUIDs — fast,
          private and free. Built for frontend, backend and DevOps engineers.
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
            const items = toolsByCategory(category.id).filter(
              (tool) => tool.status === "live",
            );
            if (items.length === 0) return null;
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

      <section id="why-stackpulse" className="scroll-mt-24 py-8 md:py-12" aria-label="About StackPulse">
        <div className="space-y-10">
          <article>
            <h2
              id="about-stackpulse"
              className="text-2xl font-bold tracking-tight text-ink md:text-3xl"
            >
              Developer tools built for everyday work
            </h2>
            <div className="mt-4 max-w-4xl space-y-4 text-base leading-7 text-ink-2">
              <p>
                StackPulse delivers developer tools built for everyday work that run directly in your
                browser. All processing is done client-side with no data uploaded to external
                servers, ensuring maximum privacy and speed for your workflows.
              </p>
              <p>
                Whether you need to format JSON, convert to TypeScript, generate UUIDs, encode
                Base64 or validate code snippets, our tools are lightweight, accessible and require
                no installation.
              </p>
              <p>
                Every tool is a self-contained, statically pre-rendered page: it opens instantly,
                works offline once loaded and never asks for an account, an API key or a payment
                method. The same code path runs in your browser, in CI scripts and on machines
                without internet access, which makes the output reproducible for the whole team.
              </p>
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Why use StackPulse?
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Sem instalação</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Use todas as ferramentas diretamente no navegador, sem downloads ou extensões.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Processamento no Browser</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  100% client-side. O processamento acontece localmente no seu dispositivo.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Privacidade</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Seus dados nunca saem da sua tela. Sem uploads, sem logs, sem rastreamento de
                  conteúdo.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Fluxo Rápido</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Resultados instantâneos com interface limpa e foco em produtividade.
                </p>
              </div>
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Who is StackPulse for?
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Frontend</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Ideal para formatar JSON, gerar tipos TypeScript a partir de respostas de API e
                  inspecionar tokens Base64 embutidos no HTML e no CSS.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">Backend</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Útil para validar payloads, criar DTOs tipados, gerar identificadores únicos para
                  filas, sessões e registros de banco de dados.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-semibold text-ink">DevOps</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-2">
                  Valide arquivos de configuração, decodifique segredos base64 e produza
                  identificadores em massa para scripts de seed com total privacidade.
                </p>
              </div>
            </div>
          </article>

          <article id="faq">
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  As ferramentas são gratuitas?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Sim. Todas as ferramentas do StackPulse são 100% gratuitas para uso pessoal e
                  profissional.
                </p>
              </details>
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  Os dados enviados são armazenados?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Não. Todo o processamento acontece no seu navegador (client-side). Nada é enviado,
                  armazenado ou logado em nossos servidores.
                </p>
              </details>
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  Quais navegadores são suportados?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Funcionamos em navegadores modernos como Chrome, Firefox, Safari, Edge e Brave
                  com JavaScript habilitado.
                </p>
              </details>
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  Preciso instalar algo?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Não. É só abrir a ferramenta no navegador e começar a usar. Não requer instalação
                  ou cadastro.
                </p>
              </details>
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  A privacidade é garantida?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Sim. Priorizamos privacidade por design. O processamento local significa que dados
                  sensíveis nunca deixam seu dispositivo.
                </p>
              </details>
              <details className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  O StackPulse funciona offline?
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">
                  Sim. Depois que a página é carregada, todas as ferramentas funcionam sem conexão
                  com a internet, pois não existe round-trip para nenhum servidor.
                </p>
              </details>
            </div>
          </article>
        </div>
      </section>

      <section id="guides" className="scroll-mt-24 py-8 md:py-12" aria-label="Guias">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Guides
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Learn the workflow behind each tool
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
              In-depth articles on JSON, TypeScript and browser-based tooling — written for
              developers who want to understand the why, not just the how.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex h-10 items-center gap-1 text-sm font-medium text-accent"
          >
            All guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-2"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                <BookOpen className="h-3 w-3" />
                {guide.topic}
              </span>
              <h3 className="mt-3 text-base font-semibold leading-6 text-ink group-hover:text-accent">
                {guide.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-2">{guide.description}</p>
              <span className="mt-4 text-xs text-ink-3">{guide.readTime} de leitura</span>
            </Link>
          ))}
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
