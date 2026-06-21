import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1>About Precision Cuts</h1>
          <p>Where craftsmanship meets style</p>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.content}>
            <h2>Our Story</h2>
            <p>
              Founded in 2015, Precision Cuts has been the premier barbershop in downtown Kathmandu.
              What started as a small two-chair shop has grown into a trusted destination for men
              who value quality grooming and timeless style.
            </p>
            <p>
              Our team of skilled barbers combines traditional techniques with modern trends to
              deliver the perfect cut every time. We believe that a great haircut is more than just
              a service — it's an experience that boosts confidence and makes you feel your best.
            </p>
          </div>
          <div className={styles.image}>
            <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop" alt="Barbershop interior" />
          </div>
        </section>

        <section className={styles.values}>
          <h2>Our Values</h2>
          <div className={styles.grid}>
            <div className={styles.valueCard}>
              <span className={styles.icon}>✂️</span>
              <h3>Precision</h3>
              <p>Every cut is executed with meticulous attention to detail</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.icon}>🤝</span>
              <h3>Trust</h3>
              <p>Building lasting relationships with our clients</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.icon}>🔥</span>
              <h3>Passion</h3>
              <p>Love for the craft that shows in every service</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.icon}>🌟</span>
              <h3>Excellence</h3>
              <p>Never settling for anything less than the best</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h2>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" alt="Barber" />
              <h4>Rajesh Shrestha</h4>
              <p>Master Barber</p>
              <span className={styles.experience}>12 years experience</span>
            </div>
            <div className={styles.teamCard}>
              <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&h=300&fit=crop" alt="Barber" />
              <h4>Sujan Tamang</h4>
              <p>Senior Barber</p>
              <span className={styles.experience}>8 years experience</span>
            </div>
            <div className={styles.teamCard}>
              <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop" alt="Barber" />
              <h4>Prakash Gurung</h4>
              <p>Barber & Stylist</p>
              <span className={styles.experience}>6 years experience</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}