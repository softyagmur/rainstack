import en from "../locales/en.json" with { type: "json" };
import tr from "../locales/tr.json" with { type: "json" };
import { I18n } from "./i18n";
import { getLang } from "./lang/getLang";

const i18n = new I18n({
  locales: { tr, en },
  defaultLocale: getLang(),
  fallbackLocale: "en",
});

export default i18n;
