import { AmenitiesUI, type AmenityItem } from "@repo/ui/components/Amenities/amenitiesUI";
import { getDictionary } from "@/lib/i18n";

const iconSrcs: string[] = [
  "/images/arcticons_tennis.png",
  "/images/Vector.png",
  "/images/SwimmingPool.png",
  "/images/kids-club.png",
  "/images/cafe.png",
  "/images/run.png",
];

export function Amenities({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const items: AmenityItem[] = t.amenities.items.map(
    (item: { iconAlt: string; title: string; description: string }, i: number) => ({
      iconSrc: iconSrcs[i] ?? "",
      iconAlt: item.iconAlt,
      title: item.title,
      description: item.description,
    })
  );

  return (
    <AmenitiesUI
      eyebrow={t.amenities.eyebrow}
      title={t.amenities.title}
      items={items}
    />
  );
}