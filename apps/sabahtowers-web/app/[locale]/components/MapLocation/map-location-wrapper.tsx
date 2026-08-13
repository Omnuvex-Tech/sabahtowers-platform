import { MapLocationUI } from "@repo/ui/components/MapLocation/mapLocationUI";
import { getDictionary } from "@/lib/i18n";

export function MapLocation({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <MapLocationUI
      mapImageSrc="/images/old-map.jpg"
      mapImageAlt={t.mapLocation.mapImageAlt}
      viewOnMapLabel={t.mapLocation.viewOnMapLabel}
      viewOnMapHref="https://www.google.com/maps/place/Sabah+Towers+Sea+Breeze/@40.5808125,49.9271875,17z/data=!4m2!3m1!1s0x4030f37b01907189:0xeab873444182bd84"
    />
  );
}