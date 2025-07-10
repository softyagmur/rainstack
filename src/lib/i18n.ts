import { LocaleStrings } from "../types/locales";

export type LanguageCode = "tr" | "en";

interface I18nOptions {
  locales: Record<LanguageCode, LocaleStrings>;
  defaultLocale: LanguageCode;
  fallbackLocale?: LanguageCode;
}

export class I18n {
  private locales: Record<LanguageCode, LocaleStrings>;
  private currentLang: LanguageCode;
  private fallbackLang?: LanguageCode;

  constructor(options: I18nOptions) {
    this.locales = options.locales;
    this.currentLang = options.defaultLocale;
    this.fallbackLang = options.fallbackLocale;
  }

  t(key: string, lang?: LanguageCode): string {
    const selectedLang = lang || this.currentLang;
    const current = this.locales[selectedLang];
    const fallback = this.fallbackLang
      ? this.locales[this.fallbackLang]
      : undefined;

    const result =
      this.resolveKey(current, key) ?? this.resolveKey(fallback, key);

    return typeof result === "string" ? result : key;
  }

  private resolveKey(obj: LocaleStrings | undefined, key: string): unknown {
    if (!obj) return undefined;

    return key.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }

  setLanguage(lang: LanguageCode) {
    if (this.locales[lang]) {
      this.currentLang = lang;
    }
  }

  getLanguage(): LanguageCode {
    return this.currentLang;
  }
}
