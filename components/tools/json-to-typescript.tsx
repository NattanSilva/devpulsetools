"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Braces,
  Check,
  ClipboardPaste,
  FileCode2,
  RefreshCw,
  Trash2,
  Wand2,
} from "lucide-react";
import {
  SAMPLE_JSON,
  jsonToTypescript,
  type DeclarationStyle,
  type IndentSize,
  type ConvertResult,
} from "@/lib/jsonToTypescript";
import {
  CopyButton,
  DownloadButton,
  KeyboardHints,
  OptionGroup,
  ToolShell,
  ToolStatus,
  useCopy,
} from "@/components/tools/tool-panel";

export function JsonToTypescript() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [style, setStyle] = useState<DeclarationStyle>("type");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [result, setResult] = useState<ConvertResult | null>(() =>
    jsonToTypescript(SAMPLE_JSON, { style: "type", indent: 2 }),
  );
  const { copied, copy } = useCopy();
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(jsonToTypescript(input, { style, indent }));
    }, 250);
    return () => clearTimeout(timer);
  }, [input, style, indent]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const modifier = e.metaKey || e.ctrlKey;
      if (!modifier) return;
      const target = e.target as HTMLElement | null;
      const editing =
        target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement;

      if (e.key === "Enter") {
        e.preventDefault();
        setResult(jsonToTypescript(input, { style, indent }));
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (e.key.toLowerCase() === "c" && !editing && result?.ok) {
        e.preventDefault();
        copy(result.code);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, style, indent, result]);

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInput(text);
    } catch {
      /* clipboard read requires permission; ignore */
    }
  }

  function reset() {
    setInput(SAMPLE_JSON);
    setStyle("type");
    setIndent(2);
    setResult(jsonToTypescript(SAMPLE_JSON, { style: "type", indent: 2 }));
  }

  const status = useMemo(() => {
    if (!input.trim()) return { tone: "idle" as const, label: "Waiting for input" };
    if (!result) return { tone: "idle" as const, label: "Ready" };
    if (!result.ok) return { tone: "error" as const, label: "Invalid JSON" };
    const types = result.typeCount;
    return {
      tone: "ok" as const,
      label: `Valid · ${types} ${types === 1 ? "type" : "types"}`,
    };
  }, [input, result]);

  return (
    <ToolShell label="JSON to TypeScript converter">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-2">
            <Braces className="h-3.5 w-3.5 text-accent" /> Input
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-3">
            <FileCode2 className="h-3.5 w-3.5" /> Output
          </span>
        </div>
        <ToolStatus tone={status.tone}>
          {status.tone === "ok" ? (
            <Check className="h-3.5 w-3.5" />
          ) : status.tone === "error" ? (
            <AlertCircle className="h-3.5 w-3.5" />
          ) : null}
          {status.label}
        </ToolStatus>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-3 py-2">
        <OptionGroup
          label="Declaration style"
          options={[
            { value: "type", label: "type" },
            { value: "interface", label: "interface" },
          ]}
          value={style}
          onChange={(next) => setStyle(next)}
        />
        <OptionGroup
          label="Indentation"
          options={[
            { value: 2, label: "2 spaces" },
            { value: 4, label: "4 spaces" },
          ]}
          value={indent}
          onChange={(next) => setIndent(next)}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col lg:w-[45%]">
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink-2">
              <Braces className="h-4 w-4 shrink-0 text-accent" />
              JSON input
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setInput(SAMPLE_JSON)}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Wand2 className="h-3.5 w-3.5" /> Sample
              </button>
              <button
                type="button"
                onClick={() => void pasteFromClipboard()}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ClipboardPaste className="h-3.5 w-3.5" /> Paste
              </button>
              <button
                type="button"
                onClick={() => setInput("")}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-danger/40 hover:text-danger"
                aria-label="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            aria-label="JSON payload"
            placeholder='Paste or type a JSON payload, e.g. { "user": { "id": 1 } }'
            className="h-56 w-full resize-none bg-canvas/40 px-3 py-3 font-mono text-[13px] leading-6 text-ink outline-none placeholder:text-ink-3 lg:h-80"
          />
        </div>

        <div className="flex flex-row gap-2 border-t border-line px-3 py-3 lg:w-44 lg:flex-col lg:self-center lg:border-x lg:border-t-0 lg:px-0 lg:py-2">
          <button
            type="button"
            onClick={() => {
              setResult(jsonToTypescript(input, { style, indent }));
              outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0 lg:flex-none"
          >
            <Braces className="h-4 w-4" /> Generate
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line text-ink-2 transition-colors hover:border-warn/40 hover:text-warn"
            aria-label="Reset to sample"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={outputRef}
          className="flex min-w-0 flex-1 flex-col border-t border-line lg:w-[45%] lg:border-t-0"
        >
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink-2">
              <FileCode2 className="h-4 w-4 shrink-0 text-accent" />
              TypeScript output
            </span>
            <div className="flex items-center gap-1.5">
              <CopyButton onClick={() => result?.ok && copy(result.code)} copied={copied} disabled={!result?.ok} />
              <DownloadButton
                href={
                  result?.ok
                    ? `data:text/plain;charset=utf-8,${encodeURIComponent(result.code)}`
                    : undefined
                }
                fileName="types.ts"
                disabled={!result?.ok}
              />
            </div>
          </div>

          {result?.ok ? (
            <pre className="max-h-[420px] flex-1 overflow-auto bg-canvas/40 px-3 py-3 font-mono text-[13px] leading-6 text-ink whitespace-pre">
              {result.code}
            </pre>
          ) : (
            <div className="flex min-h-[140px] flex-col gap-2 bg-canvas/40 px-3 py-3 lg:min-h-[240px]">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-danger">
                <AlertCircle className="h-4 w-4" /> {result?.error ?? "Ready to generate"}
              </span>
              <p className="text-xs text-ink-3">
                {result?.ok === false
                  ? `Fix the JSON syntax above (${result.error.split("\n")[0]}).`
                  : "Paste a JSON payload and press Generate."}
              </p>
            </div>
          )}

          <KeyboardHints />
        </div>
      </div>
    </ToolShell>
  );
}
