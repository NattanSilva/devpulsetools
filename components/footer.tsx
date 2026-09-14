import Link from "next/link";
import { Clock, Globe, Mail, Rss, ShieldCheck, Zap } from "lucide-react";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_auto_auto] md:gap-16">
          <div className="max-w-sm">
            <p className="text-sm font-semibold tracking-tight text-ink">StackPulse</p>
            <p className="mt-2 text-sm leading-6 text-ink-2">
              Fast, free and private developer utilities. Every tool runs 100% in your
              browser — your data never leaves this page.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              <li className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink-2">
                <ShieldCheck className="h-3.5 w-3.5 text-ok" /> No uploads
              </li>
              <li className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink-2">
                <Zap className="h-3.5 w-3.5 text-warn" /> Static pages
              </li>
              <li className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink-2">
                <Clock className="h-3.5 w-3.5 text-accent" /> 24/7
              </li>
            </ul>
          </div>

          <nav aria-label="Tools" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:gap-x-14">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="text-sm text-ink-2 transition-colors hover:text-accent"
              >
                {tool.name}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="grid gap-y-2 content-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">
              Company & Legal
            </p>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-2 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href={`mailto:${site.legalEmail}`}
                className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" /> {site.legalEmail}
              </a>
            </div>
            <div className="mt-1 flex items-center gap-3 text-ink-3">
              <Globe className="h-4 w-4" />
              <Rss className="h-4 w-4" />
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Third-party trademarks are property of their owners. Affiliate and ad links may be
            present.
          </p>
        </div>
      </div>
    </footer>
  );
}