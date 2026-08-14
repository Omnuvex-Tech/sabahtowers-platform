import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://sabahtowers.az/sitemap.xml",
        host: "https://sabahtowers.az",
    };
}