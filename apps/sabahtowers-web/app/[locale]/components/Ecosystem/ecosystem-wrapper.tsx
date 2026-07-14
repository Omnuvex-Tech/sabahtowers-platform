import { EcosystemUI } from "@repo/ui/components/Ecosystem/ecosystemUI";
import { getDictionary } from "@/lib/i18n";

export function Ecosystem({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <EcosystemUI
      title={t.ecosystem.title}
      description={t.ecosystem.description}
      leftImageSrc="/images/img-hero2.jpg"
      leftImageAlt={t.ecosystem.imageAlt}
      rightImageSrc="/images/img-hero2.jpg"
      rightImageAlt={t.ecosystem.imageAlt}
      iconSrc="/images/StarFour.png"
      primaryCta={{ label: t.ecosystem.primaryCtaLabel, href: "#catalog" }}
      secondaryCta={{ label: t.ecosystem.secondaryCtaLabel, href: "#contact" }}
    />
  );
}