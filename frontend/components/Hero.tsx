'use client';

import Link from 'next/link';
import styles from '@/styles/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>Est. 2015</div>
          <h1 className={styles.title}>
            <span className={styles.titleHighlight}>Precision</span> Cuts
          </h1>
          <p className={styles.subtitle}>
            Where Style Meets Precision — Downtown's Premium Barbershop Experience
          </p>
          <div className={styles.buttons}>
            <Link href="/book" className={styles.primaryBtn}>
              Book Now
            </Link>
            <Link href="/about" className={styles.secondaryBtn}>
              Learn More
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>5000+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9★</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}