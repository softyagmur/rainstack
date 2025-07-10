import { getLang } from "./lang/getLang";
import { I18n } from "./i18n";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

const i18n = new I18n({
  locales: { tr, en },
  defaultLocale: getLang(),
  fallbackLocale: "en",
});

export default i18n;
