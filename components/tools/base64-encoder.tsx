"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Binary,
  Check,
  ClipboardPaste,
  FileCode2,
  FileUp,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import { decodeBase64, encodeBase64, fileToBase64 } from "@/lib/base64";
import {
  CopyButton,
  DownloadButton,
  KeyboardHints,
  OptionGroup,
  ToolShell,
  ToolStatus,
  useCopy,
} from "@/components/tools/tool-panel";

type Mode = "encode" | "decode";

const SAMPLE_TEXT = "Hello, StackPulse";

export function Base64Encoder() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState(SAMPLE_TEXT);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy } = useCopy();
  const outputRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => {
    if (mode === "encode") {
      if (!input) return { ok: false, text: "", binary: false };
      try {
        return { ok: true, text: encodeBase64(input), binary: false };
      } catch {
        return {
          ok: false,
          text: "",
          binary: false,
          error: "The content could not be encoded in the browser.",
        };
      }
    }
    return decodeBase64(input);
  }, [input, mode]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey)) return;
      const target = e.target as HTMLElement | null;
      const editing =
        target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement;

      if (e.key === "Enter" && !editing) {
        e.preventDefault();
        outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      if (e.key.toLowerCase() === "c" && !editing && result.ok) {
        e.preventDefault();
        copy(result.text);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, mode, result]);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setInput(base64);
      setFileName(file.name);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not read the file.");
    }
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        setFileName(null);
      }
    } catch {
      /* clipboard read requires permission; ignore */
    }
  }

  function reset() {
    setMode("encode");
    setInput(SAMPLE_TEXT);
    setFileName(null);
    setError(null);
  }

  const status = useMemo(() => {
    if (!input) return { tone: "idle" as const, label: "Waiting for input" };
    if (!result.ok) {
      return { tone: "error" as const, label: "Invalid input" };
    }
    return {
      tone: "ok" as const,
      label: `${result.text.length.toLocaleString("en-US")} chars`,
    };
  }, [input, result]);

  const downloadHref = result.ok
    ? `data:text/plain;charset=utf-8,${encodeURIComponent(result.text)}`
    : undefined;

  return (
    <ToolShell label="Base64 encoder and decoder">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-2">
            <Binary className="h-3.5 w-3.5 text-accent" /> Input
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
          label="Mode"
          options={[
            { value: "encode", label: "Encode" },
            { value: "decode", label: "Decode" },
          ]}
          value={mode}
          onChange={(next) => {
            setMode(next);
            setError(null);
          }}
        />
        <span className="text-xs text-ink-3">
          {mode === "encode"
            ? "Text or file → Base64 string"
            : "Base64 string → original content"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col lg:w-[45%]">
          <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
            <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink-2">
              <Binary className="h-4 w-4 shrink-0 text-accent" />
              {mode === "encode" ? "Text or file" : "Base64 input"}
            </span>
            <div className="flex items-center gap-1.5">
              {mode === "encode" && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      void handleFile(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Upload className="h-3.5 w-3.5" /> File
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => void pasteFromClipboard()}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ClipboardPaste className="h-3.5 w-3.5" /> Paste
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  setFileName(null);
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-ink-2 transition-colors hover:border-danger/40 hover:text-danger"
                aria-label="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          {mode === "encode" && fileName ? (
            <p className="flex items-center gap-2 border-b border-line bg-surface-2/60 px-3 py-2 text-xs text-ink-2">
              <FileUp className="h-3.5 w-3.5 text-accent" /> Loaded from {fileName}
            </p>
          ) : null}
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setFileName(null);
              setError(null);
            }}
            spellCheck={false}
            aria-label={mode === "encode" ? "Text to encode" : "Base64 string to decode"}
            placeholder={
              mode === "encode"
                ? "Type or paste the text you want to encode…"
                : "Paste the Base64 string you want to decode…"
            }
            className="h-56 w-full resize-none bg-canvas/40 px-3 py-3 font-mono text-[13px] leading-6 text-ink outline-none placeholder:text-ink-3 lg:h-80"
          />
        </div>

        <div className="flex flex-row gap-2 border-t border-line px-3 py-3 lg:w-44 lg:flex-col lg:self-center lg:border-x lg:border-t-0 lg:px-0 lg:py-2">
          <button
            type="button"
            onClick={() =>
              outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 active:translate-y-0 lg:flex-none"
          >
            <Binary className="h-4 w-4" /> {mode === "encode" ? "Encode" : "Decode"}
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
              {mode === "encode" ? "Base64 output" : "Decoded output"}
            </span>
            <div className="flex items-center gap-1.5">
              <CopyButton onClick={() => copy(result.text)} copied={copied} disabled={!result.ok} />
              <DownloadButton
                href={downloadHref}
                fileName={mode === "encode" ? "encoded.txt" : "decoded.txt"}
                disabled={!result.ok}
              />
            </div>
          </div>

          {result.ok ? (
            <pre className="max-h-[420px] flex-1 overflow-auto bg-canvas/40 px-3 py-3 font-mono text-[13px] leading-6 text-ink whitespace-pre-wrap">
              {result.text}
            </pre>
          ) : (
            <div className="flex min-h-[140px] flex-col gap-2 bg-canvas/40 px-3 py-3 lg:min-h-[240px]">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-danger">
                <AlertCircle className="h-4 w-4" />{" "}
                {error ?? result.error ?? "Nothing to process yet"}
              </span>
              <p className="text-xs text-ink-3">
                {mode === "encode"
                  ? "Type or paste some text, or load a file, to produce a Base64 string."
                  : "Paste a valid Base64 string (with the correct = padding) to decode it."}
              </p>
            </div>
          )}

          <KeyboardHints />
        </div>
      </div>
    </ToolShell>
  );
}
