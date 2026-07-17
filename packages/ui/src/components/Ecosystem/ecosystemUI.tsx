"use client";

import Image from 'next/image';
import styles from '../../styles/Ecosystem/ecosystem.module.css';
import { motion, Variants } from 'framer-motion';
import { handleAnchorClick } from '../../lib/smooth-scroll';

export interface EcosystemCta {
  label: string;
  href: string;
  download?: boolean;
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

const smoothEase = [0.16, 1, 0.3, 1] as const;
const elementVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: smoothEase,
      delay: customDelay
    },
  }),
};

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
  <section id="about" className={styles.ecosystem}>
      <div className={styles.imageWrapperLeft}>
        <motion.div
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Image
            src={leftImageSrc}
            alt={leftImageAlt}
            width={540}
            height={375}
            className={styles.image}
            priority
          />
        </motion.div>
      </div>

      <div className={styles.content}>
        <motion.div
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.1}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Image
            src={iconSrc}
            alt=""
            width={35}
            height={35}
            className={styles.icon}
          />
        </motion.div>

        <motion.h2
          className={styles.title}
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.18}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          {title}
        </motion.h2>

        <motion.p
          className={styles.description}
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.26}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          {description}
        </motion.p>

        <motion.div
          className={styles.actions}
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.34}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <a href={primaryCta.href}
            className={styles.btnPrimary}
            {...(primaryCta.download ? { download: true } : {})}
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className={styles.btnSecondary}
            onClick={(e) => handleAnchorClick(e, secondaryCta.href)}
          >
            {secondaryCta.label}
          </a>
        </motion.div>
      </div>

      <div className={styles.imageWrapperRight}>
        <motion.div
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          custom={0.42}
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <Image
            src={rightImageSrc}
            alt={rightImageAlt}
            width={540}
            height={375}
            className={styles.image}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}