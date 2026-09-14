import { BookOpen, CheckCircle2, FileCode2, FlaskConical } from "lucide-react";
import { AdInContent } from "@/components/ads/AdInContent";
import type { ToolSeoContent } from "@/lib/tool-content";

export function ToolSeoDocs({ content }: { content: ToolSeoContent }) {
  return (
    <section className="mt-14 border-t border-line pt-10" aria-label="Documentation">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/[0.14] text-accent">
          <BookOpen className="h-4 w-4" />
        </span>
        <h2 className="text-xl font-bold tracking-tight text-ink md:text-2xl">{content.h2}</h2>
      </div>

      <div className="mt-5 max-w-3xl space-y-5 text-[15px] leading-7 text-ink-2">
        {content.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-2.5 max-w-3xl">
        <h3 className="text-sm font-semibold text-ink">Common use cases</h3>
        {content.useCases.map((item) => (
          <div key={item} className="flex items-start gap-2.5 text-sm leading-6 text-ink-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ok" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <AdInContent />
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
          <FileCode2 className="h-4 w-4 text-accent" /> {content.howToTitle}
        </h3>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-ink-2">
          {content.howToSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
          <FlaskConical className="h-4 w-4 text-accent" /> Test cases
        </h3>
        {content.testCases.map((testCase) => (
          <div key={testCase.input} className="rounded-2xl border border-line bg-surface p-4 md:p-5">
            <p className="font-mono text-[13px] leading-6 text-ink">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-3">
                Input ·{" "}
              </span>
              {testCase.input}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-2">{testCase.expected}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="text-lg font-semibold text-ink">Frequently asked questions</h3>
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
    </section>
  );
}