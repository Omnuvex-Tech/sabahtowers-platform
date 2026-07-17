'use client';

import Image from 'next/image';
import styles from '../../styles/MapLocation/mapLocation.module.css';
import { motion, Variants } from 'framer-motion';

interface MapLocationUIProps {
  mapImageSrc: string;
  mapImageAlt: string;
  badgeIconSrc: string;
  badgeIconAlt: string;
  pinIconSrc: string;
  viewOnMapLabel: string;
  viewOnMapHref: string;
}

const ultraSmoothEase = [0.25, 1, 0.2, 1] as const;

// Bölmənin aşağıdan rəvan və yavaş süzülməsi üçün animasiya
const mapSectionVariants: Variants = {
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

export function MapLocationUI({
  mapImageSrc,
  mapImageAlt,
  badgeIconSrc,
  badgeIconAlt,
  pinIconSrc,
  viewOnMapLabel,
  viewOnMapHref,
}: MapLocationUIProps) {
  return (
    <motion.section 
      className={styles.mapSection}
      variants={mapSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className={styles.mapWrap}>
        <Image
          src={mapImageSrc}
          alt={mapImageAlt}
          fill
          sizes="100vw"
          className={styles.mapImage}
        />

        <div className={styles.marker}>
          <Image
            src={badgeIconSrc}
            alt={badgeIconAlt}
            width={71}
            height={67}
            className={styles.markerBadge}
          />
          <Image
            src={pinIconSrc}
            alt=""
            width={40}
            height={40}
            className={styles.markerPin}
          />
        </div>

        <a
          href={viewOnMapHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewOnMapBtn}
        >
          {viewOnMapLabel}
        </a>
      </div>
    </motion.section>
  );
}