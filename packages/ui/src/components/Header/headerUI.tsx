'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Header/header.module.css';
import { handleAnchorClick } from '../../lib/smooth-scroll';

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
  const [isAnimating, setIsAnimating] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    setIsAnimating(true);
  };

  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 1100);
  };

  useEffect(() => {
    const img1 = new window.Image();
    img1.src = '/images/sidebar.png';
    const img2 = new window.Image();
    img2.src = '/images/whitelogo.png';
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();
    handleAnchorClick(e, href);
  };

  return (
    <header className={`${styles.header} ${isAnimating ? styles.headerMenuOpen : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/images/logo.webp"
            alt="Sabah Towers"
            width={48}
            height={55}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={phoneHref} className={styles.phone}>
            {phoneNumber}
          </a>
          <span className={styles.languageSwitcherWrap}>{languageSwitcher}</span>
          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>
      <div
        className={`${styles.sidebarBg} ${isAnimating ? styles.sidebarBgOpen : ''}`}
        style={{ backgroundImage: "url('/images/sidebar.png')" }}
      />
      <div
        className={`${styles.backdrop} ${isAnimating ? styles.backdropOpen : ''}`}
        onClick={closeMenu}
      />
      <div className={`${styles.drawer} ${isAnimating ? styles.drawerOpen : ''} ${isMenuOpen ? styles.drawerActive : ''}`}>
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerLogo} onClick={closeMenu}>
            <Image
              src="/images/whitelogo.png"
              alt="Sabah Towers"
              width={150}
              height={95}
              className={styles.drawerLogoImage}
              priority
            />
          </Link>

          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <ul className={styles.drawerNavList}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.drawerItem}>
              <a
                href={link.href}
                className={styles.drawerNavLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={`${styles.drawerLangRow} ${styles.drawerItem}`}>
          {languageSwitcher}
        </div>
        <div className={styles.drawerItem}>
          <a href={phoneHref} className={styles.drawerPhone}>
            {phoneNumber}
          </a>
        </div>
        <div className={`${styles.drawerSocials} ${styles.drawerItem}`}>
          <a href="https://www.instagram.com/sabahtowers.az?igsh=MTNzYTZreXNmZHA4Mg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Image src="/images/whiteig.png" alt="Instagram" width={24} height={24} />
          </a>
          <a href="https://www.tiktok.com/@sabahtowers?_r=1&_t=ZS-98GqECiYeFU" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Image src="/images/whitett.png" alt="TikTok" width={24} height={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            <Image src="/images/whitelk.png" alt="LinkedIn" width={24} height={24} />
          </a>
        </div>
      </div>
    </header>
  );
}