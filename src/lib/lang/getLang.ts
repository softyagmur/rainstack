import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { logError } from "../../helpers/logger";

type Lang = "en" | "tr";

/**
 * Reads the language file for Rainstack and returns the language code.
 * If the file does not exist or contains an invalid language code, defaults to "en".
 * @returns {Lang} The language code ("en" or "tr").
 */
export function getLang(): Lang {
  const file = join(process.cwd(), "rainstack", "lang.json");

  if (!existsSync(file)) {
    return "en";
  }

  try {
    const data = readFileSync(file, "utf8");
    if (!data) {
      logError("lang.json file is empty or not readable.");
      return "en";
    }
    const parsed = JSON.parse(data);
    if (!parsed || !parsed.lang) {
      logError("Invalid lang.json format: Missing 'lang' property.");
      return "en";
    }

    if (parsed.lang === "tr" || parsed.lang === "en") {
      return parsed.lang;
    } else {
      return "en";
    }
  } catch (error) {
    logError("Error reading or parsing lang.json file:");
    return "en";
  }
}
