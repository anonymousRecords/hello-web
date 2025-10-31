import * as esbuild from "esbuild";
import { ESBUILD_LOADERS, CSS_IMPORT_RE, ASSET_IMPORT_RE } from "./constants";

function sanitize(code: string): string {
  return code
    .replace(CSS_IMPORT_RE, "")
    .replace(ASSET_IMPORT_RE, "")
    .replace(/\?raw\b/g, "")
    .replace(/\?url\b/g, "")
    .replace(
      /new\s+URL\(\s*(['"][^'"]+\.(png|jpe?g|gif|webp|ico|svg)['"])\s*,\s*import\.meta\.url\s*\)\.href/g,
      "$1"
    );
}

export async function bundleJS(code: string, resolveDir: string) {
  if (!code.trim()) return "";
  try {
    const out = await esbuild.build({
      stdin: { contents: sanitize(code), resolveDir, sourcefile: "main.js" },
      bundle: true,
      format: "iife",
      platform: "browser",
      write: false,
      loader: ESBUILD_LOADERS,
    });
    return out.outputFiles?.[0]?.text ?? code;
  } catch (e) {
    console.error("esbuild bundle failed for", resolveDir, e);
    return code;
  }
}
