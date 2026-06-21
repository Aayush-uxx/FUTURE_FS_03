'use client';

import Link from 'next/link';
import styles from '@/styles/TrendingStyles.module.css';

export interface StyleItem {
  id: number;
  name: string;
  category: string;
  serviceId: 'haircut' | 'beard' | 'combo' | 'shave';
  price: number;
  duration: number;
  image: string;
  description: string;
}

export const STYLES_DATA: StyleItem[] = [
  {
    id: 1,
    name: 'Classic Pompadour',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/14564841/pexels-photo-14564841.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'The timeless gentleman\'s cut with a modern twist',
  },
  {
    id: 2,
    name: 'Textured Crop',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/2033287/pexels-photo-2033287.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Clean, modern, and effortlessly stylish',
  },
  {
    id: 3,
    name: 'Full Beard',
    category: 'Beard',
    serviceId: 'beard',
    price: 200,
    duration: 20,
    image: 'https://images.pexels.com/photos/7397453/pexels-photo-7397453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'A bold statement of masculinity and style',
  },
  {
    id: 4,
    name: 'Fade & Beard Combo',
    category: 'Combo',
    serviceId: 'combo',
    price: 450,
    duration: 45,
    image: 'https://images.pexels.com/photos/2033302/pexels-photo-2033302.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'The perfect blend of precision and artistry',
  },
  {
    id: 5,
    name: 'Slicked Back',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/27972377/pexels-photo-27972377.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Refined elegance for the modern gentleman',
  },
  {
    id: 6,
    name: 'Stubble & Shape',
    category: 'Beard',
    serviceId: 'beard',
    price: 200,
    duration: 20,
    image: 'https://images.pexels.com/photos/31420959/pexels-photo-31420959.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'The perfect balance of rugged and refined',
  },
  {
    id: 7,
    name: 'Undercut',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/3998410/pexels-photo-3998410.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Sharp sides with volume on top — a modern classic',
  },
  {
    id: 8,
    name: 'Mid Fade',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/3793013/pexels-photo-3793013.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Gradual fade that transitions seamlessly',
  },
  {
    id: 9,
    name: 'Hot Towel Shave',
    category: 'Shave',
    serviceId: 'shave',
    price: 250,
    duration: 25,
    image: 'https://images.pexels.com/photos/3214788/pexels-photo-3214788.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'A classic barbershop experience, revived',
  },
  {
    id: 10,
    name: 'French Crop',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/1813346/pexels-photo-1813346.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Short textured top with clean edges',
  },
  {
    id: 11,
    name: 'Goatee Style',
    category: 'Beard',
    serviceId: 'beard',
    price: 200,
    duration: 20,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Precision-trimmed goatee for a sharp look',
  },
  {
    id: 12,
    name: 'Skin Fade',
    category: 'Haircut',
    serviceId: 'haircut',
    price: 300,
    duration: 30,
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Ultra-clean fade down to the skin',
  },
];

export default function TrendingStyles() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Trending Now</span>
          <h2 className={styles.title}>Popular Styles</h2>
          <p className={styles.subtitle}>
            Discover the most requested styles by our clients
          </p>
        </div>
        <div className={styles.grid}>
          {STYLES_DATA.map((style) => (
            <div key={style.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={style.image} alt={style.name} className={styles.image} />
                <span className={styles.category}>{style.category}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.styleName}>{style.name}</h3>
                <p className={styles.styleDescription}>{style.description}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.price}>Rs. {style.price}</span>
                  <span className={styles.duration}>{style.duration} min</span>
                </div>
                <Link
                  href={`/book?style=${style.id}`}
                  className={styles.bookBtn}
                >
                  Book This Style
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
