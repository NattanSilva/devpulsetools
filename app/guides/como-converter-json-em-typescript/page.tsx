import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Como converter JSON em TypeScript | StackPulse",
  description:
    "Guia completo para converter JSON em TypeScript: gere interfaces, evite erros, entenda inferência e use a ferramenta JSON to TypeScript 100% no navegador.",
  alternates: { canonical: "/guides/como-converter-json-em-typescript" },
  openGraph: {
    type: "article",
    title: "Como converter JSON em TypeScript | StackPulse",
    description:
      "Aprenda a transformar dados JSON em tipos TypeScript válidos com exemplos práticos e boas práticas.",
    url: "https://stackpulse.tools/guides/como-converter-json-em-typescript",
  },
};

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
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-4xl">
          Como converter JSON em TypeScript: guia completo para gerar tipos automaticamente
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Transformar dados JSON em interfaces TypeScript elimina adivinhações, reduz erros em tempo
          de compilação e acelera a integração com APIs REST. Neste guia, você verá por que isso
          importa, como fazer manualmente e como automatizar com segurança no navegador.
        </p>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-ink prose-p:text-ink-2 prose-li:text-ink-2 prose-code:bg-surface-2 prose-code:text-ink prose-pre:bg-surface-2 prose-pre:border prose-pre:border-line">
        <h2>Por que converter JSON em TypeScript?</h2>
        <p>
          Ao consumir uma API, você recebe dados em JSON. Sem tipagem, propriedades podem ser
          <code>null</code>, ausentes ou com tipos inesperados. Ao gerar tipos TypeScript, você ganha:
        </p>
        <ul>
          <li>Autocompletar e Intellisense mais precisos no seu editor.</li>
          <li>Detecção precoce de erros ao acessar chaves inexistentes ou com tipo errado.</li>
          <li>Refatoração segura quando a estrutura da API mudar.</li>
          <li>Documentação viva: os tipos servem como contrato entre frontend e backend.</li>
          <li>Menor chance de regressões em runtime.</li>
        </ul>

        <h2>Diferença entre gerar manualmente e automaticamente</h2>
        <p>
          Gerar interfaces à mão funciona para estruturas pequenas. Com objetos aninhados, arrays
          complexos, uniões ou respostas grandes, é fácil errar nomes, tipos ou optionalidade.
          Ferramentas automáticas analisam o JSON e produzem tipos consistentes, incluindo arrays,
          booleans, números, strings, <code>null</code> e objetos aninhados.
        </p>
        <p>
          O ideal é usar automação para ganhar velocidade e revisão manual para ajustar nomes
          (<code>RootObject</code> pode virar <code>UserResponse</code>), opcionalidade e semântica.
        </p>

        <h2>Exemplo prático: manual vs automático</h2>
        <p>JSON de entrada:</p>
        <pre><code>{`{
  "user": {
    "id": 123,
    "name": "Alice",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
    "active": true
  }
}`}</code></pre>
        <p>Tipo gerado automaticamente:</p>
        <pre><code>{`export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  active: boolean;
}

export interface RootObject {
  user: User;
}`}</code></pre>
        <p>
          Com isso, você pode tipar <code>fetch</code> com <code>Promise&lt;RootObject&gt;</code> e
          acessar <code>data.user.name</code> com segurança.
        </p>

        <h2>Boas práticas ao converter JSON em TypeScript</h2>
        <ul>
          <li>Use amostras reais (produção ou staging) em vez de JSON mínimo.</li>
          <li>Revise tipos gerados: renomeie interfaces para nomes semânticos.</li>
          <li>Considere <code>interface</code> vs <code>type</code> conforme o uso (extensão vs união).</li>
          <li>Para dados variáveis, valide em runtime (zod, valibot) antes de confiar nos tipos.</li>
          <li>Prefira ferramentas 100% client-side para dados sensíveis.</li>
        </ul>

        <h2>Usando a ferramenta JSON to TypeScript do StackPulse</h2>
        <p>
          Nossa ferramenta roda inteiramente no seu navegador: cole o JSON, gere tipos e copie com um
          clique. Nenhum upload, sem logs. Acesse em{" "}
          <Link href="/tools/json-to-typescript" className="text-accent hover:underline">
            JSON to TypeScript
          </Link>
          .
        </p>

        <h2>Conclusão</h2>
        <p>
          Converter JSON em TypeScript é uma prática fundamental para apps robustos. Automatizar
          gera velocidade; revisar garante clareza. Com ferramentas client-side, você mantém
          privacidade sem sacrificar produtividade.
        </p>
      </article>
    </div>
  );
}
