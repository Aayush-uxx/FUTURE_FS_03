'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { STYLES_DATA } from '@/components/TrendingStyles';
import styles from './page.module.css';

const SERVICE_INFO: Record<string, { label: string; price: number; duration: number }> = {
  haircut: { label: 'Haircut', price: 300, duration: 30 },
  beard: { label: 'Beard Styling', price: 200, duration: 20 },
  combo: { label: 'Haircut + Beard Combo', price: 450, duration: 45 },
  shave: { label: 'Hot Towel Shave', price: 250, duration: 25 },
};

function BookPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedStyleId, setSelectedStyleId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Pre-select style from URL param (?style=1)
  useEffect(() => {
    const styleParam = searchParams.get('style');
    if (styleParam) {
      const styleId = parseInt(styleParam, 10);
      const found = STYLES_DATA.find((s) => s.id === styleId);
      if (found) {
        setSelectedStyleId(found.id);
        setSelectedService(found.serviceId);
        setTimeout(() => {
          document.getElementById('booking-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [searchParams]);

  const handleSelectStyle = (styleId: number, serviceId: string) => {
    setSelectedStyleId(styleId);
    setSelectedService(serviceId);
  };

  const categories = ['All', 'Haircut', 'Beard', 'Combo', 'Shave'];
  const filteredStyles =
    activeCategory === 'All'
      ? STYLES_DATA
      : STYLES_DATA.filter((s) => s.category === activeCategory);

  const selectedStyleItem = STYLES_DATA.find((s) => s.id === selectedStyleId);
  const serviceInfo = selectedService ? SERVICE_INFO[selectedService] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push('/login');
      return;
    }
    if (!selectedService) {
      setMessage('Please select a style first');
      return;
    }
    if (!preferredDate || !preferredTime) {
      setMessage('Please select date and time');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      await api.post('/request', {
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        service: selectedService,
        preferredDate,
        preferredTime,
      });
      setMessage('✅ Booking submitted! Check your dashboard for status.');
      setSelectedStyleId(null);
      setSelectedService('');
      setPreferredDate('');
      setPreferredTime('');
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Booking failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Book Your Style</h1>
          <p>Choose a style you like, then pick your preferred date and time</p>
        </div>

        {message && (
          <div className={message.includes('✅') ? styles.success : styles.error}>
            {message}
          </div>
        )}

        <div className={styles.layout}>
          {/* Style Gallery */}
          <div className={styles.gallerySection}>
            <div className={styles.galleryHeader}>
              <h2>Choose Your Style</h2>
              <div className={styles.categoryTabs}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.catTab} ${activeCategory === cat ? styles.catTabActive : ''}`}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.styleGrid}>
              {filteredStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    className={`${styles.styleCard} ${isSelected ? styles.styleCardSelected : ''}`}
                    onClick={() => handleSelectStyle(style.id, style.serviceId)}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectStyle(style.id, style.serviceId)}
                  >
                    <div className={styles.styleImageWrapper}>
                      <img src={style.image} alt={style.name} className={styles.styleImage} />
                      <span className={styles.styleCategoryBadge}>{style.category}</span>
                      {isSelected && (
                        <div className={styles.selectedOverlay}>
                          <span className={styles.checkmark}>✓</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.styleInfo}>
                      <h4 className={styles.styleName}>{style.name}</h4>
                      <p className={styles.styleDesc}>{style.description}</p>
                      <div className={styles.styleMeta}>
                        <span className={styles.stylePrice}>Rs. {style.price}</span>
                        <span className={styles.styleDuration}>{style.duration} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Panel */}
          <div id="booking-panel" className={styles.bookingPanel}>
            <h2>Booking Details</h2>

            {selectedStyleItem ? (
              <div className={styles.selectedPreview}>
                <img src={selectedStyleItem.image} alt={selectedStyleItem.name} className={styles.previewImg} />
                <div>
                  <p className={styles.previewName}>{selectedStyleItem.name}</p>
                  <p className={styles.previewService}>{serviceInfo?.label}</p>
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <span>👆</span>
                <p>Select a style from the gallery</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.bookForm}>
              <div className={styles.field}>
                <label>Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Preferred Time</label>
                <input
                  type="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                />
              </div>

              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span>Style</span>
                  <span>{selectedStyleItem?.name || '—'}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Service</span>
                  <span>{serviceInfo?.label || '—'}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Duration</span>
                  <span>{serviceInfo ? `${serviceInfo.duration} min` : '—'}</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.total}`}>
                  <span>Total Price</span>
                  <span>Rs. {serviceInfo?.price ?? 0}</span>
                </div>
                <p className={styles.note}>* Pay at the shop. Price in NPR</p>
              </div>

              {!user ? (
                <div className={styles.loginPrompt}>
                  <p>Please <a href="/login">login</a> to book your appointment</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting || !selectedService}
                >
                  {submitting ? 'Booking...' : 'Book Appointment'}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 40, height: 40, border: '4px solid #e8e0d8', borderTopColor: '#7b7ee8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>}>
      <BookPageContent />
    </Suspense>
  );
}
