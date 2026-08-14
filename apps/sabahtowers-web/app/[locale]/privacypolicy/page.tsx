import { PrivacyPolicy } from "../components/privacypolicy/PrivacyPolicy-wrapper";
import { Footer } from "../components/Footer/footer-wrapper";
import { getPrivacyPolicySchema } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const structuredData = getPrivacyPolicySchema(locale as "az" | "en" | "ru");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <PrivacyPolicy locale={locale} />
            <Footer locale={locale} />
        </>
    );
}