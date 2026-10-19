import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = getGuide("diferenca-entre-interface-e-type-no-typescript")!;

export const metadata: Metadata = {
  title: "Diferença entre interface e type no TypeScript",
  description:
    "Entenda as diferenças entre interface e type alias no TypeScript: extensão, união, interseção, declaração conjunta e quando escolher cada um.",
  alternates: { canonical: "/guides/diferenca-entre-interface-e-type-no-typescript" },
  openGraph: {
    type: "article",
    title: "Diferença entre interface e type no TypeScript | StackPulse",
    description:
      "Comparação prática e objetiva entre interface e type para escrever código TypeScript mais claro e escalável.",
    url: `${site.url}/guides/diferenca-entre-interface-e-type-no-typescript`,
    locale: "pt_BR",
  },
};

const TOC = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "diferencas", label: "Diferenças principais" },
  { id: "exemplos", label: "Exemplos práticos" },
  { id: "quando-usar", label: "Quando usar cada um?" },
  { id: "armadilhas", label: "Armadilhas comuns" },
  { id: "conclusao", label: "Conclusão" },
];

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
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          {guide.topic}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Tanto <code>interface</code> quanto <code>type</code> permitem definir formas de objetos
          no TypeScript. Apesar de parecidos, existem diferenças práticas que impactam
          legibilidade, extensibilidade e manutenção do código.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Publicado em {guide.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {guide.readTime} de leitura
          </span>
        </div>
      </header>

      <nav aria-label="Sumário" className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">Sumário</p>
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {TOC.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-ink-2 transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="prose mt-10 max-w-none">
        <h2 id="visao-geral">Visão geral</h2>
        <p>
          <code>interface</code> é ideal para definir contratos de objetos e classes.{" "}
          <code>type</code> (type alias) é mais geral: pode representar uniões, interseções,
          tuplas, primitivos e tipos mapeados. Em muitos casos de objeto, ambos funcionam de forma
          intercambiável — a escolha final costuma ser mais sobre convenção do time do que sobre
          capacidade técnica.
        </p>
        <p>
          Uma regra prática ajuda a decidir: se a forma é um <em>objeto</em> e existe a intenção de
          estendê-la, use <code>interface</code>. Se a forma envolve <em>composição</em> — união,
          interseção, tupla ou primitivo — use <code>type</code>. Fora desses casos, a consistência
          dentro do projeto vale mais do que a escolha em si.
        </p>

        <h2 id="diferencas">Diferenças principais</h2>
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
                Suporta interseção <code>&amp;</code>; não faz declaration merging
              </td>
            </tr>
            <tr>
              <td>União / Interseção</td>
              <td>Limitado (melhor com <code>type</code>)</td>
              <td>
                Excelente para <code>A | B</code>, <code>A &amp; B</code>
              </td>
            </tr>
            <tr>
              <td>Primitivos / Tuplas</td>
              <td>Não permitido</td>
              <td>
                Permitido (<code>type ID = string | number</code>)
              </td>
            </tr>
            <tr>
              <td>Classes</td>
              <td>
                Pode ser implementado por <code>class implements</code>
              </td>
              <td>
                Também pode, mas <code>interface</code> é mais idiomático
              </td>
            </tr>
            <tr>
              <td>Declaration merging</td>
              <td>Sim (útil para augmentação de libs)</td>
              <td>Não</td>
            </tr>
            <tr>
              <td>Erros de mensagem</td>
              <td>Mensagens mais claras e específicas</td>
              <td>Mensagens mais genéricas em unions</td>
            </tr>
          </tbody>
        </table>

        <h2 id="exemplos">Exemplos práticos</h2>
        <h3>Extensão com interface</h3>
        <pre>
          <code>{`interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}`}</code>
        </pre>

        <h3>União com type</h3>
        <pre>
          <code>{`type Status = "loading" | "success" | "error";

type Result =
  | { status: "success"; data: User }
  | { status: "error"; message: string };`}</code>
        </pre>
        <p>
          Note o uso de <strong>união discriminada</strong>: o campo <code>status</code> funciona
          como discriminante e permite ao TypeScript estreitar o tipo dentro de cada ramo do{" "}
          <code>if</code>. É o padrão mais seguro para modelar estados de requisição.
        </p>

        <h3>Interseção</h3>
        <pre>
          <code>{`type Timestamped = { createdAt: Date; updatedAt: Date };
type UserWithTimestamps = User & Timestamped;`}</code>
        </pre>

        <h3>Mesma forma, duas sintaxes</h3>
        <pre>
          <code>{`interface Point { x: number; y: number }
type Point = { x: number; y: number }

// Equivalentes para o compilador — mas apenas a interface
// aceita declaration merging e \`extends\`.`}</code>
        </pre>

        <h2 id="quando-usar">Quando usar cada um?</h2>
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
          <li>
            Para <strong>props de componentes React</strong>, o padrão da comunidade é{" "}
            <code>interface</code> — o que permite a augmentação de tipos por bibliotecas.
          </li>
          <li>
            Para <strong>resultados de API</strong> gerados automaticamente, ambos funcionam; a
            escolha depende de o tipo precisar ser estendido depois.
          </li>
        </ul>

        <h2 id="armadilhas">Armadilhas comuns</h2>
        <ul>
          <li>
            <strong>Declaration merging é acidental.</strong> Duas <code>interface</code> com o
            mesmo nome no mesmo escopo são combinadas silenciosamente. Com <code>type</code>, isso
            gera erro de compilação — um dos motivos para preferir <code>type</code> quando a
            duplicata seria um bug.
          </li>
          <li>
            <strong>Propriedades opcionais não são <code>undefined</code>.</strong> Em{" "}
            <code>strict</code>, <code>name?: string</code> significa <code>string | undefined</code> —
            o compilador obriga você a checar antes de usar.
          </li>
          <li>
            <strong>Index signatures exigem rótulo explícito.</strong>{" "}
            <code>{`[key: string]: unknown`}</code> é diferente de{" "}
            <code>{`{ [key: string]: unknown }`}</code> e o segundo caso é o correto.
          </li>
          <li>
            <strong>União de objetos é mais estrita que interseção.</strong> Em{" "}
            <code>{`{ a: string } | { b: number }`}</code>, o objeto precisa satisfazer um dos
            ramos completos, o que costuma ser mais rígido do que o esperado.
          </li>
        </ul>

        <h2 id="conclusao">Conclusão</h2>
        <p>
          A diferença prática é menor hoje, mas entender <code>extends</code> vs <code>&amp;</code>,
          declaration merging e suporte a uniões ajuda a tomar a decisão certa. Para a maioria dos
          casos, priorize clareza e consistência: defina uma convenção no projeto, aplique-a em code
          review e você evita metade das discussões sobre estilo. Quando os tipos vierem de
          respostas de API, use{" "}
          <Link href="/tools/json-to-typescript" className="text-accent hover:underline">
            JSON to TypeScript
          </Link>{" "}
          para gerar a base automaticamente — o guia completo está em{" "}
          <Link href="/guides/como-converter-json-em-typescript">
            como converter JSON em TypeScript
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
