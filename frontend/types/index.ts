export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    phone: string;
  }
  
  export interface Service {
    _id: string;
    name: string;
    category: 'haircut' | 'beard' | 'massage' | 'color' | 'style' | 'other';
    price: number;
    duration: number;
    image: string;
    description: string;
  }
  
  export interface Booking {
    _id: string;
    userId: string | { name: string; email: string; phone: string };
    services: Service[];
    totalPrice: number;
    totalDuration: number;
    preferredDate: string;
    preferredTime: string;
    status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
    adminNote?: string;
    approvedTime?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
  }