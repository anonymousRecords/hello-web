import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const LOGS_DIR = path.join(ROOT, "packages", "logs");
const REGISTRY_OUT = path.join(ROOT, "apps", "gallery", "app", "registry.ts");

type Meta = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  tags?: string[];
};

const folders = fs.existsSync(LOGS_DIR)
  ? fs
      .readdirSync(LOGS_DIR)
      .filter((d: string) => fs.statSync(path.join(LOGS_DIR, d)).isDirectory())
  : [];

const list: Meta[] = [];

// LOOP

for (const folder of folders) {
  const dir = path.join(LOGS_DIR, folder);

  const html = read(path.join(dir, "index.html"));
  const css = read(path.join(dir, "style.css"));
  const js = read(path.join(dir, "main.js"));
  const md = read(path.join(dir, "notes.md"));
  const metaRaw = read(path.join(dir, "meta.json"));

  if (!html || !css) {
    console.warn(`⚠️  ${folder}: NO index.html/style.css → SKIP`);
    continue;
  }

  let meta: Meta;
  try {
    meta = JSON.parse(metaRaw || "{}");
  } catch {
    meta = {} as any;
  }
  meta.id ||= folder;
  meta.date ||= "2025-01-01";
  meta.title ||= folder;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    console.warn(`⚠️  ${meta.id}: WRONG meta.date → replace to 2025-01-01`);
    meta.date = "2025-01-01";
  }

  list.push(meta);

  // index.ts
  const indexTsPath = path.join(dir, "index.ts");
  const code = `/** AUTO-GENERATED — do not edit */
export const meta = ${JSON.stringify(meta)};
export const md = ${JSON.stringify(md || "## Notes\\n(설명 없음)")};

const HTML = ${JSON.stringify(html)};
const CSS  = ${JSON.stringify(css)};
const JS   = ${JSON.stringify(js || "")};

export function mount(container: HTMLElement) {
  const root = container.shadowRoot ?? container.attachShadow({ mode: "open" });
  root.innerHTML = HTML;
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  root.prepend(styleEl);
  if (JS.trim()) {
    try {
      const docProxy = {
        querySelector: root.querySelector.bind(root),
        querySelectorAll: root.querySelectorAll.bind(root),
        getElementById: (id: string) => root.querySelector(\`#\${id}\`),
          addEventListener: root.addEventListener.bind(root),
          removeEventListener: root.removeEventListener.bind(root),

          get body() { return root as unknown as HTMLElement; },
          get head() { return root as unknown as HTMLElement; },

          _root: root
        };

        const run = new Function("document", JS);
        run(docProxy);

        root.dispatchEvent(new Event("DOMContentLoaded"));
      } catch (e) {
        console.error("Failed to run embedded JS for", meta.id, e);
      }
    }
    return () => { root.innerHTML = ""; };
  }
  `;
  fs.writeFileSync(indexTsPath, code, "utf8");
  console.log(`🍩 generated: ${path.relative(ROOT, indexTsPath)}`);
}

list.sort((a, b) => b.date.localeCompare(a.date));

const registry = `/** AUTO-GENERATED — do not edit */
export const entries = ${JSON.stringify(list, null, 2)} as const;

export async function load(id: string) {
  switch (id) {
${list
  .map(
    (m) =>
      `    case ${JSON.stringify(m.id)}: return await import("@repo/logs/${m.id}");`
  )
  .join("\n")}
    default: throw new Error("Unknown log id: " + id);
  }
}
`;
fs.mkdirSync(path.dirname(REGISTRY_OUT), { recursive: true });
fs.writeFileSync(REGISTRY_OUT, registry, "utf8");
console.log("🍩 registry:", path.relative(ROOT, REGISTRY_OUT));

function read(p: string) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}
