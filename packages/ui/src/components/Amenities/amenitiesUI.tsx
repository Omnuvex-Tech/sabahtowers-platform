
"use client";

import Image from 'next/image';
import styles from '../../styles/Amenities/amenities.module.css';
import { motion, Variants } from 'framer-motion';

export interface AmenityItem {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

interface AmenitiesUIProps {
  eyebrow: string;
  title: string;
  items: AmenityItem[];
}
const smoothEase = [0.16, 1, 0.3, 1] as const;
const mainSectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 35 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.1, 
      ease: smoothEase,
    },
  },
};
const titleWordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 25 
  },
  visible: (delayIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1.1, 
      ease: smoothEase,
      delay: 0.1 + delayIndex * 0.18
    },
  }),
};

const gridItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: (localIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: smoothEase,
      delay: localIndex * 0.18
    },
  }),
};

export function AmenitiesUI({ eyebrow, title, items }: AmenitiesUIProps) { 
  const renderAnimatedTitle = (fullTitle: string) => {
    const words = fullTitle.split(" ");
    const totalWords = words.length;

    return (
      <>
        {words.map((word, index) => {
          const isLastFour = index >= totalWords - 4;
          const delayIndex = isLastFour ? (index - (totalWords - 4) + 1) : 0;

          return (
            <motion.span
              key={index}
              variants={titleWordVariants}
              custom={delayIndex}
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
              }}
            >
              {word}
              {index < totalWords - 1 ? "\u00A0" : ""}
            </motion.span>
          );
        })}
      </>
    );
  };

  return (
    <motion.section 
      className={styles.amenities}
      variants={mainSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <span className={styles.eyebrowLine} />
      </div>
      <motion.h2 
        className={styles.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {renderAnimatedTitle(title)}
      </motion.h2>
      <div className={styles.grid}>
        {items.map((item, index) => {
          const localIndex = index % 3;

          return (
            <motion.div 
              key={item.title} 
              className={styles.item}
              variants={gridItemVariants}
              custom={localIndex} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Image
                src={item.iconSrc}
                alt={item.iconAlt}
                width={44}
                height={44}
                className={styles.icon}
              />
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}