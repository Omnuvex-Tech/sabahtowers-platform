import type { MetadataRoute } from "next";

const baseUrl = "https://sabahtowers.az";
const locales = ["az", "en", "ru"];
const routes = ["", "/privacypolicy"];

export default function sitemap(): MetadataRoute.Sitemap {
    return locales.flatMap((locale) =>
        routes.map((route) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: route === "" ? 1 : 0.5,
        }))
    );
}