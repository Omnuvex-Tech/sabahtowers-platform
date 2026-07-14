import Image from 'next/image';
import styles from '../../styles/Hero/hero.module.css';

export interface HeroCta {
  label: string;
  href: string;
}

interface HeroUIProps {
  eyebrow: string;
  titleBefore: string;
  titleItalic: string;
  titleAfter: string;
  imageSrc: string;
  imageAlt: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}

export function HeroUI({
  eyebrow,
  titleBefore,
  titleItalic,
  titleAfter,
  imageSrc,
  imageAlt,
  primaryCta,
  secondaryCta,
}: HeroUIProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBox}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <p className={styles.eyebrow}>{eyebrow}</p>

          <h1 className={styles.title}>
            {titleBefore}{' '}
            <em className={styles.titleItalic}>{titleItalic}</em>{' '}
            {titleAfter}
          </h1>

          <div className={styles.actions}>
            <a href={primaryCta.href} className={styles.btnPrimary}>
              {primaryCta.label}
            </a>
            <a href={secondaryCta.href} className={styles.btnSecondary}>
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}