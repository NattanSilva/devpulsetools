import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { getGuide } from "@/lib/guides";
import { site } from "@/lib/site";

const guide = getGuide("como-formatar-e-validar-json-no-navegador")!;

export const metadata: Metadata = {
  title: "Como formatar e validar JSON no navegador",
  description:
    "Aprenda a formatar, minificar e validar JSON 100% no navegador. Veja erros comuns, boas práticas de privacidade e fluxo eficiente para desenvolvedores.",
  alternates: { canonical: "/guides/como-formatar-e-validar-json-no-navegador" },
  openGraph: {
    type: "article",
    title: "Como formatar e validar JSON no navegador | StackPulse",
    description:
      "Guia prático sobre formatação e validação de JSON client-side: rápido, privado e sem uploads.",
    url: `${site.url}/guides/como-formatar-e-validar-json-no-navegador`,
    locale: "pt_BR",
  },
};

const TOC = [
  { id: "o-que-e", label: "O que significa formatar e validar JSON?" },
  { id: "por-que-no-browser", label: "Por que fazer isso 100% no navegador?" },
  { id: "javascript-nativo", label: "Como validar JSON com JavaScript nativo" },
  { id: "erros-comuns", label: "Erros comuns ao validar JSON" },
  { id: "boas-praticas", label: "Boas práticas" },
  { id: "ferramenta", label: "Usando a ferramenta do StackPulse" },
];

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
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
          {guide.topic}
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink md:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2 md:text-lg">
          Trabalhar com JSON é rotina: debugar respostas de API, escrever mocks, revisar
          configurações. Saber formatar (pretty print) e validar JSON diretamente no navegador
          economiza tempo, evita erros e protege dados sensíveis ao não enviá-los para servidores
          terceiros.
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
        <h2 id="o-que-e">O que significa formatar e validar JSON?</h2>
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
            <strong>Validar:</strong> verifica se o texto é JSON sintaticamente correto (chaves com
            aspas duplas, vírgulas corretas, tipos válidos, etc.) e retorna o erro com contexto
            quando é inválido.
          </li>
        </ul>
        <p>
          Formatar e validar são operações diferentes, aunque aconteçam no mesmo instante. A
          formatação é cosmética e reversível; a validação é binária e decide se o documento existe
          para o parser. Quando um payload falha ao ser enviado para a API, a causa quase sempre é
          sintática: uma vírgula a mais, uma aspa simples no lugar de dupla ou uma chave sem
          aspas.
        </p>

        <h2 id="por-que-no-browser">Por que fazer isso 100% no navegador?</h2>
        <p>
          Muitos validadores online exigem upload do conteúdo. Com processamento client-side, você:
        </p>
        <ul>
          <li>
            Preserva privacidade: tokens, chaves de API e dados pessoais nunca saem do seu
            dispositivo.
          </li>
          <li>Ganha velocidade: sem latência de rede para arquivos pequenos ou médios.</li>
          <li>
            Funciona offline: útil em conexões instáveis, ambientes restritos ou dentro de um
            container de CI.
          </li>
          <li>Evita vazamento acidental em logs de terceiros.</li>
          <li>Elimina o custo de armazenamento: ninguém guarda uma cópia dos seus segredos.</li>
        </ul>
        <p>
          Esse modelo tem uma consequência importante: o comportamento é determinístico e
          reproduzível. O mesmo payload produz o mesmo resultado na sua máquina e no pipeline da
          equipe, sem depender de um serviço externo que pode ficar fora do ar ou mudar de
          comportamento.
        </p>

        <h2 id="javascript-nativo">Como validar JSON com JavaScript nativo</h2>
        <p>
          O jeito mais direto é usar <code>JSON.parse</code>. Ele lança <code>SyntaxError</code>{" "}
          com mensagem útil em caso de falha.
        </p>
        <pre>
          <code>{`function isValidJson(text) {
  try {
    JSON.parse(text);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}`}</code>
        </pre>
        <p>
          Para formatar, parseie e depois use <code>JSON.stringify(obj, null, 2)</code> para 2
          espaços (ou 4). Para minificar, use <code>JSON.stringify(obj)</code>.
        </p>
        <pre>
          <code>{`const parsed = JSON.parse(input);
const pretty = JSON.stringify(parsed, null, 2);
const minified = JSON.stringify(parsed);`}</code>
        </pre>
        <p>
          Vale notar que <code>JSON.stringify</code> percorre o objeto inteiro e reconstrói a
          string, o que significa que a formatação é normalizada: a ordem das chaves é preservada,
          mas o espaçamento original desaparece. Números como <code>1.0</code> podem virar{" "}
          <code>1</code>, porque a notação não carrega informação em JSON.
        </p>

        <h2 id="erros-comuns">Erros comuns ao validar JSON</h2>
        <ul>
          <li>Usar aspas simples em vez de duplas em chaves/strings.</li>
          <li>Vírgula extra no final de array ou objeto.</li>
          <li>Chaves sem aspas.</li>
          <li>
            Uso de <code>undefined</code>, comentários ou <code>NaN</code> (não válidos em JSON
            puro).
          </li>
          <li>Quebra de linha não escapada dentro de uma string.</li>
          <li>Caracteres invisíveis copiados de um log ou de um terminal (BOM, tabs, non-breaking
            space).</li>
          <li>Aspas tipográficas (curvas) coladas de um documento ou de um chat.</li>
        </ul>
        <p>
          Um validador que informa <em>linha e coluna</em> do erro economiza mais tempo do que um
          que apenas diz &ldquo;JSON inválido&rdquo;: em um payload minificado de uma única linha, a
          posição do caractere é a única informação útil para localizar o defeito.
        </p>

        <h2 id="boas-praticas">Boas práticas</h2>
        <ul>
          <li>Prefira indentação consistente (2 espaços) para facilitar diff.</li>
          <li>Valide antes de enviar para API ou salvar em config.</li>
          <li>Ao colar de logs, limpe caracteres invisíveis se necessário.</li>
          <li>Use ferramentas client-side ao lidar com dados sensíveis.</li>
          <li>
            Combine validação sintática com validação de schema (zod, valibot) para regras de
            negócio.
          </li>
          <li>
            Formate os fixtures do repositório: um arquivo minificado esconde campos faltantes em
            code review.
          </li>
        </ul>

        <h2 id="ferramenta">Usando a ferramenta JSON Formatter do StackPulse</h2>
        <p>
          Nossa ferramenta permite formatar, minificar e validar JSON em tempo real, 100% no
          navegador. Sem upload, com detecção de erros por linha e coluna e cópia com um clique.
          Acesse em{" "}
          <Link href="/tools/json-formatter" className="text-accent hover:underline">
            JSON Formatter &amp; Validator
          </Link>
          .
        </p>
        <p>
          Depois de validar o payload, o próximo passo natural é transformá-lo em tipos
          TypeScript. O guia{" "}
          <Link href="/guides/como-converter-json-em-typescript">
            como converter JSON em TypeScript
          </Link>{" "}
          mostra como automatizar essa etapa e o que revisar manualmente.
        </p>

        <h2>Conclusão</h2>
        <p>
          Formatador e validador de JSON são ferramentas indispensáveis. Ao fazer tudo localmente,
          você garante privacidade, agilidade e tranquilidade ao trabalhar com qualquer payload — do
          arquivo de configuração local até a resposta de uma API em produção.
        </p>
      </article>
    </div>
  );
}
