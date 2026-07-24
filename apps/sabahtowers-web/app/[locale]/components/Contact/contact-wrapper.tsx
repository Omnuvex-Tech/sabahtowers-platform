import { ContactUI, type SocialLink } from "@repo/ui/components/Contact/contactUI";
import { getDictionary } from "@/lib/i18n";

const socialLinks: SocialLink[] = [
  { iconSrc: "/images/InstagramLogo.svg", alt: "Instagram", href: "https://www.instagram.com/sabahtowers.az?igsh=MTNzYTZreXNmZHA4Mg%3D%3D&utm_source=qr" },
  { iconSrc: "/images/TiktokLogo.svg", alt: "TikTok", href: "https://www.tiktok.com/@sabahtowers?_r=1&_t=ZS-98GqECiYeFU" },
  { iconSrc: "/images/facebookblue.svg", alt: "Facebook", href: "https://www.facebook.com/profile.php?id=61591201147020" },
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
      phoneMinError={t.contact.phoneMinError}
      requiredError={t.contact.requiredError}
    />
  );
}