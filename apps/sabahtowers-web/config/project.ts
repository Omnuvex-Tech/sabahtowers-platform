import { normalizer } from "@repo/shared/utils";

export const project = {
    url: normalizer.string(process.env.NEXT_PUBLIC_APP_URL),
    name: normalizer.string(process.env.NEXT_PUBLIC_APP_NAME),
    projectName: "Sabah Towers Sea Breeze",
    projectDescription: "Sabah Towers - Azərbaycanın Sea Breeze ərazisində fərdi və tam bərpa proseslərini mərkəzə alan ilk 'Longevity Wellness' konseptini təqdim edir.",
    keywords: ["Sabah Towers", "Sea Breeze", "Longevity Wellness", "Sea Breeze mənzillər", "Sabah Towers mənzil qiymətləri", "Sabah Towers mənzillər", "Sea Breeze mənzil qiymətləri", "Sabah Towers ünvanı", "Sabah Towers hardadı", "Sabah Towers Sea Breeze", "Sabah Towers Azərbaycan", "Sabah Towers Bakı", "Bakı", "Azərbaycan", "Sea Breeze ev qiymətləri", "Sea Breeze evlər", "ev qiymətləri"],
    defLang: "az",
} as const; 