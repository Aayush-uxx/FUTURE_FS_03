import Hero from '@/components/Hero';
import TrendingStyles from '@/components/TrendingStyles';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Hero />
      <TrendingStyles />
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h2>Ready for Your Transformation?</h2>
          <p>Book your appointment today and experience the precision.</p>
          <a href="/book" className={styles.ctaButton}>Book Now</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}