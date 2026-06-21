import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope } from 'react-icons/fa';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <h2>Get in Touch</h2>
            <p className={styles.description}>
              Visit us at our shop or reach out through any of the channels below.
              We're always happy to help with your grooming needs.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <span className={styles.icon}><FaMapMarkerAlt /></span>
                <div>
                  <h4>Location</h4>
                  <p>Thamel, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.icon}><FaPhone /></span>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+9779801234567">+977 980-1234567</a></p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.icon}><FaEnvelope /></span>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:info@precisioncuts.com">info@precisioncuts.com</a></p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <span className={styles.icon}><FaClock /></span>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon-Sat: 9:00 AM - 7:00 PM</p>
                  <p className={styles.timezone}>*Nepal Time (NPT)</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456789012!2d85.32345678901234!3d27.72345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198d123456789%3A0x123456789abcdef!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className={styles.mapOverlay}>
              <div className={styles.pin}>📍</div>
              <div className={styles.pinLabel}>Precision Cuts</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}