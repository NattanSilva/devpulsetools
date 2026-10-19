import {
  BookOpen,
  CheckCircle2,
  FileCode2,
  FlaskConical,
  Info,
  ListOrdered,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import { AdInContent } from "@/components/ads/AdInContent";
import type { ToolSeoContent } from "@/lib/tool-content";

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: typeof BookOpen;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/[0.14] text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">{children}</h2>
    </div>
  );
}

export function ToolSeoDocs({ content }: { content: ToolSeoContent }) {
  return (
    <section className="mt-14 border-t border-line pt-10" aria-label="Documentation">
      <div className="space-y-12">
        <article>
          <SectionHeading icon={BookOpen}>
            O que é o {content.toolName} e para que serve?
          </SectionHeading>
          <div className="mt-5 max-w-3xl space-y-4 text-[15px] leading-7 text-ink-2">
            {content.whatIs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </article>

        <article>
          <SectionHeading icon={ListOrdered}>Como usar</SectionHeading>
          <ol className="mt-5 max-w-3xl list-inside list-decimal space-y-2.5 text-[15px] leading-7 text-ink-2 marker:text-accent">
            {content.howToSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article>
          <SectionHeading icon={FileCode2}>Exemplo prático</SectionHeading>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink-2">
            Um exemplo real de entrada e da saída gerada pela ferramenta:
          </p>
          <div className="mt-4 grid max-w-3xl gap-3 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <p className="border-b border-line bg-surface-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                Input
              </p>
              <pre className="overflow-x-auto bg-canvas/40 px-4 py-3 font-mono text-[12.5px] leading-6 text-ink whitespace-pre">
                {content.example.input}
              </pre>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <p className="border-b border-line bg-surface-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">
                Output gerado
              </p>
              <pre className="overflow-x-auto bg-canvas/40 px-4 py-3 font-mono text-[12.5px] leading-6 text-ink whitespace-pre">
                {content.example.output}
              </pre>
            </div>
          </div>
        </article>

        <article>
          <SectionHeading icon={CheckCircle2}>Casos de uso comuns</SectionHeading>
          <div className="mt-5 grid max-w-3xl gap-2.5">
            {content.useCases.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-6 text-ink-2"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ok" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        {content.bestPractices && content.bestPractices.length > 0 && (
          <article>
            <SectionHeading icon={Info}>Dicas de boas práticas</SectionHeading>
            <div className="mt-5 grid max-w-3xl gap-2.5">
              {content.bestPractices.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] leading-6 text-ink-2"
                >
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ok" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        )}

        <article>
          <SectionHeading icon={TriangleAlert}>Limitações técnicas</SectionHeading>
          <div className="mt-5 grid max-w-3xl gap-2.5">
            {content.limitations.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-6 text-ink-2"
              >
                <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-warn" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article>
          <SectionHeading icon={FlaskConical}>Perguntas Frequentes (FAQ)</SectionHeading>
          <div className="mt-5 max-w-3xl space-y-3">
            {content.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-line bg-surface p-5 open:bg-surface-2/60"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-10">
        <AdInContent />
      </div>
    </section>
  );
}
