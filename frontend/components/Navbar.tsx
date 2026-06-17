'use client';  // ← TEACHING: Client Component because we use useState

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  // TEACHING: State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TEACHING: State for user email (for dashboard)
  const [userEmail, setUserEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      // TEACHING: Store email in localStorage (persists across pages)
      localStorage.setItem('userEmail', userEmail);
      alert(`✅ Email set: ${userEmail}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-brand">
            ✂️ Precision Cuts
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/book">Book</Link>
            <Link href="/dashboard">My Requests</Link>
            <Link href="/admin" className="admin-link">Admin</Link>
          </div>

          {/* Email Input (Desktop) */}
          <form onSubmit={handleEmailSubmit} className="nav-email">
            <input
              type="email"
              placeholder="Enter email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button type="submit">Set</button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/book" onClick={() => setIsMenuOpen(false)}>Book</Link>
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>My Requests</Link>
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          </div>
        )}
      </div>
    </nav>
  );
}