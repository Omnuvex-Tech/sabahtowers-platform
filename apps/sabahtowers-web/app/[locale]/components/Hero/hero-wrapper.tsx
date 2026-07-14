import { HeroUI } from "@repo/ui/components/Hero/heroUI";
import { getDictionary } from "@/lib/i18n";

export function Hero({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <HeroUI
      eyebrow={t.hero.eyebrow}
      titleBefore={t.hero.titleBefore}
      titleItalic={t.hero.titleItalic}
      titleAfter={t.hero.titleAfter}
      imageSrc="/images/img-hero.png"
      imageAlt={t.hero.imageAlt}
      primaryCta={{ label: t.hero.primaryCtaLabel, href: "#catalog" }}
      secondaryCta={{ label: t.hero.secondaryCtaLabel, href: "#contact" }}
    />
  );
}