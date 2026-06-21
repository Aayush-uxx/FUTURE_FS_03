'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import styles from './page.module.css';
import { Service } from '@/types';

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

const SERVICE_LABELS: Record<string, string> = {
  haircut: 'Haircut',
  beard: 'Beard Styling',
  combo: 'Haircut + Beard Combo',
  shave: 'Hot Towel Shave',
  massage: 'Facial Massage',
  color: 'Hair Color',
  style: 'Hair Style',
  other: 'Other',
};

const CATEGORIES = [
  { id: 'haircut', label: 'Haircut' },
  { id: 'beard', label: 'Beard' },
  { id: 'massage', label: 'Facial Massage' },
  { id: 'color', label: 'Hair Color' },
  { id: 'style', label: 'Hair Style' },
  { id: 'other', label: 'Other' },
];

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookings' | 'services'>('bookings');

  // Bookings state
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'haircut',
    price: 0,
    duration: 30,
    image: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/');
        return;
      }
      fetchData();
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    try {
      const [requestsRes, servicesRes] = await Promise.all([
        api.get('/request/admin/all'),
        api.get('/services'),
      ]);
      setRequests(requestsRes.data.data || []);
      setServices(servicesRes.data.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Booking handlers
  const handleApprove = async (id: string) => {
    try {
      await api.put(`/request/admin/${id}/status`, {
        status: 'approved',
        adminNote: adminNote || 'Approved by admin',
      });
      setAdminNote('');
      setActiveRequest(null);
      fetchData();
    } catch (error) {
      alert('Failed to approve booking');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.put(`/request/admin/${id}/status`, {
        status: 'rejected',
        adminNote: adminNote || 'Rejected by admin',
      });
      setAdminNote('');
      setActiveRequest(null);
      fetchData();
    } catch (error) {
      alert('Failed to reject booking');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await api.put(`/request/admin/${id}/status`, {
        status: 'completed',
        adminNote: 'Marked as completed by admin',
      });
      fetchData();
    } catch (error) {
      alert('Failed to mark as completed');
    }
  };

  // Service handlers
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, serviceForm);
      } else {
        await api.post('/services', serviceForm);
      }
      setIsServiceModalOpen(false);
      setEditingService(null);
      setServiceForm({ name: '', category: 'haircut', price: 0, duration: 30, image: '', description: '' });
      fetchData();
    } catch (error) {
      alert('Failed to save service');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchData();
    } catch (error) {
      alert('Failed to delete service');
    }
  };

  const openEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      image: service.image,
      description: service.description,
    });
    setIsServiceModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: styles.statusPending },
      approved: { label: 'Approved', className: styles.statusApproved },
      rejected: { label: 'Rejected', className: styles.statusRejected },
      completed: { label: 'Completed', className: styles.statusCompleted },
    };
    return map[status] || { label: status, className: '' };
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  };

  if (authLoading || loading) {
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
            <h1>Admin Dashboard</h1>
            <div className={styles.tabNav}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'bookings' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                Bookings
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'services' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('services')}
              >
                Manage Services
              </button>
            </div>
          </div>

          {activeTab === 'bookings' ? (
            <>
              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>{stats.total}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
                <div className={`${styles.statCard} ${styles.statPending}`}>
                  <span className={styles.statNumber}>{stats.pending}</span>
                  <span className={styles.statLabel}>Pending</span>
                </div>
                <div className={`${styles.statCard} ${styles.statApproved}`}>
                  <span className={styles.statNumber}>{stats.approved}</span>
                  <span className={styles.statLabel}>Approved</span>
                </div>
                <div className={`${styles.statCard} ${styles.statCompleted}`}>
                  <span className={styles.statNumber}>{stats.completed}</span>
                  <span className={styles.statLabel}>Completed</span>
                </div>
              </div>

              <div className={styles.list}>
                {requests.length === 0 ? (
                  <div className={styles.empty}>
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  requests.map((req) => (
                    <div key={req._id} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <div className={styles.userInfo}>
                          <h3>{req.userName}</h3>
                          <span className={styles.userEmail}>{req.userEmail}</span>
                          <span className={styles.userPhone}>{req.userPhone}</span>
                        </div>
                        <span className={`${styles.statusBadge} ${getStatusBadge(req.status).className}`}>
                          {getStatusBadge(req.status).label}
                        </span>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.bookingDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.label}>Service</span>
                            <span className={styles.serviceTag}>
                              {SERVICE_LABELS[req.service] || req.service}
                            </span>
                          </div>
                          <div className={styles.detailGrid}>
                            <div>
                              <span className={styles.label}>Date</span>
                              <span>{new Date(req.preferredDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className={styles.label}>Time</span>
                              <span>{req.preferredTime}</span>
                            </div>
                            <div>
                              <span className={styles.label}>Booked On</span>
                              <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {req.adminNote && (
                            <div className={styles.adminNote}>
                              <span className={styles.label}>Admin Note</span>
                              <span>{req.adminNote}</span>
                            </div>
                          )}
                        </div>

                        {req.status === 'pending' && (
                          <div className={styles.adminActions}>
                            {activeRequest === req._id ? (
                              <div className={styles.actionForm}>
                                <input
                                  type="text"
                                  placeholder="Add a note (optional)"
                                  value={adminNote}
                                  onChange={(e) => setAdminNote(e.target.value)}
                                  className={styles.noteInput}
                                />
                                <div className={styles.actionButtons}>
                                  <button onClick={() => handleApprove(req._id)} className={styles.approveBtn}>Approve</button>
                                  <button onClick={() => handleReject(req._id)} className={styles.rejectBtn}>Reject</button>
                                  <button onClick={() => setActiveRequest(null)} className={styles.cancelBtn}>Cancel</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setActiveRequest(req._id)} className={styles.manageBtn}>Manage</button>
                            )}
                          </div>
                        )}

                        {req.status === 'approved' && (
                          <button onClick={() => handleComplete(req._id)} className={styles.completeBtn}>Mark Completed</button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className={styles.servicesSection}>
              <div className={styles.sectionHeader}>
                <h2>Available Services ({services.length})</h2>
                <button
                  className={styles.addServiceBtn}
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({ name: '', category: 'haircut', price: 0, duration: 30, image: '', description: '' });
                    setIsServiceModalOpen(true);
                  }}
                >
                  + Add New Service
                </button>
              </div>

              <div className={styles.serviceList}>
                {services.map((service) => (
                  <div key={service._id} className={styles.serviceCard}>
                    <img src={service.image} alt={service.name} className={styles.smallServiceImg} />
                    <div className={styles.serviceInfo}>
                      <h4>{service.name}</h4>
                      <span className={styles.categoryBadge}>{SERVICE_LABELS[service.category]}</span>
                      <p className={styles.servicePrice}>Rs. {service.price} &bull; {service.duration} min</p>
                    </div>
                    <div className={styles.serviceActions}>
                      <button onClick={() => openEditService(service)} className={styles.editIconBtn}>&#9998;</button>
                      <button onClick={() => handleDeleteService(service._id)} className={styles.deleteIconBtn}>&#128465;</button>
                    </div>
                  </div>
                ))}
              </div>

              {isServiceModalOpen && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modal}>
                    <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                    <form onSubmit={handleServiceSubmit} className={styles.serviceForm}>
                      <div className={styles.formGroup}>
                        <label>Service Name</label>
                        <input
                          type="text"
                          required
                          value={serviceForm.name}
                          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Category</label>
                        <select
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        >
                          {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                        </select>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label>Price (Rs.)</label>
                          <input
                            type="number"
                            required
                            value={serviceForm.price}
                            onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Duration (min)</label>
                          <input
                            type="number"
                            required
                            value={serviceForm.duration}
                            onChange={(e) => setServiceForm({ ...serviceForm, duration: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Image URL</label>
                        <input
                          type="url"
                          required
                          value={serviceForm.image}
                          onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                          required
                          rows={3}
                          value={serviceForm.description}
                          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        />
                      </div>
                      <div className={styles.modalActions}>
                        <button type="submit" className={styles.submitBtn}>
                          {editingService ? 'Update Service' : 'Create Service'}
                        </button>
                        <button type="button" onClick={() => setIsServiceModalOpen(false)} className={styles.cancelBtn}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
