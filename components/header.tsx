"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandSearch } from "@/components/command-search";
import { MobileDrawer } from "@/components/mobile-nav";

const NAV_LINKS = [
  { href: "/#tools", label: "Tools" },
  { href: "/#features", label: "Why StackPulse" },
  { href: "/#how-it-works", label: "How it works" },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16 md:px-6">
        <button
          type="button"
          aria-expanded={drawerOpen}
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="14" y2="18" />
          </svg>
        </button>

        <Logo />

        <div className="mx-2 hidden max-w-md flex-1 md:block">
          <CommandSearch variant="header" />
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:ml-0 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden md:px-6">
        <CommandSearch variant="mobile" />
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}