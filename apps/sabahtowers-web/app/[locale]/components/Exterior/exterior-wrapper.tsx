import { ExteriorUI } from "@repo/ui/components/Exterior/exteriorUI";
import { getDictionary } from "@/lib/i18n";

export function Exterior({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const slides = t.exterior.slides.map((title: string) => ({
    imageSrc: "/images/exterior.jpg",
    imageAlt: t.exterior.imageAlt,
    title,
  }));

  return (
    <ExteriorUI
      eyebrow={t.exterior.eyebrow}
      slides={slides}
      primaryCta={{ label: t.exterior.primaryCtaLabel, href: "#catalog" }}
      secondaryCta={{ label: t.exterior.secondaryCtaLabel, href: "#contact" }}
    />
  );
}