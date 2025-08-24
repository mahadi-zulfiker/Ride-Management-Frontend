export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver' | 'admin';
  phone?: string;
  emergencyContact?: string;
  vehicleInfo?: {
    type: string;
    licensePlate: string;
  };
  isApproved?: boolean;
  isOnline?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ride {
  _id: string;
  rider: User;
  driver?: User;
  pickupLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  destinationLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  status: 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';
  fare: number;
  distance?: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  createdAt: string;
  updatedAt: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
  }>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'rider' | 'driver';
  phone?: string;
  emergencyContact?: string;
  vehicleInfo?: {
    type: string;
    licensePlate: string;
  };
}

export interface RideRequest {
  pickupLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  destinationLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  paymentMethod: 'cash' | 'card' | 'mobile';
}

export interface AnalyticsData {
  totalRides: number;
  totalRevenue: number;
  activeDrivers: number;
  totalUsers: number;
  ridesByStatus: Record<string, number>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
  }>;
  ridesByDay: Array<{
    day: string;
    rides: number;
  }>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
