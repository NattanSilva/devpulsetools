export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolExample {
  /** Raw payload the user pastes into the tool. */
  input: string;
  /** What the tool produces for that payload. */
  output: string;
  /** Language used to highlight the output block. */
  language: string;
}

export interface ToolSeoContent {
  slug: string;
  /** Human readable tool name, used to build the "O que é o X" heading. */
  toolName: string;
  /** 2-3 explanatory paragraphs about what the tool is and why it matters. */
  whatIs: string[];
  /** Step by step usage guide. */
  howToSteps: string[];
  /** Practical example showing input vs generated output. */
  example: ToolExample;
  /** Real-world application scenarios. */
  useCases: string[];
  /** Optional extra tips. */
  bestPractices?: string[];
  /** Transparent description of what the tool does NOT support. */
  limitations: string[];
  /** At least three question/answer pairs. */
  faqs: ToolFaq[];
}

const jsonFormatter: ToolSeoContent = {
  slug: "json-formatter",
  toolName: "JSON Formatter & Validator",
  whatIs: [
    "JSON (JavaScript Object Notation) is the de-facto format for API requests and responses, configuration files and data interchange between services. The problem is that most of the JSON you encounter in the wild is minified onto a single line, or worse, subtly broken. A single missing comma, a stray trailing comma or an unescaped quote turns a perfectly good payload into an error that takes time to trace.",
    "A JSON formatter and validator solves both problems in one step. It parses your input, pinpoints the exact line and column of any syntax error, and re-prints valid JSON with clean, predictable indentation — two or four spaces — so you can read nested structures, spot mistakes and share readable payloads in documentation or bug reports. It also produces the minified form useful for reducing transfer size in scripts and CI fixtures.",
    "Because this utility runs 100% in your browser, you can format production payloads, customer records or internal API responses without worrying about the data being uploaded, logged or stored anywhere. The result is effectively instant, works offline, and keeps your most sensitive JSON exactly where it belongs: on your machine.",
  ],
  howToSteps: [
    "Paste your raw JSON into the input area, or click Sample to load a realistic example.",
    "Choose the indentation you want — 2 or 4 spaces — or switch to the minified output mode.",
    "Press Format or the Ctrl / ⌘ + Enter shortcut. Valid input is pretty-printed instantly.",
    "If your input contains an error, the tool reports the exact line and column so you can fix it quickly.",
    "Copy the result with the one-click copy button or download it as a .json file.",
  ],
  example: {
    input: `{"name":"StackPulse","tags":["json","tools"],"stats":{"stars":12}}`,
    output: `{
  "name": "StackPulse",
  "tags": [
    "json",
    "tools"
  ],
  "stats": {
    "stars": 12
  }
}`,
    language: "json",
  },
  useCases: [
    "Pretty-print minified JSON from API logs and network inspector panels before debugging",
    "Validate payloads when integrating new endpoints or webhooks from third-party providers",
    "Generate minified JSON fixtures for tests, seed scripts and stored procedures",
    "Prepare readable, well-indented JSON samples for code reviews and documentation",
  ],
  bestPractices: [
    "Keep the indentation consistent across a repository so diffs stay small and reviewable.",
    "Format before committing JSON fixtures — minified files hide missing fields in review.",
    "Validate the response body of a webhook before acknowledging it in production.",
  ],
  limitations: [
    "The tool validates JSON syntax only. It does not check whether the payload matches a schema, an OpenAPI contract or your business rules — use a schema validator for that.",
    "Only standard JSON is supported. JSON5, JSONC, comments, trailing commas, unquoted keys and single-quoted strings are rejected as invalid, exactly as a strict JSON parser would.",
    "Very large payloads (tens of megabytes) are formatted synchronously in the main thread and may briefly freeze the tab while the pretty-printer walks the object tree.",
    "The formatter normalises whitespace only: key order, number precision and string escapes are preserved as parsed, so it is safe to round-trip payloads through it.",
  ],
  faqs: [
    {
      q: "Does the formatter send my JSON anywhere?",
      a: "No. Parsing and formatting happen entirely inside your browser tab using the native JSON parser. Nothing is uploaded, persisted or logged on our servers.",
    },
    {
      q: "Which JSON constructs are supported?",
      a: "Every valid JSON value: objects, arrays, strings, numbers, booleans and null. Nested structures, escaped characters and unicode content are handled automatically.",
    },
    {
      q: "Can a line number help me find errors in huge files?",
      a: "Yes. On a parse failure the tool reports the exact line and column of the offending token, which makes locating defects in large payloads far faster than eyeballing minified text.",
    },
    {
      q: "Is the output safe to send back to an API?",
      a: "Yes. Formatting only changes whitespace, so the parsed value is identical to your input. A payload that validates before formatting will validate after it.",
    },
    {
      q: "Does it work offline?",
      a: "Yes. After the page is loaded the formatter runs entirely on your device, so it keeps working without an internet connection.",
    },
  ],
};

const jsonToTypescript: ToolSeoContent = {
  slug: "json-to-typescript",
  toolName: "JSON to TypeScript",
  whatIs: [
    "Modern frontend and backend codebases lean on TypeScript for type safety, and most integrations — REST APIs, third-party webhooks, configuration files — speak JSON. Hand-typing interfaces for each payload is slow, error prone and drifts out of sync the moment the API response changes. Converting JSON to TypeScript types automatically turns a response shape into a compile-time contract: the moment a field is renamed, removed or its type changes, your editor and your CI pipeline catch it before your users do.",
    "StackPulse's JSON to TypeScript converter accepts any valid JSON — objects, arrays, deeply nested payloads, arrays of mixed primitives — and generates a clean, strongly typed declaration with two-space or four-space indentation, in either type or interface style. Helpers like the null union, uniform arrays versus mixed unions, and quoted property names for unusual keys are handled automatically.",
    "Because the conversion is 100% client-side, sensitive payloads — customer records, internal API responses, production data dumps — are processed locally and never leave the browser. There is no upload, no queue and no processing server, which is also why the result is effectively instantaneous and works even on flaky or offline network connections. The generated declarations are self-contained export type or export interface definitions that drop straight into your codebase.",
  ],
  howToSteps: [
    "Paste a JSON payload, or click Sample to load a realistic example object.",
    "Choose type or interface output, plus the indentation width you prefer.",
    "Click Generate — or press Ctrl / ⌘ + Enter — to build the declaration.",
    "Review the generated shape: nested objects, arrays and mixed unions are typed automatically.",
    "Copy the result into your types.ts file or download it for later reference.",
  ],
  example: {
    input: `{
  "id": 7,
  "name": "StackPulse",
  "active": true,
  "tags": ["typescript", "json"],
  "address": { "city": "Sao Paulo", "country": "BR" }
}`,
    output: `export type Root = {
  id: number;
  name: string;
  active: boolean;
  tags: string[];
  address: {
    city: string;
    country: string;
  };
};`,
    language: "typescript",
  },
  useCases: [
    "Consume REST and GraphQL responses without hand-typing types for each resource",
    "Generate request DTOs for API clients, SDKs and internal services",
    "Prototype data shapes for forms, validation schemas and state management",
    "Re-sync stale interface definitions whenever a vendor API response changes",
  ],
  bestPractices: [
    "Use a real production response as the sample, not a minimal payload — empty arrays and nulls hide important type information.",
    "Rename the generated Root type to something semantic, such as UserResponse, once you paste it into your codebase.",
    "Treat the generated types as a starting point: they describe one observed shape, not the full contract of the API.",
    "Keep the generated file close to the client that consumes it, so a payload change is reviewed together with the code that reads it.",
  ],
  limitations: [
    "The generator infers types from a single sample, so optional fields, alternative shapes and union members that never appear in the pasted JSON cannot be detected. Add them manually or validate at runtime.",
    "JSON has no date type: every timestamp arrives as a string and is emitted as string. Convert it to Date or a branded type in your own code.",
    "The output is a single anonymous type. It does not generate named sub-interfaces, enums, generics, readonly modifiers or discriminated unions, and it does not deduplicate repeated shapes.",
    "Duplicate keys in the source object are collapsed by the JSON parser, so the last occurrence wins — the generator cannot recover the overwritten value.",
    "Special JSON values such as NaN and Infinity are not valid JSON and are rejected before the conversion starts.",
  ],
  faqs: [
    {
      q: "Do you send my JSON to a server?",
      a: "No. The entire conversion happens with a JSON parser and type generator running inside your browser tab. Your input is never transmitted and never stored.",
    },
    {
      q: "What happens when keys are not valid TypeScript identifiers?",
      a: "Keys that contain spaces, dashes or reserved words are automatically wrapped in quotes (e.g. \"payment-status\"), so the generated types always compile.",
    },
    {
      q: "Which JSON values are supported?",
      a: "Every JSON value: objects, arrays, strings, numbers, booleans and null. Homogeneous arrays become typed arrays; mixed arrays become unions; empty arrays become unknown[].",
    },
    {
      q: "Should I use type or interface for the generated code?",
      a: "Both are valid output. Use type when the shape may later need unions or intersections, and interface when the declaration is meant to be extended by other modules. The tool lets you pick either.",
    },
    {
      q: "Does it work with large API responses?",
      a: "Yes, as long as the payload fits in memory. Conversion happens locally, so a multi-megabyte response is processed without a network round trip, and the result is available immediately.",
    },
  ],
};

const base64Encoder: ToolSeoContent = {
  slug: "base64-encoder",
  toolName: "Base64 Encoder / Decoder",
  whatIs: [
    "Base64 is the workhorse encoding for embedding binary data in text-based protocols: inline images in HTML emails, authentication tokens, data URIs in CSS, and payloads in JSON that must survive transport over systems that only handle printable ASCII. Instead of a raw stream of bytes, you get a compact string of letters, digits and symbols that any text channel — headers, query strings, chat messages — can carry safely.",
    "An encoder/decoder lets you go both ways. Encode plain text, or a binary file, into a Base64 string with a single action, or decode an encoded string back into the original text so you can inspect what a token or inline asset actually contains. Decoding is also the first step when debugging cached or embedded content that is not rendering.",
    "Both directions run entirely in your browser. That matters because tokens and encoded payloads frequently contain sensitive information — credentials embedded in configs, signed JWTs, private data URIs. Encoding or decoding them locally means the strings never travel to a third-party server, which is exactly the behaviour you want when you are inspecting unfamiliar input.",
  ],
  howToSteps: [
    "Switch between the Encode and Decode modes with the toggle at the top of the panel.",
    "Type or paste your text, or use the file picker to load a binary in encode mode.",
    "Press Run or Ctrl / ⌘ + Enter to process the input instantly.",
    "Review the resulting string or decoded text in the output pane.",
    "Copy the result to the clipboard or download the decoded binary as a file.",
  ],
  example: {
    input: `Hello, StackPulse`,
    output: `SGVsbG8sIFN0YWNrUHVsc2U=`,
    language: "text",
  },
  useCases: [
    "Encode text or small binaries before embedding them in JSON, YAML and data URIs",
    "Decode JWT segments and API tokens to inspect their contents during debugging",
    "Prepare images and assets as Base64 for CSS, HTML emails or thumbnails",
    "Encode config secrets for quick transport through systems that only accept text",
  ],
  bestPractices: [
    "Remember that Base64 is not encryption — never use it to hide secrets, only to transport them safely.",
    "Strip whitespace when pasting an encoded value, because line breaks inside a token are invalid in most HTTP headers.",
    "Prefer a data URI over a huge Base64 blob in HTML: it removes a network request but blocks rendering until the payload is decoded.",
  ],
  limitations: [
    "Base64 is an encoding, not encryption: any Base64 string can be decoded by anyone. Never treat it as a way to protect a password or an API key.",
    "Encoding inflates the payload by roughly 33% (plus padding), so it is not a compression technique and large binaries should be compressed before being encoded.",
    "The decoder is strict: it rejects characters outside the Base64 alphabet and reports malformed padding instead of silently ignoring it, which means it will not repair a corrupted payload.",
    "URL-safe Base64 (with - and _ instead of + and /) is not produced by default, because the standard alphabet is what most HTTP and cookie contexts expect.",
    "Only one file is processed at a time, and the browser's File API reads the file entirely into memory before converting it.",
  ],
  faqs: [
    {
      q: "Is Base64 encryption?",
      a: "No. Base64 is an encoding, not encryption. Anyone can decode it. Treat Base64 strings as plaintext and avoid putting genuine secrets in them.",
    },
    {
      q: "Does this tool handle binary files?",
      a: "Yes. In encode mode you can select a file and it is converted to a Base64 string in the browser. In decode mode the result of binary content can be downloaded back as a file.",
    },
    {
      q: "Is my string sent to a server?",
      a: "Never. Encoding and decoding use native browser APIs locally, so the content you process stays on your device at all times.",
    },
    {
      q: "Why does my encoded string end with an equals sign?",
      a: "The trailing = characters are padding. Base64 works on blocks of three bytes, so the final block is padded to a multiple of four whenever the input length is not divisible by three.",
    },
    {
      q: "Can I decode a JWT with this tool?",
      a: "You can decode the Base64url segments of a JWT to read the header and payload, but you cannot verify its signature without the signing key — treat the decoded content as untrusted input.",
    },
  ],
};

const uuidGenerator: ToolSeoContent = {
  slug: "uuid-generator",
  toolName: "UUID / GUID Generator",
  whatIs: [
    "Universally unique identifiers are the standard way to give objects a collision-resistant identity without a central service. A version 4 UUID is a 128-bit value with 122 bits of random data — enough randomness that the probability of two generated values colliding anywhere in the world is negligible for practical purposes. They appear everywhere: database primary keys, cache keys, transaction IDs, session tokens and client-generated IDs that the server later adopts.",
    "A UUID generator batch-creates one, ten or a thousand identifiers in a single click, using the browser's cryptographically secure random generator rather than a predictable pseudo-random seed. Each UUID follows the RFC 4122 formatting — 8-4-4-4-12, lowercase hexadecimal with hyphens — which is what the vast majority of APIs, ORMs and databases expect.",
    "Because generation happens locally, you can mint identifiers for architecture diagrams, seed scripts and documentation without an online dependency, and you control exactly how many you produce. Copy the whole batch to the clipboard with one tap and paste it straight into seed scripts or mock data generators.",
  ],
  howToSteps: [
    "Choose how many identifiers you need — single, or a batch of up to 1.000.",
    "Toggle options such as uppercase output if your target system requires it.",
    "Press Generate or Ctrl / ⌘ + Enter to create the identifiers instantly.",
    "Scrutinise the output: every value is RFC 4122 v4 formed with a cryptographically secure source.",
    "Copy the full batch or individual values into your script, file or ticket.",
  ],
  example: {
    input: `Generate 3 UUIDs (lowercase, RFC 4122 v4)`,
    output: `3f17f1e2-9c4b-4d2a-9b0e-6d8c1f0a2b3c
b8d4e0a7-1f36-4c58-8a12-77ce9b3d5e01
c25a7b91-4e0d-42f7-b6c3-9d1e8a47f205`,
    language: "text",
  },
  useCases: [
    "Generate batch primary keys for database seed scripts and fixtures",
    "Create client-side IDs for optimistic UI updates that reconcile later",
    "Produce test identifiers for load-tested APIs and message queues",
    "Generate unique names for local project tokens and sample records",
  ],
  bestPractices: [
    "Use UUIDs when identifiers must be created offline or in more than one place; use auto-increment integers when a single database is the only writer.",
    "Store UUIDs as native uuid columns (PostgreSQL) or 16-byte binary (MySQL) to keep indexes compact.",
    "Remember that v4 UUIDs are random: in write-heavy tables they fragment B-tree indexes, so prefer UUID v7 or ULID when ordering matters.",
  ],
  limitations: [
    "Only version 4 (random) UUIDs are generated. Time-ordered formats such as UUID v7, ULID and NanoID are not produced.",
    "Uniqueness is probabilistic, not guaranteed: v4 carries 122 random bits, so collisions are practically impossible but not mathematically excluded.",
    "The generator does not persist history — reloading the page discards the current batch, so copy anything you need to keep.",
    "UUIDs are not sortable by creation time. If you need chronological ordering, do not rely on the lexical order of a v4 value.",
  ],
  faqs: [
    {
      q: "Are generated UUIDs guaranteed to be unique?",
      a: "No identifier can be guaranteed absolutely, but v4 UUIDs have 122 random bits, making collisions practically impossible for reasonable batch sizes. This tool uses a cryptographically secure random source.",
    },
    {
      q: "Should UUIDs be used as database primary keys?",
      a: "They are widely used and safe for distributed systems where IDs must be generated offline. For very large tables, UUID v4's randomness can affect index locality; some teams prefer UUID v7 or sequential keys for write-heavy workloads.",
    },
    {
      q: "Does generation require an internet connection?",
      a: "No. UUIDs are created locally using the Web Crypto API, so the generator works fully offline.",
    },
    {
      q: "What does the version digit in the third group mean?",
      a: "In a version 4 UUID the first character of the third group identifies the version — it is always 4. The first character of the fourth group encodes the variant, and is one of 8, 9, a or b for the standard RFC 4122 layout.",
    },
    {
      q: "Are the UUIDs safe to use as security tokens?",
      a: "They are random enough for identifiers, but they are not secrets by themselves. Never expose a UUID that grants access and rely on proper authentication and authorisation instead.",
    },
  ],
};

export const toolSeoContent: Record<string, ToolSeoContent> = Object.fromEntries(
  [jsonFormatter, jsonToTypescript, base64Encoder, uuidGenerator].map((content) => [
    content.slug,
    content,
  ]),
);

export function getToolSeo(slug: string): ToolSeoContent | undefined {
  return toolSeoContent[slug];
}
