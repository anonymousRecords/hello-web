import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

const ROOT = path.resolve(__dirname, "../..");
const APPS_DIR = path.join(ROOT, "apps");
const GALLERY_DIR = path.join(APPS_DIR, "gallery");
const OUTPUT_DIR = path.join(GALLERY_DIR, "public/interactions");

function isViteApp(appDir: string): boolean {
  const hasIndexHtml = fs.existsSync(path.join(appDir, "index.html"));
  const hasPackageJson = fs.existsSync(path.join(appDir, "package.json"));
  return hasIndexHtml && hasPackageJson;
}

function discoverViteApps(): string[] {
  const apps: string[] = [];
  const dirs = fs.readdirSync(APPS_DIR);

  for (const dir of dirs) {
    const appDir = path.join(APPS_DIR, dir);

    if (!fs.statSync(appDir).isDirectory()) continue;
    if (dir === "gallery") continue;
    if (!isViteApp(appDir)) continue;

    apps.push(dir);
  }

  return apps.sort();
}

function buildApp(appName: string): void {
  const appDir = path.join(APPS_DIR, appName);
  const outputPath = path.join(OUTPUT_DIR, appName);

  console.log(`\nBuilding ${appName}...`);

  // Clean previous build
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true });
  }

  // Build with BUILD_FOR_GALLERY env var
  execSync("pnpm vite build --outDir " + outputPath, {
    cwd: appDir,
    env: { ...process.env, BUILD_FOR_GALLERY: "true" },
    stdio: "inherit",
  });

  console.log(`Built ${appName} -> ${outputPath}`);
}

function main() {
  console.log("Discovering Vite apps...");
  const apps = discoverViteApps();
  console.log(`Found ${apps.length} apps: ${apps.join(", ")}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Build each app
  let success = 0;
  let failed = 0;

  for (const app of apps) {
    try {
      buildApp(app);
      success++;
    } catch (error) {
      console.error(`Failed to build ${app}:`, error);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Build complete: ${success} succeeded, ${failed} failed`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main();
