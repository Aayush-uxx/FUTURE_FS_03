'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import api from '@/lib/api';
import styles from './page.module.css';

const SERVICE_LABELS: Record<string, string> = {
  haircut: 'Haircut',
  beard: 'Beard Styling',
  combo: 'Haircut + Beard Combo',
  shave: 'Hot Towel Shave',
};

interface Request {
  _id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  adminNote?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/request/my-requests');
      setBookings(response.data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.delete(`/request/${id}`);
      fetchBookings();
    } catch (error) {
      alert('Cannot cancel this booking');
    }
  };

  const handleEdit = (booking: Request) => {
    setEditingId(booking._id);
    setEditDate(booking.preferredDate.split('T')[0]);
    setEditTime(booking.preferredTime);
  };

  const handleUpdate = async (id: string) => {
    try {
      await api.put(`/request/${id}`, {
        preferredDate: editDate,
        preferredTime: editTime,
      });
      setEditingId(null);
      fetchBookings();
    } catch (error) {
      alert('Failed to update booking');
    }
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: styles.statusPending },
      approved: { label: 'Approved ✓', className: styles.statusApproved },
      rejected: { label: 'Rejected ✗', className: styles.statusRejected },
      completed: { label: 'Completed ✓', className: styles.statusCompleted },
    };
    return map[status] || { label: status, className: '' };
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>My Bookings</h1>
            <p>Manage your appointments and check their status</p>
          </div>

          {bookings.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📅</span>
              <h3>No Bookings Yet</h3>
              <p>Book your first appointment at Precision Cuts</p>
              <a href="/book" className={styles.emptyBtn}>Book Now</a>
            </div>
          ) : (
            <div className={styles.list}>
              {bookings.map((booking) => {
                const status = getStatusBadge(booking.status);
                const isEditing = editingId === booking._id;

                return (
                  <div key={booking._id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <div className={styles.bookingInfo}>
                        <span className={styles.bookingDate}>
                          Booked on {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <span className={`${styles.statusBadge} ${status.className}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.servicesList}>
                        <span className={styles.serviceTag}>
                          {SERVICE_LABELS[booking.service] || booking.service}
                        </span>
                      </div>

                      <div className={styles.details}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Date</span>
                          {isEditing ? (
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className={styles.editInput}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          ) : (
                            <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                          )}
                        </div>

                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Time</span>
                          {isEditing ? (
                            <input
                              type="time"
                              value={editTime}
                              onChange={(e) => setEditTime(e.target.value)}
                              className={styles.editInput}
                            />
                          ) : (
                            <span>{booking.preferredTime}</span>
                          )}
                        </div>

                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Phone</span>
                          <span>{booking.userPhone}</span>
                        </div>

                        {booking.adminNote && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Admin Note</span>
                            <span className={styles.adminNote}>{booking.adminNote}</span>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className={styles.editActions}>
                          <button
                            onClick={() => handleUpdate(booking._id)}
                            className={styles.saveBtn}
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className={styles.cancelEditBtn}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className={styles.actions}>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleEdit(booking)}
                                className={styles.editBtn}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCancel(booking._id)}
                                className={styles.cancelBtn}
                              >
                                Cancel Booking
                              </button>
                            </>
                          )}
                          {booking.status === 'approved' && (
                            <span className={styles.approvedNote}>
                              ✓ Approved! Visit us at the scheduled time.
                            </span>
                          )}
                          {booking.status === 'rejected' && (
                            <span className={styles.rejectedNote}>
                              ✗ Rejected. Please contact us for more info.
                            </span>
                          )}
                          {booking.status === 'completed' && (
                            <span className={styles.completedNote}>
                              ✓ Completed. Thank you for visiting!
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
