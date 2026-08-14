type Locale = "az" | "en" | "ru";

const baseUrl = "https://sabahtowers.az";

const socialLinks = [
    "https://www.instagram.com/sabahtowers.az",
    "https://www.tiktok.com/@sabahtowers",
    "https://www.facebook.com/profile.php?id=61591201147020",
];

const organizationId = `${baseUrl}/#organization`;
const websiteId = `${baseUrl}/#website`;

const localizedCopy: Record<Locale, { name: string; description: string }> = {
    az: {
        name: "Sabah Towers Sea Breeze",
        description:
            "Sabah Towers — Xəzər dənizinin birinci sahil xəttində, Azərbaycanda ilk 'Longevity Wellness' konseptini təqdim edən yaşayış kompleksi.",
    },
    en: {
        name: "Sabah Towers Sea Breeze",
        description:
            "Sabah Towers — the first 'Longevity Wellness' concept residence in Azerbaijan, located on the first coastline of the Caspian Sea.",
    },
    ru: {
        name: "Sabah Towers Sea Breeze",
        description:
            "Sabah Towers — жилой комплекс на первой береговой линии Каспийского моря, представляющий первую в Азербайджане концепцию 'Longevity Wellness'.",
    },
};

const privacyTitles: Record<Locale, string> = {
    az: "MƏXFİLİK SİYASƏTİ",
    en: "PRIVACY POLICY",
    ru: "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ",
};

const amenities = [
    "Tennis and Padel Courts",
    "Fitness Center",
    "2 Outdoor Pools + 1 Indoor Pool",
    "Kids Club",
    "Wellness Cafe",
    "Beachfront Running Track & Yoga Areas",
];

const unitTypes = [
    { name: "Studio Apartment", floorSizeMin: 40.58, floorSizeMax: 41.34, rooms: 1 },
    { name: "1-Bedroom Apartment", floorSizeMin: 83.44, floorSizeMax: 84.09, rooms: 2 },
    { name: "2-Bedroom Apartment", floorSizeMin: 98.02, floorSizeMax: 110.47, rooms: 3 },
];

export function getHomeSchema(locale: Locale) {
    const copy = localizedCopy[locale] ?? localizedCopy.az;
    const pageUrl = `${baseUrl}/${locale}`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": organizationId,
                name: "Sabah Towers",
                url: baseUrl,
                logo: `${baseUrl}/images/logo.svg`,
                image: `${baseUrl}/images/img-hero.png`,
                sameAs: socialLinks,
                contactPoint: [
                    {
                        "@type": "ContactPoint",
                        telephone: "+994502772662",
                        contactType: "sales",
                        areaServed: "AZ",
                        availableLanguage: ["az", "en", "ru"],
                    },
                ],
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: baseUrl,
                name: "Sabah Towers",
                publisher: { "@id": organizationId },
                inLanguage: locale,
            },
            {
                "@type": "ApartmentComplex",
                "@id": `${pageUrl}/#property`,
                name: copy.name,
                description: copy.description,
                url: pageUrl,
                image: [
                    `${baseUrl}/images/img-hero.png`,
                    `${baseUrl}/images/img-hero2.jpg`,
                    `${baseUrl}/images/exterior1.png`,
                    `${baseUrl}/images/interior4.png`,
                ],
                telephone: "+994502772662",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Mikayıl Müşfiq küçəsi, Nardaran",
                    addressLocality: "Bakı",
                    postalCode: "1907",
                    addressCountry: "AZ",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: 40.5808125,
                    longitude: 49.9271875,
                },
                amenityFeature: amenities.map((a) => ({
                    "@type": "LocationFeatureSpecification",
                    name: a,
                    value: true,
                })),
                containsPlace: unitTypes.map((u) => ({
                    "@type": "Apartment",
                    name: u.name,
                    numberOfRooms: u.rooms,
                    floorSize: {
                        "@type": "QuantitativeValue",
                        minValue: u.floorSizeMin,
                        maxValue: u.floorSizeMax,
                        unitCode: "MTK",
                    },
                })),
                department: [
                    {
                        "@type": "RealEstateAgent",
                        name: "Sabah Towers — Bakı Satış Ofisi",
                        telephone: "+994502772662",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "Ziya Yusifzadə 10, Sabah Residence",
                            addressLocality: "Bakı",
                            addressCountry: "AZ",
                        },
                    },
                    {
                        "@type": "RealEstateAgent",
                        name: "Sabah Towers — Sea Breeze Satış Ofisi",
                        telephone: "+994502772662",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "Mikayıl Müşfiq küçəsi, Nardaran",
                            addressLocality: "Bakı",
                            postalCode: "1907",
                            addressCountry: "AZ",
                        },
                        geo: {
                            "@type": "GeoCoordinates",
                            latitude: 40.5808125,
                            longitude: 49.9271875,
                        },
                    },
                ],
            },
        ],
    };
}

export function getPrivacyPolicySchema(locale: Locale) {
    const pageUrl = `${baseUrl}/${locale}/privacypolicy`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${pageUrl}/#webpage`,
                url: pageUrl,
                name: privacyTitles[locale] ?? privacyTitles.az,
                isPartOf: { "@id": websiteId },
                inLanguage: locale,
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: privacyTitles[locale] ?? privacyTitles.az,
                        item: pageUrl,
                    },
                ],
            },
        ],
    };
}