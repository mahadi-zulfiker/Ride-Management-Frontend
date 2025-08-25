import type { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import RiderDashboard from '../../pages/rider/RiderDashboard';
import DriverDashboard from '../../pages/driver/DriverDashboard';
import AdminDashboard from '../../pages/admin/AdminDashboard';

interface RoleBasedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

const RoleBasedRoute = ({ allowedRoles, children }: RoleBasedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are allowed, check if user has permission
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // If children are provided, render them
  if (children) {
    return <>{children}</>;
  }

  // Route based on user role
  switch (user.role) {
    case 'rider':
      return (
        <Routes>
          <Route path="/" element={<RiderDashboard />} />
          <Route path="/*" element={<RiderDashboard />} />
        </Routes>
      );
    case 'driver':
      return (
        <Routes>
          <Route path="/" element={<DriverDashboard />} />
          <Route path="/*" element={<DriverDashboard />} />
        </Routes>
      );
    case 'admin':
      return (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/*" element={<AdminDashboard />} />
        </Routes>
      );
    default:
      return <Navigate to="/login" replace />;
  }
};

export default RoleBasedRoute;
