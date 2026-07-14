'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Header/header.module.css';

export interface NavLinkItem {
  label: string;
  href: string;
}

interface HeaderUIProps {
  navLinks: NavLinkItem[];
  phoneNumber: string;
  phoneHref: string;
  languageSwitcher: ReactNode;
}

export function HeaderUI({ navLinks, phoneNumber, phoneHref, languageSwitcher }: HeaderUIProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <Image src="/images/logo.png" alt="Sabah Towers" width={60} height={65} className={styles.logoImage} priority />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={phoneHref} className={styles.phone}>{phoneNumber}</a>
          {languageSwitcher}
          <button type="button" className={styles.burger} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((p) => !p)}>
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpenTop : ''}`} />
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpenHide : ''}`} />
            <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineOpenBottom : ''}`} />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}