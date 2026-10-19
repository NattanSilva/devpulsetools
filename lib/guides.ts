export interface GuideMeta {
  slug: string;
  title: string;
  /** Short summary used in the listing cards and in the footer. */
  description: string;
  /** Estimated reading time. */
  readTime: string;
  /** ISO date of the first publication. */
  publishedAt: string;
  /** ISO date of the last review. */
  updatedAt: string;
  /** Topic label used as a badge in the listing. */
  topic: string;
}

export const guides: GuideMeta[] = [
  {
    slug: "como-converter-json-em-typescript",
    title: "Como converter JSON em TypeScript: guia completo para gerar tipos automaticamente",
    description:
      "Entenda como transformar dados JSON em interfaces e tipos TypeScript válidos, evitar erros em tempo de compilação e ganhar produtividade ao integrar APIs REST.",
    readTime: "9 min",
    publishedAt: "2026-01-12",
    updatedAt: "2026-02-18",
    topic: "TypeScript",
  },
  {
    slug: "diferenca-entre-interface-e-type-no-typescript",
    title: "Diferença entre interface e type no TypeScript: quando usar cada um",
    description:
      "Comparação prática entre interface e type alias: extensão, união, interseção, declaration merging e recomendações para um código mais claro e escalável.",
    readTime: "10 min",
    publishedAt: "2026-01-20",
    updatedAt: "2026-02-20",
    topic: "TypeScript",
  },
  {
    slug: "como-formatar-e-validar-json-no-navegador",
    title: "Como formatar e validar JSON no navegador: privacidade, velocidade e boas práticas",
    description:
      "Aprenda a formatar, minificar e validar JSON 100% no cliente, com os erros mais comuns, dicas de segurança e um fluxo de trabalho mais rápido.",
    readTime: "8 min",
    publishedAt: "2026-01-28",
    updatedAt: "2026-02-22",
    topic: "JSON",
  },
];

export function getGuide(slug: string): GuideMeta | undefined {
  return guides.find((guide) => guide.slug === slug);
}
