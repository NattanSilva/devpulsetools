import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, FileText } from "lucide-react";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias técnicos para desenvolvedores",
  description:
    "Aprenda a converter JSON em TypeScript, entender interface vs type e formatar/validar JSON no navegador. Guias práticos e completos para desenvolvedores.",
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Guias técnicos para desenvolvedores | StackPulse",
    description:
      "Guias completos sobre JSON, TypeScript, validação e ferramentas client-side para produtividade no dia a dia.",
    url: `${site.url}/guides`,
    locale: "pt_BR",
  },
};

const ICONS = [FileText, BookOpen, FileText];

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <header className="py-8 md:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Guides</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Guias técnicos para desenvolvedores
          </h1>
          <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
            Conteúdo prático sobre TypeScript, JSON, validação e ferramentas client-side. Feito para
            quem busca produtividade, tipagem correta e privacidade no fluxo de trabalho.
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-2">
            Todos os guias são escritos e revisados por engenheiros de software que usam as
            ferramentas do StackPulse no dia a dia. Cada artigo traz exemplos completos de código,
            armadilhas comuns e links para a ferramenta gratuita que resolve o problema descrito.
          </p>
        </div>
      </header>

      <section aria-label="Lista de guias">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-2"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/25 bg-accent/[0.14] text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink-3">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readTime} de leitura
                  </span>
                </div>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                  <BookOpen className="h-3 w-3" />
                  {guide.topic}
                </span>
                <h2 className="mt-3 text-lg font-semibold leading-6 text-ink group-hover:text-accent">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-2">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ler guia completo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-line bg-surface p-6 md:p-8" aria-label="Other resources">
        <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">
          Prefere executar do que ler?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">
          Todos os artigos citam a ferramenta exata que resolve o problema descrito. Como tudo roda
          no navegador, você pode colar o payload real, gerar o resultado e continuar trabalhando
          sem instalar nada.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/json-to-typescript"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            JSON to TypeScript
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tools/json-formatter"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-5 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
          >
            JSON Formatter
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#tools"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-5 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent"
          >
            Ver todas as ferramentas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
