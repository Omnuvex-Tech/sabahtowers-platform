import type { Language, Translation } from "@repo/types/types";
import { api } from "@/lib/api";
import { config } from "@/config";
import { getDictionary } from "@/lib/i18n";
import { Hero } from "./components/Hero/hero-wrapper";
import { Ecosystem } from "./components/Ecosystem/ecosystem-wrapper";
import { Exterior } from "./components/Exterior/exterior-wrapper";
import { Interior } from "./components/Interior/interior-wrapper";
import { Amenities } from "./components/Amenities/amenities-wrapper";
import { Typologies } from "./components/Typologies/typologies-wrapper";
import { Contact } from "./components/Contact/contact-wrapper";
import { MapLocation } from "./components/MapLocation/map-location-wrapper";
import { Footer } from "./components/Footer/footer-wrapper";

export const dynamic = "force-dynamic";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = getDictionary(locale);

    const [langResponse, translationResponse] = await Promise.all([
        api.get<Language[]>(config.endpoints.languages.list),
        api.get<Translation[]>(config.endpoints.translations.list, { locale }),
    ]);
    if (!langResponse.success || !langResponse.data) {
        return (
            <div className="flex min-h-svh items-center justify-center p-8">
                <p className="text-destructive">{langResponse.message}</p>
            </div>
        );
    }
    return (
        <>
            <Hero locale={locale} />
            <Ecosystem locale={locale} />
            <Exterior locale={locale} />
            <Interior locale={locale} />
            <Amenities locale={locale} />
            <Typologies locale={locale} />
            <Contact locale={locale} />
            <MapLocation />
            <Footer locale={locale} />
        </>
    );
}