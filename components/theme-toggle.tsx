"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-ink-2 transition-colors hover:border-accent/40 hover:bg-surface-2 hover:text-ink md:h-10 md:w-10"
    >
      <Sun className="hidden h-[18px] w-[18px] [html:not([data-theme=light])_&]:block" />
      <Moon className="hidden h-[18px] w-[18px] [html[data-theme=light]_&]:block" />
    </button>
  );
}