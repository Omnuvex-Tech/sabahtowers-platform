"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../../styles/Exterior/gallery.module.css';
import type { ExteriorGalleryImage } from './exteriorUI';

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: ExteriorGalleryImage[];
    initialIndex: number;
}

const smoothEase = [0.16, 1, 0.3, 1] as const;

export function GalleryModal({ isOpen, onClose, images, initialIndex }: GalleryModalProps) {
    const [index, setIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const total = images.length;
    const activeSlide = images[index];

    useEffect(() => {
        if (isOpen) {
            setIndex(initialIndex);
            setIsZoomed(false);
        }
    }, [isOpen, initialIndex]);

    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const goPrev = useCallback(() => {
        setIsZoomed(false);
        setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    }, [total]);

    const goNext = useCallback(() => {
        setIsZoomed(false);
        setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, [total]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'Escape' && !document.fullscreenElement) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, goPrev, goNext, onClose]);

    useEffect(() => {
        thumbRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [index]);


    const prevIndex = total > 0 ? (index === 0 ? total - 1 : index - 1) : index;
    const nextIndex = total > 0 ? (index === total - 1 ? 0 : index + 1) : index;
    const neighborIndices = Array.from(new Set([prevIndex, nextIndex])).filter((i) => i !== index);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;
        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch {
        }
    };

    const handleDownload = () => {
        if (!activeSlide) return;
        const link = document.createElement('a');
        link.href = activeSlide.imageSrc;
        link.download = activeSlide.imageAlt || `exterior-${index + 1}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!activeSlide) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: smoothEase }}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.96, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 16 }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                    >
                        <div className={styles.counter}>{index + 1} / {total}</div>

                        <div className={styles.toolbar}>
                            <button
                                type="button"
                                className={styles.toolBtn}
                                aria-label={isZoomed ? 'Kiçilt' : 'Böyüt'}
                                onClick={() => setIsZoomed((z) => !z)}
                            >
                                <ZoomIcon />
                            </button>
                            <button
                                type="button"
                                className={styles.toolBtn}
                                aria-label="Yüklə"
                                onClick={handleDownload}
                            >
                                <DownloadIcon />
                            </button>
                            <button
                                type="button"
                                className={styles.toolBtn}
                                aria-label={isFullscreen ? 'Tam ekrandan çıx' : 'Tam ekran'}
                                onClick={toggleFullscreen}
                            >
                                <FullscreenIcon active={isFullscreen} />
                            </button>
                            <button
                                type="button"
                                className={styles.toolBtn}
                                aria-label="Bağla"
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <button
                            type="button"
                            className={`${styles.navArrow} ${styles.navArrowLeft}`}
                            aria-label="Əvvəlki şəkil"
                            onClick={goPrev}
                        >
                            <ArrowIcon direction="left" />
                        </button>
                        <button
                            type="button"
                            className={`${styles.navArrow} ${styles.navArrowRight}`}
                            aria-label="Növbəti şəkil"
                            onClick={goNext}
                        >
                            <ArrowIcon direction="right" />
                        </button>

                        <div className={styles.stage}>
                            <AnimatePresence>
                                <motion.div
                                    key={index}
                                    className={styles.imageWrap}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35, ease: smoothEase }}
                                >
                                    <Image
                                        src={activeSlide.imageSrc}
                                        alt={activeSlide.imageAlt}
                                        fill
                                        sizes="100vw"
                                        priority
                                        className={`${styles.image} ${isZoomed ? styles.imageZoomed : ''}`}
                                        onClick={() => setIsZoomed((z) => !z)}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {neighborIndices.map((i) => {
                                const neighbor = images[i];
                                if (!neighbor) return null;
                                return (
                                    <div key={`preload-${i}`} className={styles.preloadLayer} aria-hidden="true">
                                        <Image
                                            src={neighbor.imageSrc}
                                            alt=""
                                            fill
                                            sizes="100vw"
                                            loading="eager"
                                            className={styles.image}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.thumbStrip}>
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    ref={(el) => { thumbRefs.current[i] = el; }}
                                    type="button"
                                    className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
                                    onClick={() => { setIsZoomed(false); setIndex(i); }}
                                    aria-label={`${i + 1}. şəkilə keç`}
                                >
                                    <Image
                                        src={img.imageSrc}
                                        alt={img.imageAlt}
                                        fill
                                        sizes="120px"
                                        className={styles.thumbImage}
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function ZoomIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 8.5v5M8.5 11h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function FullscreenIcon({ active }: { active: boolean }) {
    if (active) {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4v3a2 2 0 01-2 2H4M15 4v3a2 2 0 002 2h3M9 20v-3a2 2 0 00-2-2H4M15 20v-3a2 2 0 012-2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 9V6a2 2 0 012-2h3M15 4h3a2 2 0 012 2v3M20 15v3a2 2 0 01-2 2h-3M9 20H6a2 2 0 01-2-2v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: direction === 'left' ? 'none' : 'scaleX(-1)' }}
        >
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}