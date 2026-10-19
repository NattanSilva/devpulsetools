import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, Lock, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { toolCategories } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Saiba mais sobre o ${site.name} — utilitários rápidos, gratuitos e privados 100% no navegador para desenvolvedores.`,
  alternates: { canonical: "/sobre" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Sobre ${site.name}`,
    description: `Saiba mais sobre o ${site.name} — utilitários rápidos, gratuitos e privados 100% no navegador para desenvolvedores.`,
    url: `${site.url}/sobre`,
    locale: "pt_BR",
  },
};

const PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Zap,
    title: "Rápido",
    body: "Cada página é pré-renderizada estaticamente e servida pela edge, então as ferramentas abrem em milissegundos — mesmo em conexões lentas.",
  },
  {
    icon: Lock,
    title: "Privado por design",
    body: "Todo o processamento acontece no cliente. Payloads nunca saem da aba do navegador, nunca são enviados e nunca são armazenados.",
  },
  {
    icon: ArrowLeftRight,
    title: "Grátis para sempre",
    body: "As utilitárias não têm custo de uso. O projeto é sustentado por anúncios discretos, não intrusivos, e parcerias de afiliados.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14" lang="pt-BR">
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Sobre o {site.name}</h1>
      <p className="mt-3 text-base leading-7 text-ink-2">
        O {site.name} é uma caixa de ferramentas gratuita e baseada em navegador para desenvolvedores
        de software, engenheiros de DevOps e profissionais de TI. Construímos utilitárias
        pequenas e focadas — formatadores de JSON, geradores de tipos TypeScript, conversores
        Base64 e geradores de UUID — que rodam inteiramente no seu dispositivo.
      </p>

      <div className="mt-8 space-y-6 text-[15px] leading-7 text-ink-2">
        <section>
          <h2 className="text-lg font-semibold text-ink">Nossa missão</h2>
          <p className="mt-2">
            O fluxo de trabalho de desenvolvimento é cheio de conversões pequenas e repetitivas:
            transformar um payload de API em interfaces tipadas, limpar um dump de JSON, construir
            uma expressão cron, decodificar um token. A maioria das ferramentas existentes para
            essas tarefas é lenta, coberta de anúncios intrusivos ou envia seus dados para um
            servidor remoto. Nossa missão é oferecer micro-ferramentas instantâneas, agradáveis de
            usar e focadas em privacidade — todas processando dados localmente no seu navegador.
          </p>
          <p className="mt-3">
            Isso também significa que não há cadastro, limite de requisições ou conta de usuário:
            abra uma ferramenta, cole seus dados e copie o resultado.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">
            Por que tudo funciona no navegador (client-side)
          </h2>
          <p className="mt-2">
            Privacidade é o princípio fundador do projeto. Como as conversões, formatações e
            codificações acontecem na sua máquina, dados sensíveis — registros de clientes,
            respostas de APIs internas, configurações proprietárias — nunca saem da sua tela. Isso
            também torna as ferramentas instantâneas, funciona offline e reduz drasticamente a
            superfície de ataque em comparação com conversores que processam dados no servidor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">O que existe aqui</h2>
          <div className="mt-3 space-y-3">
            {toolCategories.map((category: (typeof toolCategories)[number]) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-line bg-surface p-4 md:p-5"
                >
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/[0.14] text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    {category.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink-2">{category.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3">
            Cada ferramenta publicada tem uma URL própria, pode ser adicionada aos favoritos e
            compartilhada com o time. Você pode ver o catálogo completo na{" "}
            <Link href="/#tools" className="font-medium text-accent">
              página inicial
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Como o projeto se mantém gratuito</h2>
          <p className="mt-2">
            Manter utilitárias gratuitas para todo mundo exige funding. O {site.name} usa anúncios
            não intrusivos e claramente identificados (servidos pelo Google AdSense) e links de
            afiliados para provedores de hospedagem e ferramentas de desenvolvimento. Evitamos
            deliberadamente pop-ups, overlays e intersticiais que degradam a experiência. Consulte
            nossa{" "}
            <Link href="/politica-de-privacidade" className="font-medium text-accent">
              Política de Privacidade
            </Link>{" "}
            e os{" "}
            <Link href="/termos-de-uso" className="font-medium text-accent">
              Termos de Uso
            </Link>{" "}
            para todos os detalhes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Guias e conteúdo técnico</h2>
          <p className="mt-2">
            Além das ferramentas, publicamos guias práticos sobre TypeScript, JSON e validação de
            dados, escritos para quem quer entender o porquê de cada fluxo de trabalho — não apenas
            o como. Acesse a{" "}
            <Link href="/guides" className="font-medium text-accent">
              seção de guias
            </Link>{" "}
            ou comece por{" "}
            <Link href="/guides/como-converter-json-em-typescript" className="font-medium text-accent">
              como converter JSON em TypeScript
            </Link>
            .
          </p>
        </section>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article key={pillar.title} className="rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-1 text-[13px] leading-6 text-ink-2">{pillar.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface p-5 text-center md:p-6">
        <h2 className="flex items-center justify-center gap-2 text-base font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-accent" /> Tem feedback ou precisa de uma ferramenta?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-2">
          Lemos todas as mensagens. Conte o que tornaria o {site.name} mais útil para o seu dia a
          dia.
        </p>
        <Link
          href="/contato"
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Falar com a gente
        </Link>
      </div>
    </div>
  );
}
