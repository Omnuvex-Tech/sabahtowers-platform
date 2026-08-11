import { MapLocationUI } from "@repo/ui/components/MapLocation/mapLocationUI";
import { getDictionary } from "@/lib/i18n";

export function MapLocation({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <MapLocationUI
      mapImageSrc="/images/old-map.jpg"
      mapImageAlt={t.mapLocation.mapImageAlt}
      viewOnMapLabel={t.mapLocation.viewOnMapLabel}
      viewOnMapHref="https://maps.app.goo.gl/4T9Ja645pfEto97j7"
    />
  );
}