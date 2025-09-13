import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const user = useSelector(selectCurrentUser);
    
    // If no user is authenticated, redirect to login
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    // Check for blocked/suspended users
    if (user.isBlocked) {
      return <Navigate to="/account-status" replace />;
    }

    // Check for unapproved drivers
    if (user.role === 'driver' && !user.isApproved) {
      return <Navigate to="/account-status" replace />;
    }

    // If a specific role is required and user doesn't have it, redirect to unauthorized
    if (requiredRole && requiredRole !== user.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
