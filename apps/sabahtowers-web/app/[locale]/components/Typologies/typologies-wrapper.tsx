import { TypologiesUI, type TypologyCard, type TitleSegment } from "@repo/ui/components/Typologies/typologiesUI";
import { getDictionary } from "@/lib/i18n";

const imageSrcs: string[] = [
  "/images/residental1.jpg",
  "/images/residental2.jpg",
  "/images/residental3.jpg",
];

export function Typologies({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const titleSegments: TitleSegment[] = t.typologies.titleSegments;

  const cards: TypologyCard[] = t.typologies.cards.map(
    (
      card: { imageAlt: string; badge: string; description: string; features: string[] },
      i: number
    ) => ({
      imageSrc: imageSrcs[i] ?? "",
      imageAlt: card.imageAlt,
      badge: card.badge,
      description: card.description,
      features: card.features,
    })
  );

  return (
    <TypologiesUI
      eyebrow={t.typologies.eyebrow}
      titleSegments={titleSegments}
      cards={cards}
      starIconSrc="/images/Light.svg"
    />
  );
}