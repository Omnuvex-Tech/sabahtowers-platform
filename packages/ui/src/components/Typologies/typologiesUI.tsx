"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
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

export interface TypologiesUIProps {
  eyebrow: string;
  titleSegments: TitleSegment[];
  cards: TypologyCard[];
  starIconSrc: string;
}

const REPEAT = 3;
const CARD_TRANSITION_MS = 500;
const DRAG_THRESHOLD_RATIO = 0.15;
const smoothEase = [0.16, 1, 0.3, 1] as const;

const mainSectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: smoothEase } },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (globalIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: smoothEase, delay: 0.08 + globalIndex * 0.06 },
  }),
};

const sliderOuterVariants: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: smoothEase, delay: 0.3 } },
};

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: smoothEase, delay: 0.4 } },
};

export function TypologiesUI({ eyebrow, titleSegments, cards, starIconSrc }: TypologiesUIProps) {
  const total = cards.length;
  const extendedCards = total > 0 ? Array.from({ length: REPEAT }, () => cards).flat() : [];
  const [trackIndex, setTrackIndex] = useState(total);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(486);
  const activeRealIndex = total > 0 ? ((trackIndex % total) + total) % total : 0;
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragBaseOffsetRef = useRef(0);

  const move = useCallback((dir: 1 | -1) => {
    if (isTransitioning || total <= 1) return;
    setIsTransitioning(true);
    setTrackIndex(prev => prev + dir);
  }, [isTransitioning, total]);

  const handleTransitionEnd = useCallback((e?: React.TransitionEvent) => {
    if (e && e.target !== trackRef.current) return;
    if (!trackRef.current) return;
    const current = trackIndex;
    let newIndex = current;
    if (current < total) newIndex = current + total;
    else if (current >= total * 2) newIndex = current - total;

    if (newIndex !== current) {
      trackRef.current.style.transition = 'none';
      setTrackIndex(newIndex);
      void trackRef.current.offsetHeight;
    }

    setIsTransitioning(false);
  }, [trackIndex, total]);

  useEffect(() => {
    const updateStep = () => {
      if (!trackRef.current) return;
      const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(
        getComputedStyle(trackRef.current).columnGap ||
        getComputedStyle(trackRef.current).gap ||
        '0'
      );
      setStep(cardWidth + gap);
    };

    updateStep();
    window.addEventListener('resize', updateStep);
    return () => window.removeEventListener('resize', updateStep);
  }, [total]);


  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(() => {
      move(1);
    }, 2000);
    return () => clearInterval(timer);
  }, [trackIndex, total, move, isPaused]);

  const offset = trackIndex * step;

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isTransitioning || total <= 1) return;
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragBaseOffsetRef.current = offset;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
    setIsPaused(true);
    setIsDragging(true);
  }, [isTransitioning, total, offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4) hasMovedRef.current = true;
    track.style.transform = `translateX(${-dragBaseOffsetRef.current + delta}px)`;
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const track = trackRef.current;
    try { track?.releasePointerCapture(e.pointerId); } catch { }
    setIsDragging(false);
    setIsPaused(false);

    if (!hasMovedRef.current) return;

    const delta = e.clientX - dragStartXRef.current;
    const threshold = step * DRAG_THRESHOLD_RATIO;

    if (delta <= -threshold) {
      move(1);
    } else if (delta >= threshold) {
      move(-1);
    } else {
      setIsTransitioning(true);
    }
  }, [step, move]);

  const renderAnimatedSegments = () => {
    let globalWordIndex = 0;
    return titleSegments.map((segment, segmentIndex) => {
      const segmentWords = segment.text.split(" ").filter(w => w !== "");
      const content = segmentWords.map((word) => {
        const currentWordIndex = globalWordIndex++;
        return (
          <motion.span
            key={currentWordIndex}
            variants={titleWordVariants}
            custom={currentWordIndex}
            style={{ display: "inline-block" }}>
            {word}{"\u00A0"}
          </motion.span>);
      });

      if (segment.italic) {
        return <em key={segmentIndex} className={styles.titleItalic}>{content}</em>;
      }
      return <span key={segmentIndex}>{content}</span>;
    });
  };

  return (
    <motion.section id='units' className={styles.typologies} variants={mainSectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <span className={styles.eyebrowLine} />
      </div>

      <motion.h2 className={styles.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        {renderAnimatedSegments()}
      </motion.h2>

      <motion.div className={styles.sliderOuter} variants={sliderOuterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        <div className={styles.sliderViewport}>
          <div
            ref={trackRef}
            className={`${styles.track} ${isTransitioning ? styles.isSwiping : ''}`}
            style={{
              transform: `translateX(-${offset}px)`,
              transition: isTransitioning ? `transform ${CARD_TRANSITION_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onTransitionEnd={handleTransitionEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag} >
            {extendedCards.map((card, index) => {
              const isActive = index === trackIndex;
              return (
                <div
                  key={`${card.badge}-${index}`}
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`} >
                  <div className={styles.cardImageWrap}>
                    <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="(max-width: 768px) 90vw, 500px" className={styles.cardImage} draggable={false} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardBadge}>{card.badge}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    <ul className={styles.featureList}>
                      {card.features.map((f, i) => (
                        <li key={i} className={styles.featureItem}>
                          <Image src={starIconSrc} alt="" width={20} height={20} className={styles.featureIcon} draggable={false} />
                          <span>{f}</span>
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

      <motion.div className={styles.footer} variants={footerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className={styles.progressTrack}>
          <span className={styles.progressThumb} style={{ width: `${100 / total}%`, left: `${(activeRealIndex / total) * 100}%` }} />
        </div>
        <div className={styles.navArrows}>
          <button type="button" className={styles.navBtn} onClick={() => move(-1)}>
            <span className={`${styles.navIcon} ${styles.navIconLeft}`} />
          </button>
          <button type="button" className={styles.navBtn} onClick={() => move(1)}>
            <span className={`${styles.navIcon} ${styles.navIconRight}`} />
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
} 