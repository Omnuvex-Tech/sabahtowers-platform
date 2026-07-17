import { EcosystemUI } from "@repo/ui/components/Ecosystem/ecosystemUI";
import { getDictionary } from "@/lib/i18n";
import { getCatalogueHref } from "@/lib/catalogue";

export function Ecosystem({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const catalogueHref = getCatalogueHref(locale);

  return (
    <EcosystemUI
      title={t.ecosystem.title}
      description={t.ecosystem.description}
      leftImageSrc="/images/img-hero2.jpg"
      leftImageAlt={t.ecosystem.imageAlt}
      rightImageSrc="/images/img-hero2.jpg"
      rightImageAlt={t.ecosystem.imageAlt}
      iconSrc="/images/StarFour.png"
      primaryCta={{ label: t.ecosystem.primaryCtaLabel, href: catalogueHref, download: true }}
      secondaryCta={{ label: t.ecosystem.secondaryCtaLabel, href: "#contact" }}
    />
  );
}