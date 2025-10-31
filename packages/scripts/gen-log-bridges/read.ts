import fs from "fs";
import path from "path";
import { Meta } from "./types";
import { DEFAULT_DATE } from "./constants";

export function read(p: string): string {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

export function readPrefer(dir: string, name: string) {
  const pRoot = path.join(dir, name);
  const pSrc = path.join(dir, "src", name);
  return read(pRoot) || read(pSrc);
}

export function readMeta(metaRaw: string, id: string): Meta {
  let meta: Meta;
  try {
    meta = JSON.parse(metaRaw || "{}");
  } catch {
    meta = {} as any;
  }

  meta.id ||= id;
  meta.date ||= DEFAULT_DATE;
  meta.title ||= id;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    console.warn(
      `⚠️  ${meta.id}: WRONG meta.date → replace to ${DEFAULT_DATE}`
    );
    meta.date = DEFAULT_DATE;
  }
  return meta;
}
