'use client';

import Image from 'next/image';
import styles from '../../styles/Footer/footer.module.css';
import { motion, Variants } from 'framer-motion';
import { handleAnchorClick } from '../../lib/smooth-scroll';

export interface FooterLocale {
  code: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  iconSrc: string;
  alt: string;
  href: string;
}

interface FooterUIProps {
  locales: FooterLocale[];
  activeLocale: string;
  onLocaleChange: (code: string) => void;
  addressText: string;
  exploreTitle: string;
  exploreLinks: FooterLink[];
  getInTouchTitle: string;
  phoneShort: string;
  phoneFull: string;
  followTitle: string;
  socialLinks: FooterSocialLink[];
wordmarkSrc: string;
  wordmarkAlt: string;
  copyrightText: string;
  privacyPolicyLink: FooterLink;
}

const ultraSmoothEase = [0.25, 1, 0.2, 1] as const;
const footerSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: ultraSmoothEase,
    },
  },
};

export function FooterUI({
  locales,
  activeLocale,
  onLocaleChange,
  addressText,
  exploreTitle,
  exploreLinks,
  getInTouchTitle,
  phoneShort,
  phoneFull,
  followTitle,
  socialLinks,
wordmarkSrc,
  wordmarkAlt,
  copyrightText,
  privacyPolicyLink,
}: FooterUIProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    const [locationPart, ...descParts] = addressText.split('\n\n');
  const descriptionPart = descParts.join('\n\n');

  return (
    <motion.footer
      className={styles.footer}
      variants={footerSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className={styles.topRow}>
        <div className={styles.localesRow}>
          {locales.map((locale, index) => (
            <span key={locale.code} className={styles.localeItem}>
              <button
                type="button"
                onClick={() => onLocaleChange(locale.code)}
                className={`${styles.localeBtn} ${activeLocale === locale.code ? styles.localeActive : ''
                  }`}
              >
                {locale.label}
              </button>
              {index < locales.length - 1 && (
                <span className={styles.localeDivider}>/</span>
              )}
            </span>
          ))}
        </div>

        <button
          type="button"
          className={styles.scrollTopBtn}
          onClick={scrollToTop}
          aria-label="Yuxarı qayıt"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 18 18"
            fill="none"
            className={styles.scrollTopIcon}
          >
            <path
              d="M9 15V3M9 3L4 8M9 3L14 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.mainRow}>
<p className={styles.addressText}>
  <span className={styles.addressLocation}>{locationPart}</span>
  {descriptionPart && (
    <>
      {'\n\n'}
      <span className={styles.addressDescription}>{descriptionPart}</span>
    </>
  )}
</p>
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTitle}>{exploreTitle}</span>
            <span className={styles.columnLine} />
          </div>
          <ul className={styles.linkList}>
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.columnRight}>
          <div className={styles.columnHeaderRight}>
            <span className={styles.columnTitleRight}>{getInTouchTitle}</span>
            <span className={styles.columnLine} />
          </div>
          <div className={styles.phoneGroup}>
            <a href={`tel:${phoneShort}`} className={styles.phoneLink}>
              {phoneShort}
            </a>
            <a href={`tel:${phoneFull}`} className={styles.phoneLink}>
              {phoneFull}
            </a>
          </div>

          <div className={styles.followHeader}>
            <span className={styles.columnTitle}>{followTitle}</span>
            <span className={styles.columnLine} />
          </div>
          <div className={styles.socials}>
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.alt}
              >
                <Image
                  src={social.iconSrc}
                  alt={social.alt}
                  width={24}
                  height={24}
                  className={styles.socialIcon}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.wordmarkRow}>
        <Image
          src={wordmarkSrc}
          alt={wordmarkAlt}
          width={1160}
          height={108}
          className={styles.wordmarkImage}
        />
      </div>
<div className={styles.copyrightRow}>
        <span className={styles.copyrightText}>{copyrightText}</span>
        <a
          href={privacyPolicyLink.href}
          className={styles.privacyLink}
          onClick={(e) => handleAnchorClick(e, privacyPolicyLink.href)}
        >
          {privacyPolicyLink.label}
        </a>
      </div>
    </motion.footer>
  );
}