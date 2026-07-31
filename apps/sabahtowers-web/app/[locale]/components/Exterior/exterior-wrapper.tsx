import { ExteriorUI } from "@repo/ui/components/Exterior/exteriorUI";
import { getDictionary } from "@/lib/i18n";

const exteriorImages = [
  "/images/exterior.jpg",
  "/images/interior.jpg",
  "/images/residental1.webp",
  "/images/residental2.webp",
  "/images/residental3.webp",
];

export function Exterior({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const slides = t.exterior.slides.map((title: string, i: number) => ({
    imageSrc: exteriorImages[i % exteriorImages.length] ?? exteriorImages[0]!,
    imageAlt: t.exterior.imageAlt,
    title,
  }));

  const galleryImages = exteriorImages.map((imageSrc) => ({
    imageSrc,
    imageAlt: t.exterior.imageAlt,
  }));

  return (
    <ExteriorUI
      eyebrow={t.exterior.eyebrow}
      slides={slides}
      galleryImages={galleryImages}
      primaryCta={{ label: t.exterior.primaryCtaLabel }}
      secondaryCta={{ label: t.exterior.secondaryCtaLabel, href: "#contact" }}
    />
  );
}