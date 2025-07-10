import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

type tr = "tr";
type en = "en";

/**
 * Writes a language file for Rainstack.
 * @param lang - The language code to write (e.g., "en" or "tr").
 */
export function writeLang(lang: en | tr): void {
  const dir = join(process.cwd(), "rainstack");
  const file = join(dir, "lang.json");

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(file, JSON.stringify({ lang }, null, 2), "utf8");
}
