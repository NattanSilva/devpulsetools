export type JsonIndent = 2 | 4;
export type JsonMode = "pretty" | "minified";

export interface JsonFormatResult {
  ok: boolean;
  /** Formatted (or minified) output. Empty when `ok` is false. */
  output: string;
  /** Human readable error message. Only present when `ok` is false. */
  error?: string;
  /** 1-based line of the offending token. */
  line?: number;
  /** 1-based column of the offending token. */
  column?: number;
  /** Size of the produced output in bytes. */
  bytes: number;
  /** Number of top-level entries (object keys or array items). */
  entries: number;
}

export const SAMPLE_JSON = `{
  "id": 7,
  "name": "StackPulse",
  "email": "hello@example.com",
  "active": true,
  "score": 92.4,
  "tags": ["typescript", "json"],
  "createdAt": "2026-01-15T09:30:00Z",
  "address": {
    "city": "Sao Paulo",
    "country": "BR",
    "zip": "01310-100"
  },
  "metadata": {
    "owner": null,
    "plan": "pro"
  }
}`;

function positionToLineColumn(input: string, position: number) {
  const safePosition = Math.max(0, Math.min(position, input.length));
  const before = input.slice(0, safePosition);
  const lines = before.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

/**
 * Extracts the most precise location information available from the
 * native `JSON.parse` error message.
 */
function locateError(input: string, message: string) {
  const lineColumn = /line (\d+) column (\d+)/.exec(message);
  if (lineColumn) {
    return {
      line: Number(lineColumn[1]),
      column: Number(lineColumn[2]),
    };
  }

  const position = /position (\d+)/.exec(message);
  if (position) {
    return positionToLineColumn(input, Number(position[1]));
  }

  return positionToLineColumn(input, 0);
}

export function formatJson(
  input: string,
  options: { mode: JsonMode; indent: JsonIndent },
): JsonFormatResult {
  if (!input.trim()) {
    return {
      ok: false,
      output: "",
      error: "Waiting for input",
      bytes: 0,
      entries: 0,
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const { line, column } = locateError(input, message);
    return {
      ok: false,
      output: "",
      error: message.replace(/ in JSON at position \d+.*$/, "").trim() || "Invalid JSON",
      line,
      column,
      bytes: 0,
      entries: 0,
    };
  }

  const output =
    options.mode === "minified"
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, options.indent);

  const entries = Array.isArray(parsed)
    ? parsed.length
    : parsed && typeof parsed === "object"
      ? Object.keys(parsed as Record<string, unknown>).length
      : 1;

  return {
    ok: true,
    output,
    bytes: new Blob([output]).size,
    entries,
  };
}
