import { InteriorUI } from "@repo/ui/components/Interior/interiorUI";
import { getDictionary } from "@/lib/i18n";

export function Interior({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const slides = t.interior.slides.map((title: string) => ({
    imageSrc: "/images/interior.jpg",
    imageAlt: t.interior.imageAlt,
    title,
  }));

  return (
    <InteriorUI
      eyebrow={t.interior.eyebrow}
      slides={slides}
      primaryCta={{ label: t.interior.primaryCtaLabel, href: "#catalog" }}
      secondaryCta={{ label: t.interior.secondaryCtaLabel, href: "#contact" }}
    />
  );
}