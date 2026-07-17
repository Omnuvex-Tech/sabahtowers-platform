"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/Contact/contact.module.css';
import { motion, Variants } from 'framer-motion';

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
  { iso: 'CHN', label: 'China', dialCode: '+86' },
  { iso: 'DEU', label: 'Germany', dialCode: '+49' },
  { iso: 'ENG', label: 'United Kingdom', dialCode: '+44' },
  { iso: 'ESP', label: 'Spain', dialCode: '+34' },
  { iso: 'FRA', label: 'France', dialCode: '+33' },
  { iso: 'GEO', label: 'Georgia', dialCode: '+995' },
  { iso: 'IRN', label: 'Iran', dialCode: '+98' },
  { iso: 'ISR', label: 'Israel', dialCode: '+972' },
  { iso: 'ITA', label: 'Italy', dialCode: '+39' },
  { iso: 'KAZ', label: 'Kazakhstan', dialCode: '+7' },
  { iso: 'NLD', label: 'Netherlands', dialCode: '+31' },
  { iso: 'QAT', label: 'Qatar', dialCode: '+974' },
  { iso: 'RUS', label: 'Russia', dialCode: '+7' },
  { iso: 'SAU', label: 'Saudi Arabia', dialCode: '+966' },
  { iso: 'TUR', label: 'Turkey', dialCode: '+90' },
  { iso: 'UAE', label: 'United Arab Emirates', dialCode: '+971' },
  { iso: 'UKR', label: 'Ukraine', dialCode: '+380' },
  { iso: 'USA', label: 'United States', dialCode: '+1' },
  { iso: 'UZB', label: 'Uzbekistan', dialCode: '+998' },
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
  phoneMinError: string;
  requiredError: string;
}

const ultraSmoothEase = [0.25, 1, 0.2, 1] as const;

const mainSectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: ultraSmoothEase },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.6,
      ease: ultraSmoothEase,
      delay: 0.15 + index * 0.25,
    },
  }),
};

const MIN_PHONE_DIGITS = 5;
const MAX_PHONE_DIGITS = 15;

function countDigits(value: string): number {
  return (value.match(/\d/g) || []).length;
}

function sanitizePhoneInput(value: string): string {
  const cleaned = value.replace(/[^0-9-]/g, '');
  const digitCount = countDigits(cleaned);
  if (digitCount <= MAX_PHONE_DIGITS) return cleaned;
  let result = '';
  let digits = 0;
  for (const char of cleaned) {
    if (/\d/.test(char)) {
      if (digits >= MAX_PHONE_DIGITS) continue;
      digits++;
    }
    result += char;
  }
  return result;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

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
  phoneMinError,
  requiredError,
}: ContactUIProps) {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]!);
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitError, setSubmitError] = useState('');
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    if (nameError) setNameError('');
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameValue(e.target.value);
    if (surnameError) setSurnameError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = sanitizePhoneInput(e.target.value);
    setPhoneValue(cleaned);
    if (phoneError) setPhoneError('');
  };

  const handlePhoneBlur = () => {
    if (phoneValue.length === 0) {
      setPhoneError('');
      return;
    }
    if (countDigits(phoneValue) < MIN_PHONE_DIGITS) {
      setPhoneError(phoneMinError);
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!nameValue.trim()) {
      setNameError(requiredError);
      hasError = true;
    }
    if (!surnameValue.trim()) {
      setSurnameError(requiredError);
      hasError = true;
    }
    if (phoneValue.trim().length === 0) {
      setPhoneError(requiredError);
      hasError = true;
    } else if (countDigits(phoneValue) < MIN_PHONE_DIGITS) {
      setPhoneError(phoneMinError);
      hasError = true;
    }

    if (hasError) return;

    setSubmitStatus('loading');
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameValue,
          surname: surnameValue,
          phone: `${selectedCountry.dialCode}${phoneValue}`,
          message: messageValue,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitStatus('error');
        setSubmitError(data.message || 'Xəta baş verdi, yenidən cəhd edin');
        return;
      }

      setSubmitStatus('success');
      setNameValue('');
      setSurnameValue('');
      setPhoneValue('');
      setMessageValue('');
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError('Şəbəkə xətası, yenidən cəhd edin');
    }
  };

  return (
    <motion.section
      id="contact"
      className={styles.contact}
      variants={mainSectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Image
        src={backgroundImageSrc}
        alt={backgroundImageAlt}
        fill
        sizes="100vw"
        className={styles.bgImage}
      />
      <div className={styles.wrapper}>
        <motion.div
          className={styles.infoCard}
          variants={cardVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
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
        </motion.div>

        <motion.div
          className={styles.formCard}
          variants={cardVariants}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className={styles.formTitle}>{formTitle}</h2>

          {submitStatus === 'success' ? (
            <p className={styles.successText}>
              Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlanılacaq.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={`${styles.input} ${nameError ? styles.inputError : ''}`}
                    value={nameValue}
                    onChange={handleNameChange}
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? 'name-error' : undefined}
                  />
                  {nameError && (
                    <span id="name-error" className={styles.errorText}>
                      {nameError}
                    </span>
                  )}
                </div>
                <div className={styles.field}>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    className={`${styles.input} ${surnameError ? styles.inputError : ''}`}
                    value={surnameValue}
                    onChange={handleSurnameChange}
                    aria-invalid={!!surnameError}
                    aria-describedby={surnameError ? 'surname-error' : undefined}
                  />
                  {surnameError && (
                    <span id="surname-error" className={styles.errorText}>
                      {surnameError}
                    </span>
                  )}
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
                            className={`${styles.codeOption} ${country.iso === selectedCountry.iso ? styles.codeOptionActive : ''
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
                    className={`${styles.inputNumber} ${phoneError ? styles.inputError : ''}`}
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    inputMode="numeric"
                    aria-invalid={!!phoneError}
                    aria-describedby={phoneError ? 'phone-error' : undefined}
                  />
                  {phoneError && (
                    <span id="phone-error" className={styles.errorText}>
                      {phoneError}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.field}>
                <input
                  type="text"
                  name="message"
                  placeholder="Message"
                  className={styles.input}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                />
              </div>

              {submitStatus === 'error' && (
                <p className={styles.submitErrorText}>{submitError}</p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? '...' : submitLabel}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}