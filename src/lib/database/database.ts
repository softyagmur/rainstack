import { logWarn } from "../../helpers/logger";
import i18n from "../i18nManager";
import path from "path";
import fs from "fs";

type ApproveMessage =
  | "Projenizdeki verilerden tamamen siz sorumlusunuz. Bu veriler silinecektir. Onaylıyor musunuz? (onaylıyorum)"
  | "You are fully responsible for the data in your project. This data will be deleted. Do you confirm? (I confirm)";

export class Database {
  constructor() {}

  set(key: string, value: any): void {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbfile)) {
      fs.writeFileSync(dbfile, JSON.stringify({}, null, 2), "utf-8");
    }

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));

    const keys = key.split(".");
    let current = dbContent;

    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part];
    }

    current[keys[keys.length - 1]] = value;

    fs.writeFileSync(dbfile, JSON.stringify(dbContent, null, 2), "utf-8");
  }

  get(key: string): any {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dbfile)) {
      return null;
    }

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));

    const keys = key.split(".");
    let current = dbContent;

    for (const part of keys) {
      if (current[part] === undefined) {
        return null;
      }
      current = current[part];
    }

    return current;
  }

  getAll(): Record<string, any> {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dbfile)) {
      return {};
    }

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));
    return dbContent;
  }

  has(key: string): boolean {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dbfile)) {
      return false;
    }

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));

    const keys = key.split(".");
    let current = dbContent;

    for (const part of keys) {
      if (current[part] === undefined) {
        return false;
      }
      current = current[part];
    }

    return true;
  }

  delete(key: string): void {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dbfile)) return;
    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));
    const keys = key.split(".");
    let current = dbContent;
    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];
      if (!current[part] || typeof current[part] !== "object") {
        return;
      }
      current = current[part];
    }
    const lastKey = keys[keys.length - 1];
    if (current[lastKey] !== undefined) {
      delete current[lastKey];
      fs.writeFileSync(dbfile, JSON.stringify(dbContent, null, 2), "utf-8");
    }
  }

  deleteAll(message: ApproveMessage): void {
    if (!message) {
      logWarn(i18n.t("logger.warn.entered"));
      return;
    }
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (fs.existsSync(dbfile)) {
      fs.writeFileSync(dbfile, JSON.stringify({}, null, 2), "utf-8");
    } else {
      fs.writeFileSync(dbfile, JSON.stringify({}, null, 2), "utf-8");
    }
  }

  push(key: string, value: any): void {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbfile)) {
      fs.writeFileSync(dbfile, JSON.stringify({}, null, 2), "utf-8");
    }

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));

    const keys = key.split(".");
    let current = dbContent;

    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part];
    }

    const lastKey = keys[keys.length - 1];

    if (!Array.isArray(current[lastKey])) {
      current[lastKey] = [];
    }

    current[lastKey].push(value);

    fs.writeFileSync(dbfile, JSON.stringify(dbContent, null, 2), "utf-8");
  }

  unpush(key: string, value?: any): void {
    const dir = path.join(process.cwd(), "rainstack");
    const dbfile = path.join(dir, "database.json");

    if (!fs.existsSync(dbfile)) return;

    const dbContent = JSON.parse(fs.readFileSync(dbfile, "utf-8"));
    const keys = key.split(".");
    let current = dbContent;

    for (let i = 0; i < keys.length - 1; i++) {
      const part = keys[i];
      if (!current[part] || typeof current[part] !== "object") {
        return;
      }
      current = current[part];
    }

    const lastKey = keys[keys.length - 1];

    if (Array.isArray(current[lastKey])) {
      if (value === undefined) {
        delete current[lastKey];
      } else {
        current[lastKey] = current[lastKey].filter(
          (item: any) => item !== value
        );
      }

      fs.writeFileSync(dbfile, JSON.stringify(dbContent, null, 2), "utf-8");
    }
  }
}
