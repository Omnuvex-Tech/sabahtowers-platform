'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Interior/interior.module.css';

export interface InteriorSlide {
    imageSrc: string;
    imageAlt: string;
    title: string;
}

export interface InteriorCta {
    label: string;
    href: string;
}

interface InteriorUIProps {
    eyebrow: string;
    slides: InteriorSlide[];
    primaryCta:InteriorCta;
    secondaryCta: InteriorCta;
}

export function InteriorUI({ eyebrow, slides, primaryCta, secondaryCta }: InteriorUIProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = slides.length;
    const activeSlide = slides[activeIndex];

    const goPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    if (!activeSlide) return null;

    return (
        <section className={styles.exterior}>
            <div className={styles.eyebrowRow}>
                <span className={styles.eyebrow}>{eyebrow}</span>
                <span className={styles.eyebrowLine} />
            </div>

            <div className={styles.box}>
                <Image
                    src={activeSlide.imageSrc}
                    alt={activeSlide.imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className={styles.image}
                />
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <h2 className={styles.title}>{activeSlide.title}</h2>

                    <div className={styles.actions}>
                        <a href={primaryCta.href} className={styles.btnPrimary}>
                            {primaryCta.label}
                        </a>
                        <a href={secondaryCta.href} className={styles.btnSecondary}>
                            {secondaryCta.label}
                        </a>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.progressTrack}>
                        <span
                            className={styles.progressThumb}
                            style={{
                                width: `${100 / total}%`,
                                left: `${(activeIndex / total) * 100}%`,
                            }}
                        />
                    </div>

                    <div className={styles.navArrows}>
                        <button
                            type="button"
                            className={styles.navBtn}
                            aria-label="Əvvəlki şəkil"
                            onClick={goPrev}
                        >
                            <Image
                                src="/images/heroicons-outline_arrow-narrow-left.png"
                                alt=""
                                width={20}
                                height={20}
                                className={styles.navIcon}
                            />
                        </button>
                        <button
                            type="button"
                            className={styles.navBtn}
                            aria-label="Növbəti şəkil"
                            onClick={goNext}
                        >
                            <Image
                                src="/images/heroicons_arrow-long-right.png"
                                alt=""
                                width={20}
                                height={20}
                                className={styles.navIcon}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}