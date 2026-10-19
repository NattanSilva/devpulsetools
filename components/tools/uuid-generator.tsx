"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Hash, Minus, Plus, RefreshCw, Trash2 } from "lucide-react";
import { generateUuidBatch } from "@/lib/uuid";
import {
  CopyButton,
  DownloadButton,
  OptionGroup,
  ToolShell,
  ToolStatus,
  useCopy,
} from "@/components/tools/tool-panel";

const MIN_COUNT = 1;
const MAX_COUNT = 1000;

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [values, setValues] = useState<string[]>(() => generateUuidBatch(5, false));
  const { copied, copy } = useCopy();
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey)) return;
      const target = e.target as HTMLElement | null;
      const editing =
        target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement;

      if (e.key === "Enter" && !editing) {
        e.preventDefault();
        setValues(generateUuidBatch(count, uppercase));
      }
      if (e.key.toLowerCase() === "c" && !editing) {
        e.preventDefault();
        copy(values.join("\n"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, uppercase, values]);

  const text = useMemo(() => values.join("\n"), [values]);

  function clamp(next: number) {
    return Math.max(MIN_COUNT, Math.min(MAX_COUNT, next));
  }

  function generate() {
    setValues(generateUuidBatch(count, uppercase));
    outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <ToolShell label="UUID v4 generator">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-2">
            <Hash className="h-3.5 w-3.5 text-accent" /> Output
          </span>
        </div>
        <ToolStatus tone="ok">
          <Check className="h-3.5 w-3.5" />
          {values.length} {values.length === 1 ? "UUID" : "UUIDs"} · RFC 4122 v4
        </ToolStatus>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-3 py-3">
        <div className="flex items-center gap-2">
          <label htmlFor="uuid-count" className="text-xs font-semibold text-ink-2">
            Amount
          </label>
          <div className="flex items-center gap-1 rounded-lg border border-line bg-surface-2 p-0.5">
            <button
              type="button"
              onClick={() => setCount((value) => clamp(value - 1))}
              disabled={count <= MIN_COUNT}
              className="grid h-8 w-8 place-items-center rounded-md text-ink-3 transition-colors hover:text-ink disabled:opacity-40"
              aria-label="Decrease amount"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input
              id="uuid-count"
              type="number"
              min={MIN_COUNT}
              max={MAX_COUNT}
              value={count}
              onChange={(event) => setCount(clamp(Number(event.target.value) || MIN_COUNT))}
              className="h-8 w-16 bg-transparent text-center font-mono text-sm text-ink outline-none"
            />
            <button
              type="button"
              onClick={() => setCount((value) => clamp(value + 1))}
              disabled={count >= MAX_COUNT}
              className="grid h-8 w-8 place-items-center rounded-md text-ink-3 transition-colors hover:text-ink disabled:opacity-40"
              aria-label="Increase amount"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <OptionGroup
          label="Letter case"
          options={[
            { value: "lower", label: "lowercase" },
            { value: "upper", label: "UPPERCASE" },
          ]}
          value={uppercase ? "upper" : "lower"}
          onChange={(next) => setUppercase(next === "upper")}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex flex-row gap-2 border-b border-line px-3 py-3 lg:w-44 lg:flex-col lg:border-b-0 lg:border-r lg:px-0 lg:py-2">
          <button
            type="button"
            onClick={generate}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0 lg:flex-none"
          >
            <Hash className="h-4 w-4" /> Generate
          </button>
          <button
            type="button"
            onClick={() => setValues([])}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line text-ink-2 transition-colors hover:border-danger/40 hover:text-danger"
            aria-label="Clear output"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div ref={outputRef} className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink-2">
              <Hash className="h-4 w-4 shrink-0 text-accent" />
              Generated UUIDs
            </span>
            <div className="flex items-center gap-1.5">
              <CopyButton onClick={() => copy(text)} copied={copied} disabled={!values.length} />
              <DownloadButton
                href={
                  values.length
                    ? `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
                    : undefined
                }
                fileName="uuids.txt"
                disabled={!values.length}
              />
            </div>
          </div>

          {values.length ? (
            <pre className="max-h-[480px] flex-1 overflow-auto bg-canvas/40 px-3 py-3 font-mono text-[13px] leading-6 text-ink whitespace-pre">
              {text}
            </pre>
          ) : (
            <div className="flex min-h-[160px] flex-col gap-2 bg-canvas/40 px-3 py-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-3">
                <RefreshCw className="h-4 w-4" /> Nothing generated yet
              </span>
              <p className="text-xs text-ink-3">
                Choose how many identifiers you need and press Generate. Every value is created
                locally with the Web Crypto API.
              </p>
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
