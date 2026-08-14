'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FooterUI, type FooterLocale, type FooterLink, type FooterSocialLink } from "@repo/ui/components/Footer/footerUI";
import { getDictionary } from "@/lib/i18n";

const locales: FooterLocale[] = [
  { code: 'az', label: 'AZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

const socialLinks: FooterSocialLink[] = [
  { iconSrc: '/images/whiteig.svg', alt: 'Instagram', href: 'https://www.instagram.com/sabahtowers.az?igsh=MTNzYTZreXNmZHA4Mg%3D%3D&utm_source=qr' },
  { iconSrc: '/images/whitett.svg', alt: 'TikTok', href: 'https://www.tiktok.com/@sabahtowers?_r=1&_t=ZS-98GqECiYeFU' },
  { iconSrc: '/images/facebook.svg', alt: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591201147020' },
];

export function Footer({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (code: string) => {
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/'));
  };

  const exploreLinks: FooterLink[] = [
    { label: t.footer.exploreLinks.about, href: '#about' },
    { label: t.footer.exploreLinks.brokers, href: '#brokers' },
    { label: t.footer.exploreLinks.units, href: '#units' },
    { label: t.footer.exploreLinks.contact, href: '#contact' },
  ];

  const privacyPolicyLink: FooterLink = {
    label: t.footer.exploreLinks.privacyPolicy,
    href: `/${locale}/privacypolicy`,
  };

  return (
    <FooterUI
      locales={locales}
      activeLocale={locale}
      onLocaleChange={handleLocaleChange}
      addressText={t.footer.addressText}
      exploreTitle={t.footer.exploreTitle}
      exploreLinks={exploreLinks}
      privacyPolicyLink={privacyPolicyLink}
      getInTouchTitle={t.footer.getInTouchTitle}
      phoneShort="*2662"
      phoneFull="+994 50 277 2662"
      followTitle={t.footer.followTitle}
      socialLinks={socialLinks}
      wordmarkSrc="/images/footer-logo.svg"
      wordmarkAlt="Sabah Towers"
      copyrightText={t.footer.copyrightText}
    />
  );
}