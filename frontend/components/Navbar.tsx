'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/book', label: 'Book' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✂️</span>
          <span className={styles.logoText}>Precision Cuts</span>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.authSection}>
          {user ? (
            <div className={styles.userDropdown}>
              <button
                className={styles.userButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={styles.userIcon}>👤</span>
                <span className={styles.userName}>{user.name}</span>
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {user.role === 'admin' ? (
                    <Link href="/admin" className={styles.dropdownItem}>
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link href="/dashboard" className={styles.dropdownItem}>
                      My Bookings
                    </Link>
                  )}
                  <button onClick={logout} className={styles.dropdownItemLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
          )}
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link href="/admin" className={styles.mobileNavLink}>Admin Dashboard</Link>
              ) : (
                <Link href="/dashboard" className={styles.mobileNavLink}>My Bookings</Link>
              )}
              <button onClick={logout} className={styles.mobileLogoutButton}>Logout</button>
            </>
          ) : (
            <Link href="/login" className={styles.mobileLoginButton}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}