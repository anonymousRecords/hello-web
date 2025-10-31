import fs from "fs";
import path from "path";
import { Meta } from "./types";

export function emitIndexTs(
  dir: string,
  meta: Meta,
  html: string,
  css: string,
  js: string,
  md: string
) {
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
      const documentProxy = {
        querySelector: root.querySelector.bind(root),
        querySelectorAll: root.querySelectorAll.bind(root),
        getElementById: (id) => root.querySelector(\`#\${id}\`),
        addEventListener: root.addEventListener.bind(root),
        removeEventListener: root.removeEventListener.bind(root),
        get body() { return root; },
        get head() { return root; },
      };
      const run = new Function("document", JS);
      run(documentProxy);
      root.dispatchEvent(new Event("DOMContentLoaded"));
    } catch (e) {
      console.error("Failed to run embedded JS for", meta.id, e);
    }
  }
  return () => { root.innerHTML = ""; };
}
`;
  fs.writeFileSync(path.join(dir, "index.ts"), code, "utf8");
}

export function emitRegistry(outPath: string, list: Meta[]) {
  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
  const registry = `/** AUTO-GENERATED — do not edit */
export const entries = ${JSON.stringify(sorted, null, 2)} as const;
export async function load(id: string) {
  switch (id) {
${sorted
  .map(
    (m) =>
      `    case ${JSON.stringify(m.id)}: return await import("@repo/logs/${m.id}");`
  )
  .join("\n")}
    default: throw new Error("Unknown log id: " + id);
  }
}`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, registry, "utf8");
}
