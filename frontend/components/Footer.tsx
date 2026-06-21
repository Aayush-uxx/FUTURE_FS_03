'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>✂️</span>
              <span>Precision Cuts</span>
            </div>
            <p className={styles.description}>
              Where style meets precision. Experience the finest barbershop services in downtown Kathmandu.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}><FaFacebook /></a>
              <a href="#" className={styles.socialLink}><FaInstagram /></a>
              <a href="#" className={styles.socialLink}><FaYoutube /></a>
            </div>
          </div>

          <div className={styles.links}>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/book">Book Now</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.services}>
            <h4>Services</h4>
            <Link href="/book">Haircuts</Link>
            <Link href="/book">Beard Styling</Link>
            <Link href="/book">Hot Towel Shave</Link>
            <Link href="/book">Facial Massage</Link>
          </div>

          <div className={styles.contact}>
            <h4>Contact</h4>
            <p><FaMapMarkerAlt /> Thamel, Kathmandu, Nepal</p>
            <p><FaPhone /> <a href="tel:+9779801234567">+977 980-1234567</a></p>
            <p><FaClock /> Mon-Sat: 9am - 7pm</p>
            <p className={styles.note}>*Nepal Time (NPT)</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 Precision Cuts. All rights reserved. Made with ❤️ in Nepal</p>
        </div>
      </div>
    </footer>
  );
}