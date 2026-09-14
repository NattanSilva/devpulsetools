"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { toolCategories, tools, toolsByCategory } from "@/lib/tools";
import { Logo } from "@/components/logo";

export function MobileNav() {
  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Close menu"
        onMouseDown={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto border-r border-line bg-surface shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-4 py-3">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink-2 hover:bg-surface-2 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-6">
          {toolCategories.map((category) => {
            const items = toolsByCategory(category.id);
            const Icon = category.icon;
            return (
              <section key={category.id} className="mt-5">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-3">
                  <Icon className="h-3.5 w-3.5" />
                  {category.label}
                </h2>
                <ul className="mt-2 space-y-1">
                  {items.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        onMouseDown={onClose}
                        onClick={onClose}
                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                      >
                        <span>{tool.name}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-ink-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-3">
            <span>{tools.length} tools · all client-side</span>
            <span aria-hidden>100% private</span>
          </div>
        </div>
      </div>
    </div>
  );
}