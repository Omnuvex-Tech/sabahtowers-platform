import { PrivacyPolicyUI, type PrivacyPolicyItem } from "@repo/ui/components/PrivacyPolicy/privacyPolicyUI";
import { getDictionary } from "@/lib/i18n";

export function PrivacyPolicy({ locale }: { locale: string }) {
    const t = getDictionary(locale);

    const items: PrivacyPolicyItem[] = t.privacyPolicy.items.map(
        (item: { title: string; description: string }) => ({
            title: item.title,
            description: item.description,
        })
    );

    return (
        <PrivacyPolicyUI
            title={t.privacyPolicy.title}
            intro={t.privacyPolicy.intro}
            items={items}
        />
    );
}