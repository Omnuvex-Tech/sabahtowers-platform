// import type { ReactNode } from "react";
// import { notFound } from "next/navigation";
// import { NotifyProvider, NotifyContainer } from "@repo/ui";
// import { QueryProvider } from "./providers";
// import { Header } from "./components/Header/header-wrapper";
// import { isValidLocale, LOCALES } from "@/lib/i18n";

// export function generateStaticParams() {
//   return LOCALES.map((locale) => ({ locale }));
// }

// export default async function LocaleLayout({
//     children,
//     params,
// }: {
//     children: ReactNode;
//     params: Promise<{ locale: string }>;
// }) {
//     const { locale } = await params;

//     if (!isValidLocale(locale)) {
//         notFound();
//     }

//     return (
//         <QueryProvider>
//             <NotifyProvider>
//                 <Header locale={locale} />
//                 <main>{children}</main>
//                 <NotifyContainer />
//             </NotifyProvider>
//         </QueryProvider>
//     );
// }



import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NotifyProvider, NotifyContainer } from "@repo/ui";
import { QueryProvider } from "./providers";
import { Header } from "./components/Header/header-wrapper";
import { isValidLocale, LOCALES } from "@/lib/i18n";
import { getSeo } from "@/config/project";

const inter = localFont({
  src: [
    { path: "../fonts/Inter-VariableFont_opsz,wght.ttf", style: "normal" },
    { path: "../fonts/Inter-Italic-VariableFont_opsz,wght.ttf", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeo(locale);

  return {
    title: seo.projectName,
    description: seo.projectDescription,
    keywords: seo.keywords,
  };
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
        <html lang={locale}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body className={inter.variable}>
                <QueryProvider>
                    <NotifyProvider>
                        <Header locale={locale} />
                        <main>{children}</main>
                        <NotifyContainer />
                    </NotifyProvider>
                </QueryProvider>
            </body>
        </html>
    );
}