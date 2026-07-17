import { HeroUI } from "@repo/ui/components/Hero/heroUI";
import { getDictionary } from "@/lib/i18n";
import { getCatalogueHref } from "@/lib/catalogue";

export function Hero({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const catalogueHref = getCatalogueHref(locale);

  return (
    <HeroUI
      eyebrow={t.hero.eyebrow}
      titleBefore={t.hero.titleBefore}
      titleItalic={t.hero.titleItalic}
      titleAfter={t.hero.titleAfter}
      imageSrc="/images/img-hero.png"
      imageAlt={t.hero.imageAlt}
      primaryCta={{ label: t.hero.primaryCtaLabel, href: catalogueHref, download: true }}
      secondaryCta={{ label: t.hero.secondaryCtaLabel, href: "#contact" }}
    />
  );
}