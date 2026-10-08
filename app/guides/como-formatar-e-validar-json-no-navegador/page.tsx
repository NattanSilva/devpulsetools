import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Como formatar e validar JSON no navegador | StackPulse",
  description:
    "Aprenda a formatar, minificar e validar JSON 100% no navegador. Veja erros comuns, boas práticas de privacidade e fluxo eficiente para desenvolvedores.",
  alternates: { canonical: "/guides/como-formatar-e-validar-json-no-navegador" },
  openGraph: {
    type: "article",
    title: "Como formatar e validar JSON no navegador | StackPulse",
    description:
      "Guia prático sobre formatação e validação de JSON client-side: rápido, privado e sem uploads.",
    url: "https://stackpulse.tools/guides/como-formatar-e-validar-json-no-navegador",
  },
};

export default function GuideFormatValidateJson() {
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
        <span className="truncate text-ink-2">Formatar e validar JSON no navegador</span>
      </nav>

      <header className="py-6 md:py-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-4xl">
          Como formatar e validar JSON no navegador: privacidade, velocidade e boas práticas
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Trabalhar com JSON é rotina: debugar respostas de API, escrever mocks, revisar configurações.
          Saber formatar (pretty print) e validar JSON diretamente no navegador economiza tempo,
          evita erros e protege dados sensíveis ao não enviá-los para servidores terceiros.
        </p>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-ink prose-p:text-ink-2 prose-li:text-ink-2 prose-code:bg-surface-2 prose-code:text-ink prose-pre:bg-surface-2 prose-pre:border prose-pre:border-line">
        <h2>O que significa formatar e validar JSON?</h2>
        <ul>
          <li>
            <strong>Formatar (beautify/pretty print):</strong> transforma JSON minificado em um bloco
            legível, com indentação, quebras de linha e espaçamento adequado.
          </li>
          <li>
            <strong>Minificar:</strong> remove espaços desnecessários para reduzir tamanho em
            requisições ou payloads.
          </li>
          <li>
            <strong>Validar:</strong> verifica se o texto é JSON sintaticamente correto (chaves
            com aspas duplas, vírgulas corretas, tipos válidos, etc.). Retorna erro com contexto
            quando inválido.
          </li>
        </ul>

        <h2>Por que fazer isso 100% no navegador?</h2>
        <p>
          Muitos validadores online exigem upload do conteúdo. Com processamento client-side, você:
        </p>
        <ul>
          <li>Preserva privacidade: tokens, chaves, dados pessoais nunca saem do seu dispositivo.</li>
          <li>Ganha velocidade: sem latência de rede para arquivos pequenos/médios.</li>
          <li>Funciona offline: útil em conexões instáveis ou ambientes restritos.</li>
          <li>Evita vazamento acidental em logs de terceiros.</li>
        </ul>

        <h2>Como validar JSON com JavaScript nativo</h2>
        <p>
          O jeito mais direto é usar <code>JSON.parse</code>. Ele lança <code>SyntaxError</code>
          com mensagem útil em caso de falha.
        </p>
        <pre><code>{`function isValidJson(text) {
  try {
    JSON.parse(text);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}`}</code></pre>
        <p>
          Para formatar, parseie e depois <code>JSON.stringify(obj, null, 2)</code> para 2 espaços
          (ou 4). Para minificar, use <code>JSON.stringify(obj)</code>.
        </p>

        <h2>Erros comuns ao validar JSON</h2>
        <ul>
          <li>Usar aspas simples em vez de duplas em chaves/strings.</li>
          <li>Vírgula extra no final de array/objeto.</li>
          <li>Chaves sem aspas.</li>
          <li>Uso de <code>undefined</code>, comentários ou <code>NaN</code> (não válidos em JSON puro).</li>
          <li>Quebra de linha não escapada em string.</li>
        </ul>

        <h2>Boas práticas</h2>
        <ul>
          <li>Prefira indentação consistente (2 espaços) para facilitar diff.</li>
          <li>Valide antes de enviar para API ou salvar em config.</li>
          <li>Ao colar de logs, limpe caracteres invisíveis se necessário.</li>
          <li>Use ferramentas client-side ao lidar com dados sensíveis.</li>
          <li>Combine validação sintática com validação de schema (zod) para regras de negócio.</li>
        </ul>

        <h2>Usando a ferramenta JSON Formatter do StackPulse</h2>
        <p>
          Nossa ferramenta permite formatar, minificar e validar JSON em tempo real, 100% no
          navegador. Sem upload, com detecção de erros e cópia com um clique. Acesse em{" "}
          <Link href="/tools/json-formatter" className="text-accent hover:underline">
            JSON Formatter & Validator
          </Link>
          .
        </p>

        <h2>Conclusão</h2>
        <p>
          Formatador e validador de JSON são ferramentas indispensáveis. Ao fazer tudo localmente,
          você garante privacidade, agilidade e tranquilidade ao trabalhar com qualquer payload.
        </p>
      </article>
    </div>
  );
}
