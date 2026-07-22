import { MapLocationUI } from "@repo/ui/components/MapLocation/mapLocationUI";

export function MapLocation() {
  return (
    <MapLocationUI
      mapImageSrc="/images/map.jpg"
      mapImageAlt="Sabah Towers location map"
      badgeIconSrc="/images/map-logo.png"
      badgeIconAlt="Sabah Towers"
      pinIconSrc="/images/map-pin.png"
      viewOnMapLabel="View on map"
      viewOnMapHref="https://maps.app.goo.gl/KGpTQEfnr6VC1q597?g_st=ic"
    />
  );
}