"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Typologies/typologies.module.css';
import { motion, Variants } from 'framer-motion';

export interface TypologyCard {
  imageSrc: string;
  imageAlt: string;
  badge: string;
  description: string;
  features: string[];
}

export interface TitleSegment {
  text: string;
  italic?: boolean;
}

interface TypologiesUIProps {
  eyebrow: string;
  titleSegments: TitleSegment[];
  cards: TypologyCard[];
  starIconSrc: string;
}

const REPEAT = 3;
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
  visible: (globalIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: smoothEase,
      delay: 0.08 + globalIndex * 0.06
    },
  }),
};

const sliderOuterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 45 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 1, 
      ease: smoothEase,
      delay: 0.3
    },
  },
};

const footerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 25 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.9, 
      ease: smoothEase,
      delay: 0.4
    },
  },
};

export function TypologiesUI({ eyebrow, titleSegments, cards, starIconSrc }: TypologiesUIProps) {
  const total = cards.length;

  const extendedCards: TypologyCard[] =
    total > 0 ? Array.from({ length: REPEAT }, () => cards).flat() : [];

  const [trackIndex, setTrackIndex] = useState(total);
  const [enableTransition, setEnableTransition] = useState(true);
  const [step, setStep] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const activeRealIndex = total > 0 ? ((trackIndex % total) + total) % total : 0;

  const goPrev = () => {
    setTrackIndex((prev) => prev - 1);
  };

  const goNext = () => {
    setTrackIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform') return;

    if (trackIndex < total) {
      setEnableTransition(false);
      setTrackIndex((prev) => prev + total);
    } else if (trackIndex >= total * 2) {
      setEnableTransition(false);
      setTrackIndex((prev) => prev - total);
    }
  };

  useEffect(() => {
    if (!enableTransition) {
      const raf = requestAnimationFrame(() => setEnableTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [enableTransition]);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const measure = () => {
      const inactiveCard = trackEl.querySelector<HTMLElement>(
        `.${styles.card}:not(.${styles.cardActive})`
      );
      const referenceCard = inactiveCard ?? trackEl.querySelector<HTMLElement>(`.${styles.card}`);
      if (!referenceCard) return;

      const trackStyles = getComputedStyle(trackEl);
      const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;

      setStep(referenceCard.getBoundingClientRect().width + gap);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(trackEl);

    return () => ro.disconnect();
  }, [total]);

  const offset = trackIndex * step;

  const renderAnimatedSegments = () => {
    let globalWordIndex = 0;

    return titleSegments.map((segment, segmentIndex) => {
      const segmentWords = segment.text.split(" ").filter(w => w !== "");
      
      const content = segmentWords.map((word) => {
        const currentWordIndex = globalWordIndex;
        globalWordIndex++; 

        return (
          <motion.span
            key={currentWordIndex}
            variants={titleWordVariants}
            custom={currentWordIndex} 
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {word}
            {"\u00A0"}
          </motion.span>
        );
      });

      if (segment.italic) {
        return (
          <em key={segmentIndex} className={styles.titleItalic}>
            {content}
          </em>
        );
      }

      return <span key={segmentIndex}>{content}</span>;
    });
  };

  return (
    <motion.section 
      className={styles.typologies}
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
        {renderAnimatedSegments()}
      </motion.h2>
      <motion.div 
        className={styles.sliderOuter}
        variants={sliderOuterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className={styles.sliderViewport}>
          <div
            ref={trackRef}
            className={`${styles.track} ${!enableTransition ? styles.trackNoTransition : ''}`}
            style={{ transform: `translateX(-${offset}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedCards.map((card, index) => {
              const isActive = index === trackIndex;
              return (
                <div
                  key={`${card.badge}-${index}`}
                  className={`${styles.card} ${isActive ? styles.cardActive : ''} ${!enableTransition ? styles.cardNoTransition : ''}`}
                >
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 768px) 90vw, 500px"
                      className={styles.cardImage}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <h3 className={styles.cardBadge}>{card.badge}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>

                    <ul className={styles.featureList}>
                      {card.features.map((feature) => (
                        <li key={feature} className={styles.featureItem}>
                          <Image
                            src={starIconSrc}
                            alt=""
                            width={20}
                            height={20}
                            className={styles.featureIcon}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
      <motion.div 
        className={styles.footer}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className={styles.progressTrack}>
          <span
            className={styles.progressThumb}
            style={{
              width: `${100 / total}%`,
              left: `${(activeRealIndex / total) * 100}%`,
            }}
          />
        </div>

        <div className={styles.navArrows}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Əvvəlki"
            onClick={goPrev}
          >
            <span className={`${styles.navIcon} ${styles.navIconLeft}`} />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Növbəti"
            onClick={goNext}
          >
            <span className={`${styles.navIcon} ${styles.navIconRight}`} />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}