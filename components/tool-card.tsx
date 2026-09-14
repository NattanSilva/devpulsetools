import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolMeta } from "@/lib/tools";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const Icon = tool.icon;
  const live = tool.status === "live";

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/25 bg-accent/[0.14] text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            live
              ? "border-ok/40 bg-ok/[0.12] text-ok"
              : "border-line bg-surface-3 text-ink-3"
          }`}
        >
          {live ? "Live" : "Soon"}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold text-ink">{tool.name}</h3>
      <p className="text-sm leading-5 text-ink-2">{tool.tagline}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}