# StackPulse

Fast, free and private developer utilities that run **100% in the browser**. Every tool is a
statically pre-rendered page: the payload you paste is parsed, formatted or generated locally and
never uploaded to a server.

Live at [stackpulse.com.br](https://www.stackpulse.com.br).

## Published tools

| Tool | Route | What it does |
| --- | --- | --- |
| JSON Formatter & Validator | `/tools/json-formatter` | Pretty-print, minify and validate JSON with line/column error reporting |
| JSON to TypeScript | `/tools/json-to-typescript` | Turn any JSON payload into a typed `type` or `interface` |
| Base64 Encoder / Decoder | `/tools/base64-encoder` | Encode text and files to Base64, or decode them back |
| UUID / GUID Generator | `/tools/uuid-generator` | Bulk-generate RFC 4122 v4 UUIDs with a cryptographically secure source |

A tool is only added to `lib/tools.ts` → `tools` once its implementation is complete. Planned tools
live in `lib/tools.ts` → `upcomingTools` and are **not** routed, linked, indexed or listed in the
sitemap until they ship.

## Content structure

- **Home** (`/`) — tool catalogue plus authority sections: *Developer tools built for everyday
  work*, *Why use StackPulse?*, *Who is StackPulse for?* and *Frequently Asked Questions*.
- **Tool pages** (`/tools/[slug]`) — interactive panel followed by a structured documentation
  block: *O que é o X e para que serve?*, *Como usar*, *Exemplo prático*, *Casos de uso comuns*,
  *Limitações técnicas* and *Perguntas Frequentes (FAQ)*.
- **Guides** (`/guides`) — long-form technical articles, each with a summary, table of contents and
  practical code examples.
- **Institutional** — `/sobre`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso`. The legacy
  English routes (`/about`, `/contact`, `/privacy`, `/terms`) are static meta-refresh redirects to
  the canonical Portuguese pages.

## Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS v4 (custom dark/light theme tokens in `app/globals.css`)
- lucide-react icons
- Google AdSense + Vercel Analytics

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run lint
npm test           # unit checks for the tool logic
npm run check:output   # validates the exported HTML (links, placeholders, encoding)
```

## Configuration

Copy `.env.example` to `.env.local` and adjust the values if needed:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for canonical tags, Open Graph and the sitemap |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id (defaults to the published one) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | Top banner ad unit |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Sidebar skyscraper ad unit |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT` | In-content responsive ad unit |

## Project layout

```
app/            routes, pages and metadata (static export)
components/     UI components (header, footer, tools, ads, SEO docs)
components/tools/  one client component per published tool
lib/            tool registry, SEO content and pure tool logic
scripts/        smoke tests for the tool logic
```

## Privacy

No tool sends data anywhere. Parsing, formatting, encoding and UUID generation happen inside the
browser tab, so sensitive payloads never leave the device. See
[Política de Privacidade](https://www.stackpulse.com.br/politica-de-privacidade).
