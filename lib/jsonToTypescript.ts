export type DeclarationStyle = "type" | "interface";
export type IndentSize = 2 | 4;

export interface ConvertOptions {
  style: DeclarationStyle;
  indent: IndentSize;
}

export type ConvertResult =
  | { ok: true; code: string; typeCount: number; bytes: number }
  | { ok: false; error: string };

const IDENTIFIER_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function propertyName(key: string): string {
  return IDENTIFIER_RE.test(key) ? key : JSON.stringify(key);
}

interface Ctx {
  indent: string;
}

function tsType(value: unknown, ctx: Ctx, depth: number): string {
  if (value === null) return "unknown";
  switch (typeof value) {
    case "string":
      return "string";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "bigint":
      return "bigint";
    default:
      break;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const unique = Array.from(
      new Set(value.map((item) => tsType(item, ctx, depth + 1))),
    );
    if (unique.length === 1) return `${unique[0]}[]`;
    return `(${unique.join(" | ")})[]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const pad = ctx.indent.repeat(depth + 1);
    const props = entries
      .map(([key, val]) => `${pad}${propertyName(key)}: ${tsType(val, ctx, depth + 1)}`)
      .join("\n");
    return `{\n${props}\n${ctx.indent.repeat(depth)}}`;
  }

  return "unknown";
}

export function jsonToTypescript(input: string, options: ConvertOptions): ConvertResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }

  const ctx: Ctx = { indent: " ".repeat(options.indent) };
  const valueType = tsType(parsed, ctx, 0);

  if (options.style === "type") {
    const code = `export type Root = ${valueType};\n`;
    return {
      ok: true,
      code,
      typeCount: 1,
      bytes: new Blob([code]).size,
    };
  }

  if (valueType.startsWith("{\n")) {
    const inner = valueType.slice(1, -1);
    const code = `export interface Root {\n${inner.replace(/\n$/, "")}\n}\n`;
    return {
      ok: true,
      code,
      typeCount: 1,
      bytes: new Blob([code]).size,
    };
  }

  const code = `export type Root = ${valueType};\n`;
  return {
    ok: true,
    code,
    typeCount: 1,
    bytes: new Blob([code]).size,
  };
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

export function validateJson(input: string):
  | { valid: true; tokenCount: number }
  | { valid: false; error: string } {
  try {
    const parsed = JSON.parse(input);
    const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed as object).length;
    return { valid: true, tokenCount: count };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { valid: false, error: message };
  }
}