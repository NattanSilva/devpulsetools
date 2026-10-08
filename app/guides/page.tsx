import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, BookOpen, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Guias técnicos para desenvolvedores | StackPulse",
  description:
    "Aprenda a converter JSON em TypeScript, entender interface vs type e formatar/validar JSON no navegador. Guias práticos e completos para desenvolvedores.",
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    title: "Guias técnicos para desenvolvedores | StackPulse",
    description:
      "Guias completos sobre JSON, TypeScript, validação e ferramentas client-side para produtividade no dia a dia.",
    url: "https://stackpulse.tools/guides",
  },
};

const guides = [
  {
    slug: "como-converter-json-em-typescript",
    title: "Como converter JSON em TypeScript: guia completo para gerar tipos automaticamente",
    description:
      "Entenda como transformar dados JSON em interfaces e tipos TypeScript válidos, evitando erros e ganhando produtividade em APIs REST.",
    readTime: "8 min",
    icon: FileText,
  },
  {
    slug: "diferenca-entre-interface-e-type-no-typescript",
    title: "Diferença entre interface e type no TypeScript: quando usar cada um",
    description:
      "Comparação prática entre interface e type alias: extensibilidade, união, interseção, padrões e recomendações para código limpo.",
    readTime: "9 min",
    icon: BookOpen,
  },
  {
    slug: "como-formatar-e-validar-json-no-navegador",
    title: "Como formatar e validar JSON no navegador: privacidade, velocidade e boas práticas",
    description:
      "Aprenda a formatar, minificar e validar JSON 100% no cliente, com dicas de segurança, erros comuns e fluxo de trabalho eficiente.",
    readTime: "7 min",
    icon: FileText,
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <header className="py-8 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink md:text-4xl">
            Guias técnicos para desenvolvedores
          </h1>
          <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
            Conteúdo prático sobre TypeScript, JSON, validação e ferramentas client-side. Feito para
            quem busca produtividade, tipagem correta e privacidade no fluxo de trabalho.
          </p>
        </div>
      </header>

      <section aria-label="Lista de guias">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
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
                  <span className="text-xs text-ink-3">{guide.readTime} de leitura</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-ink group-hover:text-accent">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-2">{guide.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Ler guia completo
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
