"use client";

import Image from 'next/image';
import styles from '../../styles/Hero/hero.module.css';
import { motion, Variants } from 'framer-motion';
import { handleAnchorClick } from '../../lib/smooth-scroll';

export interface HeroCta {
  label: string;
  href: string;
  download?: boolean;
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

const customEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: customEase },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: customEase },
  },
};

const actionsVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: customEase },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: "8%", scale: 1.08 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 2.4, ease: customEase },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 2.0, ease: customEase },
  },
};

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
      <motion.div
        className={styles.heroBox}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', zIndex: 0 }}>
          <motion.div
            variants={imageVariants}
            style={{ height: '100%', width: '100%', position: 'relative', opacity: 0 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />
          </motion.div>

          <motion.div
            variants={overlayVariants}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              pointerEvents: 'none'
            }}
          />
        </div>

        <div className={styles.content} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <motion.p
              className={styles.eyebrow}
              variants={eyebrowVariants}
              style={{ opacity: 0 }}
            >
              {eyebrow}
            </motion.p>
          </div>

        <h1 className={styles.title}>
  <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', paddingBottom: '0.1em' }}>
    <motion.span
      style={{ display: 'inline', opacity: 0 }}
      variants={lineVariants}
    >
      {titleBefore}{' '}
      <em className={styles.titleItalic}>{titleItalic}</em> {titleAfter}
    </motion.span>
  </div>
</h1>
          <div style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
            <motion.div
              className={styles.actions}
              variants={actionsVariants}
              style={{ opacity: 0 }}
            >
              <a
                href={primaryCta.href}
                className={styles.btnPrimary}
                {...(primaryCta.download ? { download: true } : {})}
              >
                {primaryCta.label}
              </a>
              <a href={secondaryCta.href}
                className={styles.btnSecondary}
                onClick={(e) => handleAnchorClick(e, secondaryCta.href)}
              >
                {secondaryCta.label}
              </a>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}