"use client";

import styles from "../../styles/LanguageSwitcher/languageSwitcher.module.css";

export interface LanguageSwitcherProps {
    locales: string[];
    activeLocale: string;
    onLocaleChange: (locale: string) => void;
}

const LanguageSwitcher = ({ locales, activeLocale, onLocaleChange }: LanguageSwitcherProps) => {
    return (
        <div className={styles.wrapper}>
            {locales.map((code, index) => (
                <span key={code} className={styles.item}>
                    <button
                        type="button"
                        onClick={() => onLocaleChange(code)}
                        className={`${styles.button} ${
                            activeLocale === code ? styles.active : ""
                        }`}
                    >
                        {code.toUpperCase()}
                    </button>
                    {index < locales.length - 1 && (
                        <span className={styles.divider}>/</span>
                    )}
                </span>
            ))}
        </div>
    );
};

export { LanguageSwitcher };