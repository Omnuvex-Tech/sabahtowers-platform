import Image from 'next/image';
import styles from '../../styles/Ecosystem/ecosystem.module.css';

export interface EcosystemCta {
  label: string;
  href: string;
}

interface EcosystemUIProps {
  title: string;
  description: string;
  leftImageSrc: string;
  leftImageAlt: string;
  rightImageSrc: string;
  rightImageAlt: string;
  iconSrc: string;
  primaryCta: EcosystemCta;
  secondaryCta: EcosystemCta;
}

export function EcosystemUI({
  title,
  description,
  leftImageSrc,
  leftImageAlt,
  rightImageSrc,
  rightImageAlt,
  iconSrc,
  primaryCta,
  secondaryCta,
}: EcosystemUIProps) {
  return (
    <section className={styles.ecosystem}>
      <div className={styles.imageWrapperLeft}>
        <Image
          src={leftImageSrc}
          alt={leftImageAlt}
          width={540}
          height={375}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <Image
          src={iconSrc}
          alt=""
          width={35}
          height={35}
          className={styles.icon}
        />

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <a href={primaryCta.href} className={styles.btnPrimary}>
            {primaryCta.label}
          </a>
          <a href={secondaryCta.href} className={styles.btnSecondary}>
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div className={styles.imageWrapperRight}>
        <Image
          src={rightImageSrc}
          alt={rightImageAlt}
          width={540}
          height={375}
          className={styles.image}
        />
      </div>
    </section>
  );
}