'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/Contact/contact.module.css';

export interface SocialLink {
  iconSrc: string;
  alt: string;
  href: string;
}

export interface CountryCode {
  iso: string;
  label: string;
  dialCode: string;
}

const countryCodes: CountryCode[] = [
  { iso: 'AZE', label: 'Azerbaijan', dialCode: '+994' },
  { iso: 'TUR', label: 'Turkey', dialCode: '+90'},
  { iso: 'RUS', label: 'Russia', dialCode: '+7' },
  { iso: 'ENG', label: 'United Kingdom', dialCode: '+44'},
  { iso: 'USA', label: 'United States', dialCode: '+1'},
  { iso: 'UAE', label: 'United Arab Emirates', dialCode: '+971'},
  { iso: 'GEO', label: 'Georgia', dialCode: '+995'},
  { iso: 'KAZ', label: 'Kazakhstan', dialCode: '+7' },
  { iso: 'DEU', label: 'Germany', dialCode: '+49'},
  { iso: 'FRA', label: 'France', dialCode: '+33'},
  { iso: 'IRN', label: 'Iran', dialCode: '+98'},
  { iso: 'UKR', label: 'Ukraine', dialCode: '+380'},
  { iso: 'ITA', label: 'Italy', dialCode: '+39'},
  { iso: 'ESP', label: 'Spain', dialCode: '+34'},
  { iso: 'NLD', label: 'Netherlands', dialCode: '+31'},
  { iso: 'SAU', label: 'Saudi Arabia', dialCode: '+966'},
  { iso: 'QAT', label: 'Qatar', dialCode: '+974'},
  { iso: 'CHN', label: 'China', dialCode: '+86'},
];

interface ContactUIProps {
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  getInTouchLabel: string;
  phoneShort: string;
  phoneFull: string;
  addressLabel: string;
  addressTitle: string;
  addressText: string;
  followLabel: string;
  socialLinks: SocialLink[];
  formTitle: string;
  submitLabel: string;
}

export function ContactUI({
  backgroundImageSrc,
  backgroundImageAlt,
  getInTouchLabel,
  phoneShort,
  phoneFull,
  addressLabel,
  addressTitle,
  addressText,
  followLabel,
  socialLinks,
  formTitle,
  submitLabel,
}: ContactUIProps) {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]!);
  const codeFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (codeFieldRef.current && !codeFieldRef.current.contains(e.target as Node)) {
        setIsCodeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCountry = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsCodeOpen(false);
  };

  return (
    <section className={styles.contact}>
      <Image
        src={backgroundImageSrc}
        alt={backgroundImageAlt}
        fill
        sizes="100vw"
        className={styles.bgImage}
      />

      <div className={styles.wrapper}>
        {/* ---------- Left card ---------- */}
        <div className={styles.infoCard}>
          <div className={`${styles.infoGroup} ${styles.getInTouchGroup}`}>
            <div className={styles.labelRow}>
              <span className={styles.label}>{getInTouchLabel}</span>
              <span className={styles.labelLine} />
            </div>
            <a href={`tel:${phoneShort}`} className={styles.phoneText}>
              {phoneShort}
            </a>
            <a href={`tel:${phoneFull}`} className={styles.phoneFull}>
              {phoneFull}
            </a>
          </div>

          <div className={`${styles.infoGroup} ${styles.addressGroup}`}>
            <div className={styles.labelRow}>
              <span className={styles.label}>{addressLabel}</span>
              <span className={styles.labelLine} />
            </div>
            <p className={styles.addressTitle}>{addressTitle}</p>
            <p className={styles.addressText}>{addressText}</p>
          </div>

          <div className={`${styles.infoGroup} ${styles.followGroup}`}>
            <div className={styles.labelRow}>
              <span className={styles.labelFollow}>{followLabel}</span>
              <span className={styles.labelLine} />
            </div>
            <div className={styles.socials}>
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.alt}
                >
                  <Image
                    src={social.iconSrc}
                    alt={social.alt}
                    width={24}
                    height={24}
                    className={styles.socialIcon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Right card (form) ---------- */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{formTitle}</h2>

          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <input type="text" name="name" placeholder="Name" className={styles.input} />
              </div>
              <div className={styles.field}>
                <input type="text" name="surname" placeholder="Surname" className={styles.input} />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.codeFieldWrap} ref={codeFieldRef}>
                <button
                  type="button"
                  className={styles.codeField}
                  onClick={() => setIsCodeOpen((prev) => !prev)}
                >
                  <span>{selectedCountry.dialCode}</span>
                  <span className={`${styles.codeArrows} ${isCodeOpen ? styles.codeArrowsOpen : ''}`} />
                </button>

                {isCodeOpen && (
                  <ul className={styles.codeDropdown}>
                    {countryCodes.map((country) => (
                      <li key={country.iso}>
                        <button
                          type="button"
                          className={`${styles.codeOption} ${
                            country.iso === selectedCountry.iso ? styles.codeOptionActive : ''
                          }`}
                          onClick={() => handleSelectCountry(country)}
                        >
                          <span className={styles.codeIso}>{country.iso}</span>
                          <span className={styles.codeDial}>{country.dialCode}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={styles.fieldNumber}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="00 123 45 67"
                  className={styles.inputNumber}
                />
              </div>
            </div>

            <div className={styles.field}>
              <input type="text" name="message" placeholder="Message" className={styles.input} />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}