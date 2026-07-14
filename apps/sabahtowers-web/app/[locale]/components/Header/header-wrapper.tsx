import { HeaderUI } from "@repo/ui/components/Header/headerUI";
import { LanguageSwitcher } from "@/app/[locale]/components/LanguageSwitcher/language-switcher";
import { getDictionary } from "@/lib/i18n";

export function Header({ locale }: { locale: string }) {
  const t = getDictionary(locale);

  const navLinks = [
    { label: t.header.navLinks.about, href: "#about" },
    { label: t.header.navLinks.brokers, href: "#brokers" },
    { label: t.header.navLinks.units, href: "#units" },
    { label: t.header.navLinks.contact, href: "#contact" },
  ];

  return (
    <HeaderUI
      navLinks={navLinks}
      phoneNumber="*2662"
      phoneHref="tel:*2662"
      languageSwitcher={<LanguageSwitcher locale={locale} />}
    />
  );
}