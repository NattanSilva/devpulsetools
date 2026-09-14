import {
  ArrowLeftRight,
  Binary,
  Braces,
  Database,
  FileCode2,
  Hash,
  KeyRound,
  Regex,
  Ruler,
  Sparkles,
  Timer,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type ToolCategoryId = "formatters" | "converters" | "generators";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface ToolMeta {
  slug: string;
  name: string;
  category: ToolCategoryId;
  tagline: string;
  description: string;
  keywords: string[];
  icon: LucideIcon;
  status: "live" | "soon";
}

export const toolCategories: ToolCategory[] = [
  {
    id: "formatters",
    label: "Formatters & Validators",
    description: "Format, validate and generate clean output for day-to-day data.",
    icon: Wand2,
  },
  {
    id: "converters",
    label: "Converters & Type Generators",
    description: "Convert between formats and generate strong TypeScript types.",
    icon: ArrowLeftRight,
  },
  {
    id: "generators",
    label: "Developer Generators",
    description: "Batch-generate UUIDs, hashes and regex test runs in the browser.",
    icon: Sparkles,
  },
];

export const tools: ToolMeta[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "formatters",
    tagline: "Format, minify and validate JSON instantly",
    description:
      "Pretty-print or minify any JSON payload with 2/4 space indentation, plus precise syntax error detection with line highlighting — all in your browser.",
    keywords: ["json formatter", "json validator", "json pretty print", "json minify", "format json"],
    icon: Braces,
    status: "soon",
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    category: "formatters",
    tagline: "Turn raw SQL queries into readable statements",
    description:
      "Reformat raw SQL into clean, multi-line, indented queries ready for review, debugging or documentation.",
    keywords: ["sql formatter", "format sql query", "sql beautifier"],
    icon: Database,
    status: "soon",
  },
  {
    slug: "cron-generator",
    name: "Cron Expression Generator",
    category: "formatters",
    tagline: "Build standard 5-part cron expressions visually",
    description:
      "Create Linux cron expressions from interactive dropdowns with instant visual validation of the generated syntax.",
    keywords: ["cron generator", "cron expression", "crontab maker", "linux cron"],
    icon: Timer,
    status: "soon",
  },
  {
    slug: "json-to-typescript",
    name: "JSON to TypeScript",
    category: "converters",
    tagline: "Paste JSON, get clean TypeScript types instantly",
    description:
      "Convert any JSON payload into a strongly typed TypeScript type or interface automatically. One-click copy, zero uploads — processing happens entirely in your browser.",
    keywords: [
      "json to typescript",
      "json to interface",
      "typescript type generator",
      "json to ts",
      "generate typescript types from json",
    ],
    icon: FileCode2,
    status: "live",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    category: "converters",
    tagline: "Encode text and files to Base64 — or decode them back",
    description:
      "Encode plain text or binary files to Base64 strings and decode Base64 back to readable content, fully in the browser.",
    keywords: ["base64 encoder", "base64 decoder", "base64 file", "encode base64"],
    icon: Binary,
    status: "soon",
  },
  {
    slug: "px-to-rem",
    name: "PX to REM / VW Converter",
    category: "converters",
    tagline: "Convert CSS units with a configurable base font size",
    description:
      "Convert pixel values to REM or VW units with a customizable root font size, perfect for responsive and accessible layouts.",
    keywords: ["px to rem", "px to vw", "css unit converter", "rem converter"],
    icon: Ruler,
    status: "soon",
  },
  {
    slug: "uuid-generator",
    name: "UUID / GUID Generator",
    category: "generators",
    tagline: "Bulk-generate v4 UUIDs with one-click copy",
    description:
      "Generate one or many RFC 4122 v4 UUIDs with a single click to copy the whole batch to your clipboard.",
    keywords: ["uuid generator", "guid generator", "uuid v4", "generate uuid"],
    icon: Hash,
    status: "soon",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "generators",
    tagline: "MD5, SHA-1, SHA-256 and SHA-512 via the SubtleCrypto API",
    description:
      "Compute cryptographic hashes of your text with the native Web Crypto API — hashes are computed locally and never transmitted.",
    keywords: ["hash generator", "sha256", "md5 hash", "sha512", "sha1"],
    icon: KeyRound,
    status: "soon",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "generators",
    tagline: "Live regex matching with group capture",
    description:
      "Test regular expressions in real time with highlighted matches and captured groups, right in the browser.",
    keywords: ["regex tester", "regex playground", "regular expression tester"],
    icon: Regex,
    status: "soon",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function toolsByCategory(category: ToolCategoryId): ToolMeta[] {
  return tools.filter((tool) => tool.category === category);
}

export function getCategory(id: ToolCategoryId): ToolCategory {
  return toolCategories.find((category) => category.id === id) as ToolCategory;
}