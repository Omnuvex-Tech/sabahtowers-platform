import { ExteriorUI } from "@repo/ui/components/Exterior/exteriorUI";
import { getDictionary } from "@/lib/i18n";
import { getCatalogueHref } from "@/lib/catalogue";

export function Exterior({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const catalogueHref = getCatalogueHref(locale);

  const slides = t.exterior.slides.map((title: string) => ({
    imageSrc: "/images/exterior.jpg",
    imageAlt: t.exterior.imageAlt,
    title,
  }));

  return (
    <ExteriorUI
      eyebrow={t.exterior.eyebrow}
      slides={slides}
      primaryCta={{ label: t.exterior.primaryCtaLabel, href: catalogueHref, download: true }}
      secondaryCta={{ label: t.exterior.secondaryCtaLabel, href: "#contact" }}
    />
  );
}