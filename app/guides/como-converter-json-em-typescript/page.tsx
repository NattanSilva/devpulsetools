import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = getGuide("como-converter-json-em-typescript")!;

export const metadata: Metadata = {
  title: "Como converter JSON em TypeScript",
  description:
    "Guia completo para converter JSON em TypeScript: gere interfaces, evite erros, entenda inferência e use a ferramenta JSON to TypeScript 100% no navegador.",
  alternates: { canonical: "/guides/como-converter-json-em-typescript" },
  openGraph: {
    type: "article",
    title: "Como converter JSON em TypeScript | StackPulse",
    description:
      "Aprenda a transformar dados JSON em tipos TypeScript válidos com exemplos práticos e boas práticas.",
    url: `${site.url}/guides/como-converter-json-em-typescript`,
    locale: "pt_BR",
  },
};

const TOC = [
  { id: "por-que-converter", label: "Por que converter JSON em TypeScript?" },
  { id: "manual-vs-automatico", label: "Manual vs. automático" },
  { id: "exemplo-pratico", label: "Exemplo prático: entrada e saída" },
  { id: "casos-limites", label: "Casos de uso e limites da inferência" },
  { id: "boas-praticas", label: "Boas práticas" },
  { id: "ferramenta", label: "Usando a ferramenta do StackPulse" },
];

export default function GuideJsonToTs() {
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
        <span className="truncate text-ink-2">Como converter JSON em TypeScript</span>
      </nav>

      <header className="py-6 md:py-8">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          {guide.topic}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Transformar dados JSON em interfaces TypeScript elimina adivinhações, reduz erros em tempo
          de compilação e acelera a integração com APIs REST. Neste guia, você verá por que isso
          importa, como fazer manualmente e como automatizar com segurança no navegador.
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
        <h2 id="por-que-converter">Por que converter JSON em TypeScript?</h2>
        <p>
          Ao consumir uma API, você recebe dados em JSON. Sem tipagem, propriedades podem estar{" "}
          <code>null</code>, ausentes ou com tipos inesperados, e o compilador não tem como avisar
          você. Ao gerar tipos TypeScript a partir da resposta real, você ganha um contrato que é
          verificado em tempo de compilação:
        </p>
        <ul>
          <li>Autocompletar e IntelliSense mais precisos no seu editor.</li>
          <li>Detecção precoce de erros ao acessar chaves inexistentes ou com tipo errado.</li>
          <li>Refatoração segura quando a estrutura da API mudar.</li>
          <li>Documentação viva: os tipos servem como contrato entre frontend e backend.</li>
          <li>Menos regressões em runtime e menos <code>any</code> espalhado pelo código.</li>
        </ul>
        <p>
          O ponto central é que o tipo deixa de ser uma suposição. Quando alguém renomear{" "}
          <code>user_id</code> para <code>userId</code> no backend, o compilador aponta exatamente
          os pontos do frontend que precisam mudar — antes do deploy, não depois.
        </p>

        <h2 id="manual-vs-automatico">Diferença entre gerar manualmente e automaticamente</h2>
        <p>
          Gerar interfaces à mão funciona para estruturas pequenas. Com objetos aninhados, arrays
          complexos, uniões ou respostas grandes, é fácil errar nomes, tipos ou opcionalidade. As
          ferramentas automáticas analisam o JSON e produzem tipos consistentes, incluindo arrays,
          booleanos, números, strings, <code>null</code> e objetos aninhados.
        </p>
        <p>
          O fluxo ideal combina as duas abordagens: use a automação para ganhar velocidade e revisão
          manual para ajustar nomes (<code>RootObject</code> pode virar <code>UserResponse</code>),
          opcionalidade e semântica de negócio. Nenhuma ferramenta consegue inferir, a partir de uma
          única amostra, que um campo opcional em um endpoint pode ser obrigatório em outro.
        </p>

        <h2 id="exemplo-pratico">Exemplo prático: entrada e saída</h2>
        <p>JSON de entrada, conforme retornado por um endpoint de usuários:</p>
        <pre>
          <code>{`{
  "user": {
    "id": 123,
    "name": "Alice",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
    "active": true
  }
}`}</code>
        </pre>
        <p>Tipo gerado automaticamente:</p>
        <pre>
          <code>{`export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  active: boolean;
}

export interface RootObject {
  user: User;
}`}</code>
        </pre>
        <p>
          Com isso, você pode tipar a chamada com <code>Promise&lt;RootObject&gt;</code> e acessar{" "}
          <code>data.user.name</code> com segurança, sem <code>any</code> e semillas de erro de
          digitação. Note que arrays homogêneos viram <code>string[]</code> e objetos aninhados viram
          tipos estruturados automaticamente.
        </p>

        <h2 id="casos-limites">Casos de uso e limites da inferência</h2>
        <p>A conversão automática é especialmente útil em quatro cenários do dia a dia:</p>
        <ul>
          <li>
            <strong>Contratos de API:</strong> cole a resposta de <code>/users</code> e obtenha o
            tipo do recurso em segundos.
          </li>
          <li>
            <strong>DTOs de requisição:</strong> a partir de um payload de exemplo, monte o tipo do
            corpo que a sua API espera.
          </li>
          <li>
            <strong>Mock data e formulários:</strong> modele a forma de um estado, de um schema de
            validação ou de um formulário antes de escrever a lógica.
          </li>
          <li>
            <strong>Sincronização de contratos:</strong> reexecute o processo quando um fornecedor
            altera o payload, e compare a diferença no pull request.
          </li>
        </ul>
        <p>
          Você também precisa conhecer os limites. O gerador infere a partir de <em>uma</em> amostra:
          campos opcionais, formatos alternativos e membros de união que nunca apareceram no JSON
          não podem ser detectados e precisam ser escritos à mão. Datas chegam como string, porque
          JSON não tem um tipo de data nativo. E chaves duplicadas são resolvidas pelo parser, que
          mantém apenas a última ocorrência.
        </p>

        <h2 id="boas-praticas">Boas práticas</h2>
        <ul>
          <li>Use amostras reais (produção ou staging) em vez do JSON mínimo de documentação.</li>
          <li>Revise os tipos gerados: renomeie interfaces para nomes semânticos.</li>
          <li>
            Considere <code>interface</code> vs <code>type</code> conforme o uso — veja o{" "}
            <Link href="/guides/diferenca-entre-interface-e-type-no-typescript">
              guia de interface vs type
            </Link>
            .
          </li>
          <li>
            Para dados variáveis, valide em runtime (zod, valibot) antes de confiar nos tipos
            estáticos.
          </li>
          <li>Prefira ferramentas 100% client-side para lidar com dados sensíveis.</li>
          <li>Mantenha os tipos gerados em um arquivo próximo do cliente que os consome.</li>
        </ul>

        <h2 id="ferramenta">Usando a ferramenta JSON to TypeScript do StackPulse</h2>
        <p>
          A ferramenta roda inteiramente no seu navegador: cole o JSON, gere os tipos e copie com um
          clique. Nenhum upload, sem logs, sem fila de processamento — o payload nunca sai da aba.
          Isso importa porque respostas reais de produção frequentemente contêm dados de clientes,
          e um conversor com servidor seria um ponto de vazamento desnecessário.
        </p>
        <p>
          Acesse{" "}
          <Link href="/tools/json-to-typescript" className="text-accent hover:underline">
            JSON to TypeScript
          </Link>{" "}
          para experimentar. O guia companion sobre{" "}
          <Link href="/guides/como-formatar-e-validar-json-no-navegador">
            formatar e validar JSON no navegador
          </Link>{" "}
          explica como preparar o payload antes da conversão.
        </p>

        <h2>Conclusão</h2>
        <p>
          Converter JSON em TypeScript é uma prática fundamental para aplicações robustas.
          Automatizar gera velocidade; revisar garante clareza. Com ferramentas client-side, você
          mantém total privacidade sem sacrificar produtividade — e o tipo deixa de ser uma
          suposição para virar um contrato verificado pelo compilador.
        </p>
      </article>
    </div>
  );
}
