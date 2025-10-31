import fs from "fs";
import path from "path";

export function getLogFolders(rootDir: string): string[] {
  if (!fs.existsSync(rootDir)) return [];
  return fs
    .readdirSync(rootDir)
    .filter((d) => fs.statSync(path.join(rootDir, d)).isDirectory());
}
