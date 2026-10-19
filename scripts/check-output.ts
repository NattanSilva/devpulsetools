import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = "out";
const files: string[] = [];

function walk(dir: string) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) files.push(full);
  }
}
walk(root);

const pageRoutes = new Set(
  files.map((file) => {
    const rel = relative(root, file).replace(/\\/g, "/");
    const withoutExtension = rel.replace(/\.html$/, "");
    const route = withoutExtension.replace(/(^|\/)index$/, "");
    return route === "" ? "/" : `/${route}`;
  }),
);

const assets = new Set(
  readdirSync(root).filter((entry) => statSync(join(root, entry)).isFile()),
);

const problems: string[] = [];
let linkCount = 0;

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const route = "/" + relative(root, file).replace(/\\/g, "/").replace(/\.html$/, "");

  // Mojibake / replacement characters
  if (html.includes("\uFFFD")) problems.push(`${route}: contains U+FFFD replacement characters`);

  // "Site em construcao" leftovers
  for (const needle of ["Coming soon", ">Soon<", "em constru", "Em breve", "Coming Soon"]) {
    if (html.includes(needle)) problems.push(`${route}: leftover placeholder text "${needle}"`);
  }

  // Internal links
  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    linkCount += 1;
    const target = match[1].replace(/\/$/, "") || "/";
    if (
      !target.startsWith("/_next") &&
      !target.startsWith("/ads.txt") &&
      !pageRoutes.has(target) &&
      !assets.has(target.replace(/^\//, ""))
    ) {
      problems.push(`${route}: broken internal link -> ${target}`);
    }
  }
}

console.log(`Checked ${files.length} HTML files, ${linkCount} internal links.`);
if (problems.length === 0) {
  console.log("No problems found.");
} else {
  console.log(`\n${problems.length} problem(s):`);
  for (const problem of [...new Set(problems)]) console.log(`  - ${problem}`);
  process.exitCode = 1;
}
