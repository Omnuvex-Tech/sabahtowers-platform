import { normalizer } from "@repo/shared/utils";
import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

export type Locale = "az" | "en" | "ru";

const SEO_BY_LOCALE: Record<Locale, { projectName: string; projectDescription: string; keywords: string[] }> = {
  az: az.seo,
  en: en.seo,
  ru: ru.seo,
};

export const project = {
  url: normalizer.string(process.env.NEXT_PUBLIC_APP_URL),
  name: normalizer.string(process.env.NEXT_PUBLIC_APP_NAME),
  defLang: "az" as Locale,
};

export function getSeo(locale: string) {
  const lang = (locale as Locale) in SEO_BY_LOCALE ? (locale as Locale) : project.defLang;
  return SEO_BY_LOCALE[lang];
}