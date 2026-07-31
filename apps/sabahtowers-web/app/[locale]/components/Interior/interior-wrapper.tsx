import { InteriorUI } from "@repo/ui/components/Interior/interiorUI";
import { getDictionary } from "@/lib/i18n";

const interiorImages = [
  "/images/interior4.png",
  "/images/interior1.png",
  "/images/interior2.png",
  "/images/interior3.png",
  "/images/interior5.png",
];

export function Interior({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const slides = t.interior.slides.map((title: string, i: number) => ({
    imageSrc: interiorImages[i % interiorImages.length] ?? interiorImages[0]!,
    imageAlt: t.interior.imageAlt,
    title,
  }));

  const galleryImages = interiorImages.map((imageSrc) => ({
    imageSrc,
    imageAlt: t.interior.imageAlt,
  }));

  return (
    <InteriorUI
      eyebrow={t.interior.eyebrow}
      slides={slides}
      galleryImages={galleryImages}
      primaryCta={{ label: t.interior.primaryCtaLabel }}
      secondaryCta={{ label: t.interior.secondaryCtaLabel, href: "#contact" }}
    />
  );
}