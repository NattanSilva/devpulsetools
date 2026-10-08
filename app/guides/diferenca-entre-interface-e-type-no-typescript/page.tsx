import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Diferença entre interface e type no TypeScript | StackPulse",
  description:
    "Entenda as diferenças entre interface e type alias no TypeScript: extensão, união, interseção, declaração conjunta e quando escolher cada um.",
  alternates: { canonical: "/guides/diferenca-entre-interface-e-type-no-typescript" },
  openGraph: {
    type: "article",
    title: "Diferença entre interface e type no TypeScript | StackPulse",
    description:
      "Comparação prática e objetiva entre interface e type para escrever código TypeScript mais claro e escalável.",
    url: "https://stackpulse.tools/guides/diferenca-entre-interface-e-type-no-typescript",
  },
};

export default function GuideInterfaceVsType() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 py-4 text-xs text-ink-3">
        <Link href="/" className="transition-colors hover:text-accent">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/guides" className="transition-colors hover:text-accent">
          Guias
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-ink-2">Interface vs type no TypeScript</span>
      </nav>

      <header className="py-6 md:py-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-4xl">
          Diferença entre interface e type no TypeScript: quando usar cada um
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Tanto <code>interface</code> quanto <code>type</code> permitem definir formas de objetos
          no TypeScript. Apesar de parecidos, existem diferenças práticas que impactam legibilidade,
          extensibilidade e manutenção do código.
        </p>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-ink prose-p:text-ink-2 prose-li:text-ink-2 prose-code:bg-surface-2 prose-code:text-ink prose-pre:bg-surface-2 prose-pre:border prose-pre:border-line">
        <h2>Visão geral</h2>
        <p>
          <code>interface</code> é ideal para definir contratos de objetos e classes. <code>type</code>
          (type alias) é mais geral: pode representar uniões, interseções, tuplas, primitivos e
          tipos mapeados. Em muitos casos de objeto, ambos funcionam de forma intercambiável.
        </p>

        <h2>Principais diferenças</h2>
        <table>
          <thead>
            <tr>
              <th>Aspecto</th>
              <th>interface</th>
              <th>type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Extensão (herança)</td>
              <td>
                Suporta <code>extends</code> e declaração conjunta (merging)
              </td>
              <td>
                Suporta interseção <code>&</code>; não faz declaration merging
              </td>
            </tr>
            <tr>
              <td>União / Interseção</td>
              <td>Limitado (melhor com <code>type</code>)</td>
              <td>Excelente para <code>A | B</code>, <code>A &amp; B</code></td>
            </tr>
            <tr>
              <td>Primitivos / Tuplas</td>
              <td>Não permitido</td>
              <td>Permitido (<code>type ID = string | number</code>)</td>
            </tr>
            <tr>
              <td>Classes</td>
              <td>Pode ser implementado por <code>class implements</code></td>
              <td>Também pode, mas <code>interface</code> é mais idiomático</td>
            </tr>
            <tr>
              <td>Declaration merging</td>
              <td>Sim (útil para augmentação de libs)</td>
              <td>Não</td>
            </tr>
          </tbody>
        </table>

        <h2>Exemplos práticos</h2>
        <h3>Extensão com interface</h3>
        <pre><code>{`interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}`}</code></pre>

        <h3>União com type</h3>
        <pre><code>{`type Status = "loading" | "success" | "error";

type Result = { status: "success"; data: User } | { status: "error"; message: string };`}</code></pre>

        <h3>Interseção</h3>
        <pre><code>{`type Timestamped = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & Timestamped;`}</code></pre>

        <h2>Quando usar cada um?</h2>
        <ul>
          <li>
            <strong>Use <code>interface</code></strong> para definir formas de objetos que podem ser
            estendidas por outras partes do código (component props, entidades de domínio, contratos
            de API).
          </li>
          <li>
            <strong>Use <code>type</code></strong> para uniões, interseções, tuplas, primitivos,
            tipos utilitários e casos mais complexos.
          </li>
          <li>
            Em código TypeScript moderno, muitos times adotam: <code>interface</code> por padrão para
            objetos; <code>type</code> quando precisa de união/interseção. Não há regra rígida.
          </li>
        </ul>

        <h2>Dicas práticas</h2>
        <ul>
          <li>Se você precisa fazer declaration merging (estender tipos de bibliotecas), use <code>interface</code>.</li>
          <li>Se você modela estados discriminados (unions), prefira <code>type</code>.</li>
          <li>Mantenha consistência no projeto. Escolha um padrão e siga.</li>
          <li>Ao gerar tipos a partir de JSON, ambos são válidos. Veja nosso <Link href="/guides/como-converter-json-em-typescript" className="text-accent hover:underline">guia de conversão JSON→TypeScript</Link>.</li>
        </ul>

        <h2>Conclusão</h2>
        <p>
          A diferença prática é menor hoje, mas entender <code>extends</code> vs <code>&</code>,
          declaration merging e suporte a uniões ajuda a tomar a decisão certa. Para a maioria dos
          casos, priorize clareza e consistência.
        </p>
      </article>
    </div>
  );
}
