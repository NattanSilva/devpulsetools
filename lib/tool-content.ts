export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolTestCase {
  input: string;
  expected: string;
}

export interface ToolSeoContent {
  slug: string;
  h2: string;
  intro: string[];
  useCases: string[];
  howToTitle: string;
  howToSteps: string[];
  testCases: ToolTestCase[];
  faqs: ToolFaq[];
}

const jsonFormatter: ToolSeoContent = {
  slug: "json-formatter",
  h2: "Why format and validate JSON?",
  intro: [
    "JSON (JavaScript Object Notation) is the de-facto format for API requests and responses, configuration files and data interchange between services. The problem is that most of the JSON you encounter in the wild is minified onto a single line, or worse, subtly broken. A single missing comma, a stray trailing comma or an unescaped quote turns a perfectly good payload into an error that takes time to trace.",
    "A JSON formatter and validator solves both problems in one step. It parses your input, pinpoints the exact line and column of any syntax error, and re-prints valid JSON with clean, predictable indentation — two or four spaces — so you can read nested structures, spot mistakes and share readable payloads in documentation or bug reports. It also produces the minified form useful for reducing transfer size in scripts and CI fixtures.",
    "Because this utility runs 100% in your browser, you can format production payloads, customer records or internal API responses without worrying about the data being uploaded, logged or stored anywhere. The result is effectively instant, works offline, and keeps your most sensitive JSON exactly where it belongs: on your machine.",
  ],
  useCases: [
    "Pretty-print minified JSON from API logs and network inspector panels before debugging",
    "Validate payloads when integrating new endpoints or webhooks from third-party providers",
    "Generate minified JSON fixtures for tests, seed scripts and stored procedures",
    "Prepare readable, well-indented JSON samples for code reviews and documentation",
  ],
  howToTitle: "How to format and validate JSON",
  howToSteps: [
    "Paste your raw JSON into the input area, or click Sample to load a realistic example.",
    "Choose the indentation you want — 2 or 4 spaces — or switch to the minified output mode.",
    "Press Format or the Ctrl / ⌘ + Enter shortcut. Valid input is pretty-printed instantly.",
    "If your input contains an error, the tool reports the exact line and column so you can fix it quickly.",
    "Copy the result with the one-click copy button or download it as a .json file.",
  ],
  testCases: [
    { input: '{"name":"DevPulseTools","tags":["json","tools"],"stats":{"stars":12}}', expected: "Valid — formatted across 5 lines with 2-space indentation and nested objects expanded." },
    { input: '{"name": "broken", "tags": [1, 2,]}', expected: "Invalid — error reported at line 1, column 24 (unexpected token after array element)." },
  ],
  faqs: [
    {
      q: "Does the formatter send my JSON anywhere?",
      a: "No. Parsing and formatting happen entirely inside your browser tab. Nothing is uploaded, persisted or logged.",
    },
    {
      q: "Which JSON constructs are supported?",
      a: "Every valid JSON value: objects, arrays, strings, numbers, booleans and null. Nested structures and escaped characters are handled automatically.",
    },
    {
      q: "Can a line number help me find errors in huge files?",
      a: "Yes. On a parse failure the tool reports the exact line and column of the offending token, which makes locating defects in large payloads far faster than eyeballing minified text.",
    },
  ],
};

const sqlFormatter: ToolSeoContent = {
  slug: "sql-formatter",
  h2: "Why format SQL queries?",
  intro: [
    "Raw SQL written during a debugging session is rarely pretty: single-line joins, inconsistent casing and inline subqueries that wrap past the edge of the screen. When that query breaks, or when it needs to move into a codebase, documentation or a migration file, readable formatting saves real time.",
    "An SQL formatter normalises your query into a clean, indented, multi-line structure: one keyword per line at the right depth, consistent casing for keywords and identifiers, and clauses such as SELECT, JOIN, WHERE, GROUP BY and ORDER BY aligned so the query reads top-to-bottom. This makes complex logic with many joins and nested subqueries dramatically easier to review, explain and maintain.",
    "Formatted SQL is also a better starting point for optimisation: with every clause on its own line you can quickly spot redundant joins, missing predicates or conditions that belong in a WHERE instead of a HAVING. And because the entire transformation runs client-side, you can format production-quality queries that reference internal schemas without leaking them to any server.",
  ],
  useCases: [
    "Reformat long DDL and DML statements from legacy codebases before refactoring them",
    "Build readable, reviewable SQL for pull requests and data-team documentation",
    "Normalise queries you copied from logs, dashboards or ORM debug output",
    "Prepare clean seed and migration scripts with consistent indentation and casing",
  ],
  howToTitle: "How to format a SQL query",
  howToSteps: [
    "Paste the raw SQL statement into the input area, or load the sample query.",
    "Optionally set the keyword casing preference — upper, lower or preserve — and indentation width.",
    "Press Format or Ctrl / ⌘ + Enter to reformat the statement instantly.",
    "Review the result: joins, conditions and subqueries are aligned on their own lines.",
    "Copy the formatted query or download it as a .sql file for your migration or script.",
  ],
  testCases: [
    { input: "SELECT u.id,u.name FROM users u JOIN orders o ON o.user_id=u.id WHERE u.active=1 ORDER BY u.id DESC", expected: "Multi-line statement with each clause on its own line and aligned ON/WHERE conditions." },
    { input: "SELECT * FROM products WHERE category IN ('cloud','devops') AND price > 100", expected: "Two-line query with the WHERE clause and predicates split for readability." },
  ],
  faqs: [
    {
      q: "Which SQL dialects does the formatter understand?",
      a: "The formatter targets ANSI SQL and the common syntax shared by PostgreSQL, MySQL, SQLite and SQL Server. Dialect-specific constructs such as array functions and JSON operators are preserved as-is.",
    },
    {
      q: "Will the formatter change my query's meaning?",
      a: "No. Only whitespace, casing and line placement are adjusted. The token stream of the query is preserved, so the statement executes exactly the same after formatting.",
    },
    {
      q: "Is my query sent to a server?",
      a: "Never. Formatting happens locally in your browser, so proprietary schemas and internal queries never leave your device.",
    },
  ],
};

const cronGenerator: ToolSeoContent = {
  slug: "cron-generator",
  h2: "Why use a cron expression generator?",
  intro: [
    "Cron is the standard job scheduler on Linux and most Unix-like systems, but its five-field syntax — minute, hour, day of month, month and day of week — is notoriously easy to get wrong. Days 0 to 7, ranges, steps and the interaction between day-of-month and day-of-week rules confuse even experienced DevOps engineers, and a single inverted field can turn a nightly backup into an hourly one.",
    "A cron generator removes the guesswork by letting you build the expression from structured dropdowns: pick the minute pattern, the hour pattern, the days of the month, the months and the weekdays you care about, and the tool assembles the canonical five-part expression for you. It validates every field range, explains each part in plain language and shows the exact resulting schedule.",
    "Because the generator is 100% client-side, you can design job schedules for production servers without any third party seeing your infrastructure details. The output drops straight into crontab files, Kubernetes CronJobs, GitHub Actions cron syntax and countless cloud schedulers that follow the standard five-field format.",
  ],
  useCases: [
    "Author cron lines for server backups, maintenance windows and data-journal tasks",
    "Translate a colleague's 'every 15 minutes on weekdays at night' requirement into a valid expression",
    "Build repeatable cron fields for Kubernetes CronJob and CI pipeline definitions",
    "Verify an existing crontab entry matches the schedule the team actually intended",
  ],
  howToTitle: "How to generate a cron expression",
  howToSteps: [
    "Choose the minute interval, e.g. 'Every 15 minutes' or specific minutes such as '0, 30'.",
    "Choose the hour pattern — every hour, a specific hour, or a range such as 9–17.",
    "Select the day-of-month, month and weekday fields using the summary or wildcard options.",
    "Read the generated five-part expression in the preview field, with each part explained in plain language.",
    "Copy the cron line with one click and use it in crontab, systemd timers or your orchestration tool.",
  ],
  testCases: [
    { input: "Every day at 03:00", expected: "0 3 * * * — minute 0, hour 3, any day of month, month or weekday." },
    { input: "Every 15 minutes during business hours, weekdays", expected: "*/15 9-17 * * 1-5 — 15-minute steps between 09:00 and 17:59 from Monday to Friday." },
  ],
  faqs: [
    {
      q: "What does the 0/7 weekday ambiguity mean for my schedule?",
      a: "In the standard five-field format, Sunday can be represented as both 0 and 7. The generator uses 0 for Sunday and flags ambiguous ranges so your expression means exactly what you intend.",
    },
    {
      q: "Does this cron syntax work in Kubernetes and CI pipelines?",
      a: "Mostly, with caveats. crontab, systemd timers and the standard Vixie cron accept it directly. Kubernetes CronJob and GitHub Actions use almost identical five-field syntax with minor differences in allowed ranges — verify against your platform's documentation.",
    },
    {
      q: "Can it generate expressions for a specific date like 'on the 1st of every month'?",
      a: "Yes. Use the day-of-month dropdown to select '1' with month and weekday set to wildcard, producing 0 0 1 * *, which is the canonical 'first of the month at midnight' expression.",
    },
  ],
};

const jsonToTypescript: ToolSeoContent = {
  slug: "json-to-typescript",
  h2: "Why convert JSON to TypeScript?",
  intro: [
    "Modern frontend and backend codebases lean on TypeScript for type safety, and most integrations — REST APIs, third-party webhooks, configuration files — speak JSON. Hand-typing interfaces for each payload is slow, error prone and drifts out of sync the moment the API response changes. Converting JSON to TypeScript types automatically turns a response shape into a compile-time contract: the moment a field is renamed, removed or its type changes, your editor and your CI pipeline catch it before your users do.",
    "DevPulseTools' JSON to TypeScript converter accepts any valid JSON — objects, arrays, deeply nested payloads, arrays of mixed primitives — and generates a clean, strongly typed declaration with two-space or four-space indentation, in either type or interface style. Helpers like the null union, uniform arrays versus mixed unions, and quoted property names for unusual keys are handled automatically.",
    "Because the conversion is 100% client-side, sensitive payloads — customer records, internal API responses, production data dumps — are processed locally and never leave the browser. There is no upload, no queue and no processing server, which is also why the result is effectively instantaneous and works even on flaky or offline network connections. The generated declarations are self-contained export type or export interface definitions that drop straight into your codebase.",
  ],
  useCases: [
    "Consume REST and GraphQL responses without hand-typing types for each resource",
    "Generate request DTOs for API clients, SDKs and internal services",
    "Prototype data shapes for forms, validation schemas and state management",
    "Re-sync stale interface definitions whenever a vendor API response changes",
  ],
  howToTitle: "How to convert JSON to TypeScript",
  howToSteps: [
    "Paste a JSON payload, or click Sample to load a realistic example object.",
    "Choose type or interface output, plus the indentation width you prefer.",
    "Click Generate — or press Ctrl / ⌘ + Enter — to build the declaration.",
    "Review the nested interfaces: every object becomes its own named type.",
    "Copy the result into your types.ts file or download it for later reference.",
  ],
  testCases: [
    { input: '{"id":1,"name":"Alice","role":"admin","tags":["react","api"]}', expected: "interface Root with id: number, name: string, role: string and tags: string[]." },
    { input: '{"ok":true,"data":{"items":[{"id":1,"price":9.99},null]}}', expected: "Nested Data interface with items: (Item | null)[] — union type for mixed arrays." },
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
  ],
};

const base64Encoder: ToolSeoContent = {
  slug: "base64-encoder",
  h2: "Why encode and decode Base64?",
  intro: [
    "Base64 is the workhorse encoding for embedding binary data in text-based protocols: inline images in HTML emails, authentication tokens, data URIs in CSS, and payloads in JSON that must survive transport over systems that only handle printable ASCII. Instead of a raw stream of bytes, you get a compact string of letters, digits and symbols that any text channel — headers, query strings, chat messages — can carry safely.",
    "An encoder/decoder lets you go both ways. Encode plain text, or a binary file, into a Base64 string with a single action, or decode an encoded string back into the original text so you can inspect what a token or inline asset actually contains. Decoding is also the first step when debugging cached or embedded content that is not rendering.",
    "Both directions run entirely in your browser. That matters because tokens and encoded payloads frequently contain sensitive information — credentials embedded in configs, signed JWTs, private data URIs. Encoding or decoding them locally means the strings never travel to a third-party server, which is exactly the behaviour you want when you are inspecting unfamiliar input.",
  ],
  useCases: [
    "Encode text or small binaries before embedding them in JSON, YAML and data URIs",
    "Decode JWT segments and API tokens to inspect their contents during debugging",
    "Prepare images and assets as Base64 for CSS, HTML emails or thumbnails",
    "Encode config secrets for quick transport through systems that only accept text",
  ],
  howToTitle: "How to encode or decode Base64",
  howToSteps: [
    "Switch between the Encode and Decode modes with the toggle at the top of the panel.",
    "Type or paste your text, or use the file picker to load a binary in encode mode.",
    "Press Run or Ctrl / ⌘ + Enter to process the input instantly.",
    "Review the resulting string or decoded text in the output pane.",
    "Copy the result to the clipboard or download the decoded binary as a file.",
  ],
  testCases: [
    { input: "Encode: Hello, DevPulseTools", expected: "SGVsbG8sIERldlB1bHNlVG9vbHM= — standard Base64 with padding." },
    { input: "Decode: U2VuZGluZyBkYXRhIHNhZmVseS4=", expected: "Sending data safely. — the exact original text is restored." },
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
  ],
};

const pxToRem: ToolSeoContent = {
  slug: "px-to-rem",
  h2: "Why convert PX to REM (or VW)?",
  intro: [
    "REM units are the foundation of accessible, scalable typography and spacing. Because REM is relative to the root font size — 16 pixels by default in most browsers — switching values from REM to font-size on the <html> element scales the entire design. That keeps zoomed interfaces, larger accessibility fonts and responsive layouts consistent without a cascade of hard-coded pixel updates.",
    "Converting individual values by hand, however, is exactly the kind of repetitive maths that introduces rounding drift. A PX to REM converter does the division for you against your chosen base font size (default 16px), producing clean, rounded REM values that match the CSS conventions of your project. The same tool converts pixels to viewport-width (VW) units when you are building fluid layouts that scale to the browser window instead of the root font.",
    "The conversion runs locally in your browser, so there is no delay, no sign-up and no risk of your design tokens ending up on a foreign server. Paste a batch of pixel values, choose a base, and copy the converted declarations straight into your stylesheet.",
  ],
  useCases: [
    "Convert pixel-based design specs from Figma or Zeplin into accessible REM values",
    "Rebuild a fixed-pixel codebase into a scalable, user-font-respecting design system",
    "Compute VW values for fluid typography, grid gaps and full-bleed hero sections",
    "Normalise spacing tokens across a team that mixes px and em units",
  ],
  howToTitle: "How to convert PX to REM or VW",
  howToSteps: [
    "Enter one or more pixel values — comma or newline separated — into the input field.",
    "Set the base font size (16px by default) or leave it untouched for standard browsers.",
    "Choose REM or VW as the target unit, optionally with a precise decimal precision.",
    "Press Convert or Ctrl / ⌘ + Enter to compute every value instantly.",
    "Copy the resulting CSS values or the generated rem/vw declaration block.",
  ],
  testCases: [
    { input: "16px, 24px, 32px with a 16px base", expected: "1rem, 1.5rem, 2rem — tidy multiples of a 16px root font size." },
    { input: "100px as a VW value on a 1440px viewport", expected: "6.94vw — the pixel share of the design viewport width." },
  ],
  faqs: [
    {
      q: "Why does the base font size matter?",
      a: "1rem always equals the root font size. If your <html> uses font-size: 14px, then 1rem is 14px. Supplying the correct base keeps your converted values accurate for your specific project.",
    },
    {
      q: "Should I always use REM instead of PX?",
      a: "For most typography and spacing, REM is preferred because it respects user font-size preferences and makes scaling trivial. PX is still appropriate for borders, shadows and fine lines where fixed dimensions are intentional.",
    },
    {
      q: "Is this conversion done locally?",
      a: "Yes. All arithmetic happens in your browser, so your design tokens and viewport assumptions are never transmitted.",
    },
  ],
};

const uuidGenerator: ToolSeoContent = {
  slug: "uuid-generator",
  h2: "Why generate UUIDs (GUIDs)?",
  intro: [
    "Universally unique identifiers are the standard way to give objects a collision-resistant identity without a central service. A version 4 UUID is a 128-bit value with 122 bits of random data — enough randomness that the probability of two generated values colliding anywhere in the world is negligible for practical purposes. They appear everywhere: database primary keys, cache keys, transaction IDs, session tokens and client-generated IDs that the server later adopts.",
    "A UUID generator batch-creates one, ten or a thousand identifiers in a single click, using the browser's cryptographically secure random generator rather than a predictable pseudo-random seed. Each UUID follows the RFC 4122 formatting — 8-4-4-4-12, lowercase hexadecimal with hyphens — which is what the vast majority of APIs, ORMs and databases expect.",
    "Because generation happens locally, you can mint identifiers for architecture diagrams, seed scripts and documentation without an online dependency, and you control exactly how many you produce. Copy the whole batch to the clipboard with one tap and paste it straight into seed scripts or mock data generators.",
  ],
  useCases: [
    "Generate batch primary keys for database seed scripts and fixtures",
    "Create client-side IDs for optimistic UI updates that reconcile later",
    "Produce test identifiers for load-tested APIs and message queues",
    "Generate unique names for local project tokens and sample records",
  ],
  howToTitle: "How to generate UUIDs",
  howToSteps: [
    "Choose how many identifiers you need — single, or a batch up to 100.",
    "Toggle options such as uppercase output if your target system requires it.",
    "Press Generate or Ctrl / ⌘ + Enter to create the identifiers instantly.",
    "Scrutinise the output: every value is RFC 4122 v4 formed with a cryptographically secure source.",
    "Copy the full batch or individual values into your script, file or ticket.",
  ],
  testCases: [
    { input: "Generate 1", expected: "One value matching 8-4-4-4-12 lowercase hex, e.g. 3f17f1e2-9c4b-4d2a-9b0e-6d8c1f0a2b3c." },
    { input: "Generate 5, uppercase", expected: "5 unique identifiers with uppercase hex, all valid version-4 variant-1 formatting." },
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
  ],
};

const hashGenerator: ToolSeoContent = {
  slug: "hash-generator",
  h2: "Why generate hashes of your text?",
  intro: [
    "Cryptographic hashes are one-way functions that turn an arbitrary piece of text into a fixed-size digest: change a single character and the output changes beyond recognition. That makes hashes the backbone of checksums, integrity verification, password storage (with a salt), content-addressed storage and file deduplication. Knowing how to produce a SHA-256, SHA-512, SHA-1 or MD5 digest quickly is a daily need for anyone working with build pipelines, package registries and cloud storage.",
    "This hash generator computes hashes using the native SubtleCrypto API built into modern browsers, which means the digest is generated locally on your device rather than by submitting your text to an untrusted website. MD5 and SHA-1 are supported for legacy compatibility — verifying old checksums, database columns and vendor fixtures — while SHA-256 and SHA-512 are the strong, recommended defaults for new work.",
    "Because the computation never leaves the browser, you can safely hash passwords (for learning or testing — never unsalted in production), API keys, config fragments and any other sensitive string. Copy the digest to the clipboard or download all formats for your release notes and audits.",
  ],
  useCases: [
    "Verify the checksum of downloaded artifacts against published release hashes",
    "Compare digests of configuration or fixture files across environments",
    "Generate password hashes for test users and local development scaffolding",
    "Produce content-addressed keys for caches, stored objects and deduplication",
  ],
  howToTitle: "How to generate a hash",
  howToSteps: [
    "Type or paste the text you want to hash into the input field.",
    "Select the algorithm or let it show all of them: MD5, SHA-1, SHA-256 and SHA-512.",
    "Pick the output encoding — lowercase or uppercase hexadecimal.",
    "Press Hash or Ctrl / ⌘ + Enter to compute the digest instantly.",
    "Copy each digest with one click or download all results as a text file.",
  ],
  testCases: [
    { input: 'Hash of "hello" with SHA-256', expected: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824 (64 hex chars)." },
    { input: 'Hash of "hello" with MD5', expected: "5d41402abc4b2a76b9719d911017c592 (32 hex chars)." },
  ],
  faqs: [
    {
      q: "Which algorithm should I use?",
      a: "SHA-256 is the default choice for new systems. SHA-512 is stronger and preferred when available. MD5 and SHA-1 are provided for legacy checksum verification only and are not cryptographically secure for password storage.",
    },
    {
      q: "Can hashes be decoded back into the original text?",
      a: "No. Hashes are one-way functions. The only way to recover a value is to guess candidates and compare their digests, which is why salted, slow hashing (bcrypt, scrypt, Argon2) is required for storing passwords.",
    },
    {
      q: "Is my text sent to a server?",
      a: "No. Hashing uses the browser's native Web Crypto API locally. The input and the digest never leave your device.",
    },
  ],
};

const regexTester: ToolSeoContent = {
  slug: "regex-tester",
  h2: "Why test regular expressions?",
  intro: [
    "Regular expressions are the sharpest tool in a developer's kit and the easiest to get wrong. Quantifiers silently greedy, alternations that match the wrong branch, lookaheads with off-by-one boundaries — each of these turns a pattern that 'looks right' into a bug that corrupts data or fails to match a legitimate input. The only reliable way to build a regex is to test it against a representative sample of inputs, and to do that quickly.",
    "A regex tester gives you a live playground: type a pattern and a test string, and matching highlights appear in real time. Capturing groups — the pieces of a match stored for backreferences and extraction — are displayed individually, so you can see exactly which parts of the string each group captured and verify your group numbering before you write it into code.",
    "The tester runs entirely in your browser using the native JavaScript RegExp engine, the same engine your browser and Node.js applications use, so results you see here match what your production code will produce. Pattern flags like i (case-insensitive), g (global) and m (multiline) can be toggled to reproduce real conditions, and your pattern remains safe — never uploaded to any server.",
  ],
  useCases: [
    "Validate user-generated patterns for log parsing before shipping them to production code",
    "Debug capturing groups when extracting values from URLs, headers and markup",
    "Reproduce edge cases: empty matches, greedy versus lazy quantifiers, Unicode flags",
    "Design validation rules for forms, API input and text-processing pipelines",
    "Confirm existing patterns still match after schema or content changes",
  ],
  howToTitle: "How to test a regular expression",
  howToSteps: [
    "Type your pattern into the regex field, e.g. \\b(https?):\\/\\/[^\\s]+\\b.",
    "Enter a test string, or load one of the built-in samples to see the tool in action.",
    "Pick the flags you need — g for global, i for case-insensitive, m for multiline, etc.",
    "Watch the live highlight: matched segments are marked as you type.",
    "Read the capture group table below the string, then copy the tested pattern into your code.",
  ],
  testCases: [
    { input: 'Pattern (\\d{4})-\\d{2}-\\d{2} against "Release on 2026-09-14"', expected: "One match on 2026-09-14 with group 1 capturing 2026." },
    { input: "Pattern /a+/ against 'baaab', global flag", expected: "A single match 'aaa' highlighted (not three separate 'a' matches)." },
  ],
  faqs: [
    {
      q: "Is the regex tested with the same engine my code uses?",
      a: "Yes. Matching runs with the browser's native JavaScript RegExp engine, the same engine used by Node.js and most modern runtimes, so behaviour matches what you will see in production.",
    },
    {
      q: "How do I read the capture groups?",
      a: "Every opening parenthesis in your pattern (except non-capturing (?:) creates a group. The tool lists group 0 (the full match) and groups 1..n with the exact captured substrings, letting you verify numbering and matches at a glance.",
    },
    {
      q: "Is my pattern sent anywhere?",
      a: "No. The pattern and test string are processed locally — nothing is uploaded, logged or stored by the site.",
    },
  ],
};

export const toolSeoContent: Record<string, ToolSeoContent> = Object.fromEntries(
  [
    jsonFormatter,
    sqlFormatter,
    cronGenerator,
    jsonToTypescript,
    base64Encoder,
    pxToRem,
    uuidGenerator,
    hashGenerator,
    regexTester,
  ].map((content) => [content.slug, content]),
);

export function getToolSeo(slug: string): ToolSeoContent | undefined {
  return toolSeoContent[slug];
}