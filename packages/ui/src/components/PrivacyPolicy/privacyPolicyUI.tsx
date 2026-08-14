import styles from '../../styles/PrivacyPolicy/privacyPolicy.module.css';

export interface PrivacyPolicyItem {
  title: string;
  description: string;
}

interface PrivacyPolicyUIProps {
  title: string;
  intro: string;
  items: PrivacyPolicyItem[];
}

export function PrivacyPolicyUI({ title, intro, items }: PrivacyPolicyUIProps) {
  return (
    <section className={styles.privacyPolicy}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.intro}>{intro}</p>
      <div className={styles.sections}>
        {items.map((item, index) => (
          <div key={index} className={styles.section}>
            <h2 className={styles.sectionTitle}>{item.title}</h2>
            <p className={styles.sectionDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}