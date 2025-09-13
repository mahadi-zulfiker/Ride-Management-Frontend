import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "driver" | "admin" | "rider";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  emergencyContact?: string;
  role: "admin" | "driver" | "rider";
  isBlocked: boolean;
  vehicleInfo?: {
    type: string;
    licensePlate: string;
  };
  isApproved: boolean;
  isOnline: boolean;
  availability?: "Online" | "Offline";
  createdAt?: string;
  updatedAt?: string;
}

// Ride type
export interface IRide {
  _id: string;
  rider: {
    _id: string;
    name: string;
    email: string;
  };
  driver?: {
    _id: string;
    name?: string;
    email?: string;
  };
  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "canceled";
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  destinationLocation: {
    latitude: number;
    longitude: number;
  };
  fare: number;
  distance?: number;
  paymentMethod?: "cash" | "card" | "mobile";
  createdAt: string;
  updatedAt: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
  }>;
}

export interface TResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    
}

export  type RideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "canceled";

export const allowedTransitions: Record<RideStatus, RideStatus[]> = {
  requested: ["accepted"],
  accepted: ["picked_up", "canceled"],
  picked_up: ["in_transit"],
  in_transit: ["completed"],
  completed: [],
  canceled: [],
};