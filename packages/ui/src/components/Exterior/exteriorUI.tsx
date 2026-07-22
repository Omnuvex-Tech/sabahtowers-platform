"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Exterior/exterior.module.css';
import { motion, Variants } from 'framer-motion';
import { handleAnchorClick } from '../../lib/smooth-scroll';

export interface ExteriorSlide {
    imageSrc: string;
    imageAlt: string;
    title: string;
}

export interface ExteriorCta {
    label: string;
    href: string;
    download?: boolean;
}

interface ExteriorUIProps {
    eyebrow: string;
    slides: ExteriorSlide[];
    primaryCta: ExteriorCta;
    secondaryCta: ExteriorCta;
}

const smoothEase = [0.16, 1, 0.3, 1] as const;

const mainVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 45
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

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: (delayIndex: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.1,
            ease: smoothEase,
            delay: 0.35 + delayIndex * 0.2
        },
    }),
};

const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 25
    },
    visible: (customDelay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: smoothEase,
            delay: customDelay
        },
    }),
};

export function ExteriorUI({ eyebrow, slides, primaryCta, secondaryCta }: ExteriorUIProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [introPlayed, setIntroPlayed] = useState(false);
    const total = slides.length;
    const activeSlide = slides[activeIndex];

    const goPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };
    const goNext = () => {
        setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    if (!activeSlide) return null;

    const renderAnimatedTitle = (fullTitle: string) => {
        const words = fullTitle.split(" ");
        const totalWords = words.length;

        return (
            <>
                {words.map((word, index) => {
                    const isLastThree = index >= totalWords - 3;
                    const delayIndex = isLastThree ? (index - (totalWords - 3) + 1) : 0;

                    return (
                        <motion.span
                            key={index}
                            variants={wordVariants}
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
        <section className={styles.exterior}>
            <motion.div
                className={styles.eyebrowRow}
                variants={mainVariants}
                initial="hidden"
                whileInView="visible"
                custom={0}
                viewport={{ once: true, amount: 0.15 }}
                style={{ willChange: 'transform, opacity' }}
            >
                <span className={styles.eyebrow}>{eyebrow}</span>
                <span className={styles.eyebrowLine} />
            </motion.div>
            <motion.div
                className={styles.box}
                variants={mainVariants}
                initial="hidden"
                whileInView="visible"
                custom={0.15}
                viewport={{ once: true, amount: 0.15 }}
                style={{ willChange: 'transform, opacity' }}
            >
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
                    <motion.h2
                        key={activeIndex}
                        className={styles.title}
                        initial={introPlayed ? false : "hidden"}
                        animate={introPlayed ? "visible" : undefined}
                        whileInView={introPlayed ? undefined : "visible"}
                        viewport={introPlayed ? undefined : { once: true }}
                        onViewportEnter={() => setIntroPlayed(true)}
                    >
                        {renderAnimatedTitle(activeSlide.title)}
                    </motion.h2>
                    <motion.div
                        className={styles.actions}
                        variants={fadeUpVariants}
                        initial="hidden"
                        whileInView="visible"
                        custom={0.75}
                        viewport={{ once: true }}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <a href={primaryCta.href}
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
                <motion.div
                    className={styles.footer}
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={0.85}
                    viewport={{ once: true }}
                    style={{ willChange: 'transform, opacity' }}
                >
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
                </motion.div>
            </motion.div>
        </section>
    );
}