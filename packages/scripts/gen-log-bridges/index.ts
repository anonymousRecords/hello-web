import path from "path";
import { getLogFolders } from "./discover";
import { readPrefer, readMeta } from "./read";
import { bundleJS } from "./bundle";
import { emitIndexTs, emitRegistry } from "./emit";
import type { Meta } from "./types";

const ROOT = process.cwd();
const LOGS_DIR = path.join(ROOT, "packages", "logs");
const REGISTRY_OUT = path.join(ROOT, "apps", "gallery", "app", "registry.ts");

async function main() {
  const folders = getLogFolders(LOGS_DIR);
  const list: Meta[] = [];

  for (const folder of folders) {
    const dir = path.join(LOGS_DIR, folder);

    const html = readPrefer(dir, "index.html");
    const css = readPrefer(dir, "style.css");
    const js = readPrefer(dir, "main.js");
    const md = readPrefer(dir, "notes.md");
    const metaRaw = readPrefer(dir, "meta.json");

    if (!html || !css) {
      console.warn(`⚠️  ${folder}: NO index.html/style.css → SKIP`);
      continue;
    }

    const meta = readMeta(metaRaw, folder);
    const bundled = await bundleJS(js, dir);
    emitIndexTs(dir, meta, html, css, bundled, md);
    list.push(meta);
  }

  emitRegistry(REGISTRY_OUT, list);
  console.log("🍩 registry generated:", REGISTRY_OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
