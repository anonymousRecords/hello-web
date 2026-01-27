import * as fs from "fs";
import * as path from "path";

interface Meta {
  id?: string;
  title?: string;
}

interface AppEntry {
  id: string;
  title: string;
  port: number;
}

// Port mapping for each app
const PORT_MAP: Record<string, number> = {
  "button-press": 4001,
  "tooltip-delays": 4002,
  "toast-enter": 4003,
  "curtain-reveal-menu": 4004,
  "fancy-gradient-hover-link": 4005,
  "fancy-nav": 4006,
  "full-screen-carousel": 4007,
  "hover-card-effect": 4008,
  "hover-effect": 4009,
  "hover-glide-image-gallery": 4010,
  "intelligent-mouse-trailer": 4011,
  "living-shapes": 4012,
  "mouse-move-image-gallery": 4013,
  "sparckling-text": 4014,
  "staggered-grid-effect": 4015,
  "website-header": 4016,
  "tactile-fader": 4017,
  "traffic-light": 4018,
  "opening-box": 4019,
};

const ROOT = path.resolve(__dirname, "../../..");
const APPS_DIR = path.join(ROOT, "apps");
const GALLERY_DIR = path.join(APPS_DIR, "gallery");
const OUTPUT_FILE = path.join(GALLERY_DIR, "app/registry.ts");

function isViteApp(appDir: string): boolean {
  const hasIndexHtml = fs.existsSync(path.join(appDir, "index.html"));
  const hasPackageJson = fs.existsSync(path.join(appDir, "package.json"));
  return hasIndexHtml && hasPackageJson;
}

function readMeta(appDir: string): Meta | null {
  const metaPath = path.join(appDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
      return null;
    }
  }
  return null;
}

function formatTitle(id: string): string {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function discoverApps(): AppEntry[] {
  const entries: AppEntry[] = [];

  const dirs = fs.readdirSync(APPS_DIR);

  for (const dir of dirs) {
    const appDir = path.join(APPS_DIR, dir);

    if (!fs.statSync(appDir).isDirectory()) continue;

    if (dir === "gallery") continue;

    if (!isViteApp(appDir)) continue;

    const meta = readMeta(appDir);
    const port = PORT_MAP[dir] || 4000 + entries.length + 1;

    entries.push({
      id: meta?.id || dir,
      title: meta?.title || formatTitle(dir),
      port,
    });
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  return entries;
}

function generateRegistry(entries: AppEntry[]): string {
  const portMapEntries = entries
    .map((e) => `  "${e.id}": ${e.port}`)
    .join(",\n");

  const interactionEntries = entries
    .map((e) => `  ${JSON.stringify({ id: e.id, title: e.title })}`)
    .join(",\n");

  return `/** AUTO-GENERATED — do not edit */

export interface InteractionEntry {
  id: string;
  title: string;
}

const portMap: Record<string, number> = {
${portMapEntries}
};

export const interactions: InteractionEntry[] = [
${interactionEntries}
];

export function getUrl(id: string, isDev: boolean): string {
  const port = portMap[id];
  if (isDev && port) {
    return \`http://localhost:\${port}\`;
  }
  return \`/interactions/\${id}/\`;
}
`;
}

function main() {
  console.log("Discovering apps...");
  const entries = discoverApps();
  console.log(`Found ${entries.length} apps:`);
  entries.forEach((e) => console.log(`  - ${e.id} (port ${e.port})`));

  const registry = generateRegistry(entries);

  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, registry);
  console.log(`\nGenerated: ${OUTPUT_FILE}`);
}

main();
