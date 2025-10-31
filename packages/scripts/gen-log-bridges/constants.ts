import type { Loader } from "esbuild";

export const DEFAULT_DATE = "2025-01-01";

export const CSS_IMPORT_RE = /import\s+["'][^"']+\.(css|scss|sass)["'];?/g;
export const ASSET_IMPORT_RE =
  /import\s+[^'"]+['"][^'"]+\.(png|jpe?g|gif|webp|ico|bmp|avif|mp4|webm|mp3|wav|ogg|woff2?|ttf|eot)["'];?/g;

export const ESBUILD_LOADERS: Record<string, Loader> = {
  ".svg": "text",
  ".css": "text",
  ".png": "dataurl",
  ".jpg": "dataurl",
  ".jpeg": "dataurl",
  ".gif": "dataurl",
  ".webp": "dataurl",
  ".ico": "dataurl",
  ".bmp": "dataurl",
  ".avif": "dataurl",
  ".mp4": "dataurl",
  ".webm": "dataurl",
  ".mp3": "dataurl",
  ".wav": "dataurl",
  ".ogg": "dataurl",
  ".woff": "dataurl",
  ".woff2": "dataurl",
  ".ttf": "dataurl",
  ".eot": "dataurl",
};
