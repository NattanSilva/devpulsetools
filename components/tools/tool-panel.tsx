"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Download } from "lucide-react";

/** Clipboard helper shared by every StackPulse tool. */
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    });
  }, []);

  return { copied, copy };
}

export function ToolShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id="tool"
      className="overflow-hidden rounded-3xl border border-line bg-surface"
      aria-label={label}
    >
      {children}
    </section>
  );
}

export function ToolStatus({
  tone,
  children,
}: {
  tone: "idle" | "ok" | "error";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        tone === "ok"
          ? "border-ok/40 bg-ok/[0.12] text-ok"
          : tone === "error"
            ? "border-danger/40 bg-danger/[0.12] text-danger"
            : "border-line bg-surface text-ink-3"
      }`}
    >
      {children}
    </span>
  );
}

export function OptionGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex rounded-lg p-0.5" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          onClick={() => onChange(option.value)}          aria-pressed={option.value === value}
          className={`inline-flex h-9 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition-colors ${
            option.value === value
              ? "border-accent/50 bg-accent/[0.14] text-accent"
              : "border-line text-ink-3 hover:text-ink-2"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function CopyButton({
  onClick,
  copied,
  disabled,
}: {
  onClick: () => void;
  copied: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-ok" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copy
        </>
      )}
    </button>
  );
}

export function DownloadButton({
  href,
  fileName,
  disabled,
}: {
  href: string | undefined;
  fileName: string;
  disabled?: boolean;
}) {
  return (
    <a
      href={href}
      download={fileName}
      aria-disabled={disabled}
      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-40"
    >
      <Download className="h-3.5 w-3.5" /> Download
    </a>
  );
}

export function KeyboardHints() {
  return (
    <div className="hidden items-center justify-between border-t border-line px-3 py-2 text-[11px] text-ink-3 lg:flex">
      <span className="inline-flex items-center gap-1.5">
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono">Ctrl</kbd>
        +
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono">Enter</kbd>
        to run
      </span>
      <span className="inline-flex items-center gap-1.5">
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono">Ctrl</kbd>
        +
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono">C</kbd>
        to copy
      </span>
    </div>
  );
}
