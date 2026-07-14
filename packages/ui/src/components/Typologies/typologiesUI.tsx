'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Typologies/typologies.module.css';

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

const WIDE_WIDTH = 585;
const NARROW_WIDTH = 458;
const GAP = 28;

// How many full copies of the card list to render side by side. Having the
// real slides sandwiched between full extra copies (instead of just single
// clones) guarantees there are always enough cards on both sides to fill the
// viewport, no matter where the user has scrolled to - so there is never a
// blank gap at the start/end of the loop.
const REPEAT = 3;

export function TypologiesUI({ eyebrow, titleSegments, cards, starIconSrc }: TypologiesUIProps) {
  const total = cards.length;

  const extendedCards: TypologyCard[] =
    total > 0 ? Array.from({ length: REPEAT }, () => cards).flat() : [];

  // trackIndex is the position inside extendedCards. The "real" slides live
  // in the middle copy, so real slide 0 sits at position `total`.
  const [trackIndex, setTrackIndex] = useState(total);
  const [enableTransition, setEnableTransition] = useState(true);

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
      // Slid into the leading buffer copy - snap forward into the middle
      // copy, landing on the exact same visual card.
      setEnableTransition(false);
      setTrackIndex((prev) => prev + total);
    } else if (trackIndex >= total * 2) {
      // Slid into the trailing buffer copy - snap back into the middle
      // copy, landing on the exact same visual card.
      setEnableTransition(false);
      setTrackIndex((prev) => prev - total);
    }
  };

  // After a transition-less snap, re-enable the transition on the next
  // frame so future clicks animate normally again.
  useEffect(() => {
    if (!enableTransition) {
      const raf = requestAnimationFrame(() => setEnableTransition(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [enableTransition]);

  const offset = trackIndex * (NARROW_WIDTH + GAP);

  return (
    <section className={styles.typologies}>
      <div className={styles.eyebrowRow}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <span className={styles.eyebrowLine} />
      </div>

      <h2 className={styles.title}>
        {titleSegments.map((segment, i) =>
          segment.italic ? (
            <em key={i} className={styles.titleItalic}>
              {segment.text}{' '}
            </em>
          ) : (
            <span key={i}>{segment.text} </span>
          )
        )}
      </h2>

      <div className={styles.sliderOuter}>
        <div className={styles.sliderViewport}>
          <div
            className={`${styles.track} ${!enableTransition ? styles.trackNoTransition : ''}`}
            style={{ transform: `translateX(-${offset}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedCards.map((card, index) => {
              const isActive = index === trackIndex;
              return (
                <div
                  key={`${card.badge}-${index}`}
                  className={`${styles.card} ${!enableTransition ? styles.cardNoTransition : ''}`}
                  style={{ width: isActive ? WIDE_WIDTH : NARROW_WIDTH }}
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
      </div>

      <div className={styles.footer}>
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
      </div>
    </section>
  );
}