import type { Metadata } from "next";
import { Mail, MessageSquareText } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Entre em contato com o ${site.name} — envie feedback, reporte bugs, solicite ferramentas ou tire dúvidas sobre privacidade e anúncios.`,
  alternates: { canonical: "/contato" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Contato — ${site.name}`,
    description: `Entre em contato com o ${site.name} — envie feedback, reporte bugs, solicite ferramentas ou tire dúvidas sobre privacidade e anúncios.`,
    url: `${site.url}/contato`,
    locale: "pt_BR",
  },
};

export default function ContactPage() {
  return (
    <div
      className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14"
      lang="pt-BR"
    >
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">Entre em contato</h1>
      <p className="mt-2 text-base leading-7 text-ink-2">
        Lemos todas as mensagens. Envie feedback, relate um problema com alguma ferramenta, solicite
        uma nova utilitária ou tire uma dúvida sobre privacidade e anúncios.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto]">
        <ContactForm />

        <aside className="space-y-3 md:w-64" aria-label="Contato direto">
          <div className="grid gap-2.5 rounded-2xl border border-line bg-surface p-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
              <Mail className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-ink">Prefere e-mail?</h2>
            <p className="text-sm leading-6 text-ink-2">
              Escreva para nós diretamente em{" "}
              <a
                href={`mailto:${site.legalEmail}`}
                className="font-medium text-accent break-all hover:underline"
              >
                {site.legalEmail}
              </a>
              .
            </p>
            <p className="text-xs leading-5 text-ink-3">
              Geral e suporte: suporte@stackpulse.com.br · Jurídico e privacidade:{" "}
              {site.legalEmail}
            </p>
          </div>

          <div className="grid gap-2.5 rounded-2xl border border-line bg-surface p-5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/[0.14] text-accent">
              <MessageSquareText className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-ink">Prazo de resposta</h2>
            <p className="text-sm leading-6 text-ink-2">
              Respondemos em até 2 dias úteis. Para solicitações de privacidade, escreva para{" "}
              <a href={`mailto:${site.legalEmail}`} className="font-medium text-accent">
                {site.legalEmail}
              </a>{" "}
              para que o pedido seja direcionado à equipe responsável.
            </p>
          </div>
        </aside>
      </div>

      <p className="mt-8 text-sm leading-6 text-ink-3">
        Não inclua senhas, segredos ou dados confidenciais de produção na sua mensagem. As mensagens
        são utilizadas exclusivamente para responder à sua solicitação.
      </p>
    </div>
  );
}

function ContactForm() {
  const subject = `[${site.name}] Feedback`;
  const body =
    "Descreva sua dúvida, seu feedback ou o bug reportado com o máximo de detalhes possível:";

  const mailtoHref = `mailto:${site.legalEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <form
      aria-label="Formulário de contato"
      className="rounded-2xl border border-line bg-surface p-5 md:p-6"
      action={mailtoHref}
      method="post"
    >
      <div>
        <label htmlFor="contact-topic" className="text-sm font-medium text-ink">
          Assunto
        </label>
        <select
          id="contact-topic"
          name="topic"
          className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        >
          <option>Feedback sobre uma ferramenta</option>
          <option>Relatório de bug</option>
          <option>Solicitação de ferramenta</option>
          <option>Publicidade / parceria</option>
          <option>Dúvida sobre privacidade</option>
          <option>Outro</option>
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="text-sm font-medium text-ink">
          Mensagem <span className="text-ink-3">(obrigatório)</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={20}
          rows={6}
          placeholder="Conte o que você gostaria de relatar ou solicitar…"
          className="mt-1.5 w-full resize-y rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm leading-6 text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-ink-3">
        O formulário abre o seu programa de e-mail com a mensagem preenchida. Nada é enviado até
        você pressionar enviar.
      </p>

      <button
        type="submit"
        className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 md:w-auto"
      >
        <Mail className="h-4 w-4" /> Abrir no seu aplicativo de e-mail
      </button>
    </form>
  );
}
