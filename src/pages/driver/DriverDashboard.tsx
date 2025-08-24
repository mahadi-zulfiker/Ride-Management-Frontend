import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Car, User, Clock, MapPin, CreditCard, Settings,
  LogOut, Menu, X, Plus, History, Star, Phone, Wifi, WifiOff
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

// Dashboard Components
import AvailabilityControl from './components/AvailabilityControl';
import IncomingRequests from './components/IncomingRequests';
import ActiveRideManagement from './components/ActiveRideManagement';
import EarningsDashboard from './components/EarningsDashboard';
import RideHistory from './components/RideHistory';
import Profile from './components/Profile';

const DriverDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  const navigation = [
    { name: 'Availability', href: '/driver', icon: Wifi, current: location.pathname === '/driver' },
    { name: 'Incoming Requests', href: '/driver/requests', icon: Phone, current: location.pathname === '/driver/requests' },
    { name: 'Active Ride', href: '/driver/active', icon: Car, current: location.pathname === '/driver/active' },
    { name: 'Earnings', href: '/driver/earnings', icon: CreditCard, current: location.pathname === '/driver/earnings' },
    { name: 'Ride History', href: '/driver/history', icon: History, current: location.pathname === '/driver/history' },
    { name: 'Profile', href: '/driver/profile', icon: User, current: location.pathname === '/driver/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">RideShare</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-primary-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">RideShare</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md w-full"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Online/Offline Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${user?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">
                  {user?.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* User menu */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Driver</p>
                </div>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<AvailabilityControl />} />
              <Route path="/requests" element={<IncomingRequests />} />
              <Route path="/active" element={<ActiveRideManagement />} />
              <Route path="/earnings" element={<EarningsDashboard />} />
              <Route path="/history" element={<RideHistory />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
