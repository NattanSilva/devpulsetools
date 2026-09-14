import Link from "next/link";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="var(--surface-2)"
        stroke="var(--line)"
        strokeWidth="1.5"
      />
      <path
        d="M5 6.5h9M5 25.5h9"
        stroke="var(--ink-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 12l4 4-4 4"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 7l3 18"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="StackPulse — home"
    >
      <LogoMark />
      <span className="text-base font-semibold tracking-tight text-ink md:text-lg">
        Stack<span className="text-accent">Pulse</span>
      </span>
    </Link>
  );
}