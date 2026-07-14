import { ContactUI, type SocialLink } from "@repo/ui/components/Contact/contactUI";
import { getDictionary } from "@/lib/i18n";

const socialLinks: SocialLink[] = [
  { iconSrc: "/images/InstagramLogo.png", alt: "Instagram", href: "https://instagram.com" },
  { iconSrc: "/images/TiktokLogo.png", alt: "TikTok", href: "https://tiktok.com" },
  { iconSrc: "/images/linkedin.png", alt: "LinkedIn", href: "https://linkedin.com" },
];

export function Contact({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  return (
    <ContactUI
      backgroundImageSrc="/images/contact.jpg"
      backgroundImageAlt={t.contact.backgroundImageAlt}
      getInTouchLabel={t.contact.getInTouchLabel}
      phoneShort="*2662"
      phoneFull="+994 50 277 2662"
      addressLabel={t.contact.addressLabel}
      addressTitle={t.contact.addressTitle}
      addressText={t.contact.addressText}
      followLabel={t.contact.followLabel}
      socialLinks={socialLinks}
      formTitle={t.contact.formTitle}
      submitLabel={t.contact.submitLabel}
    />
  );
}