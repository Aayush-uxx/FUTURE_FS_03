'use client';  // ← TEACHING: This makes it a Client Component (can use useState, useEffect)

import { useState } from 'react';
import Link from 'next/link';  // ← TEACHING: Next.js Link for navigation (no page refresh)

export default function HomePage() {
  // TEACHING: useState - React hook to manage data that changes
  const [showOffer, setShowOffer] = useState(true);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>✂️ Precision Cuts Barbershop</h1>
        <p className="subtitle">Downtown's Best Barber Since 2015</p>
        <p className="tagline">Fresh cuts • Hot towels • Classic vibes</p>
        
        {/* TEACHING: Link to booking page */}
        <Link href="/book" className="btn-primary">
          Book Appointment
        </Link>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <span className="icon">💈</span>
            <h3>Haircut</h3>
            <p>$25</p>
          </div>
          <div className="service-card">
            <span className="icon">🪒</span>
            <h3>Beard Trim</h3>
            <p>$15</p>
          </div>
          <div className="service-card">
            <span className="icon">✨</span>
            <h3>Haircut + Beard</h3>
            <p>$35</p>
          </div>
          <div className="service-card">
            <span className="icon">🚿</span>
            <h3>Hot Towel Shave</h3>
            <p>$20</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.123!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c6c5e0d%3A0xc9c5b5b5b5b5b5b5!2sDowntown!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>📞 <a href="tel:+1234567890">(123) 456-7890</a></p>
          <p>📧 precisioncuts@example.com</p>
          <p>⏰ Mon-Sat: 9am - 7pm | Sun: Closed</p>
          <p>📍 123 Main Street, Downtown</p>
        </div>
      </section>

      {/* TEACHING: Conditional rendering - show/hide based on state */}
      {showOffer && (
        <div className="offer-banner">
          <p>🎉 New customers get 10% off!</p>
          <button onClick={() => setShowOffer(false)}>✕</button>
        </div>
      )}
    </div>
  );
}