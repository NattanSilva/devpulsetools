"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Command, Search } from "lucide-react";
import { tools } from "@/lib/tools";

export function CommandSearch({
  variant = "mobile",
}: {
  variant?: "header" | "mobile";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const modifier = e.metaKey || e.ctrlKey;
      if (modifier && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const normalized = query.trim().toLowerCase();
  const results = tools
    .filter((tool) => {
      if (!normalized) return true;
      return `${tool.name} ${tool.tagline} ${tool.keywords.join(" ")}`
        .toLowerCase()
        .includes(normalized);
    })
    .slice(0, 7);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={focused}
        aria-controls="search-results"
        aria-label="Search developer tools"
        placeholder="Search tools… try '+'json'"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="h-11 w-full rounded-xl border border-line bg-surface-2 pl-10 pr-10 text-sm text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent/60 focus:bg-surface md:h-10"
      />
      {variant === "header" && (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-3 sm:flex">
          <Command className="h-3 w-3" />
          K
        </kbd>
      )}

      {focused && (
        <div
          id="search-results"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40"
        >
          {results.length > 0 ? (
            results.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setFocused(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 border-b border-line/60 px-3.5 py-3 last:border-b-0 transition-colors hover:bg-surface-2"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/[0.14] text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{tool.name}</span>
                    <span className="block truncate text-xs text-ink-3">{tool.tagline}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink-3" />
                </Link>
              );
            })
          ) : (
            <p className="px-4 py-4 text-sm text-ink-3">No tools match “{query}”.</p>
          )}
        </div>
      )}
    </div>
  );
}