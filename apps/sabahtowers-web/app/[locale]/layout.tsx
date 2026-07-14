import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NotifyProvider, NotifyContainer } from "@repo/ui";
import { QueryProvider } from "./providers";
import { Header } from "./components/Header/header-wrapper";
import { isValidLocale, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return (
        <QueryProvider>
            <NotifyProvider>
                <Header locale={locale} />
                <main>{children}</main>
                <NotifyContainer />
            </NotifyProvider>
        </QueryProvider>
    );
}