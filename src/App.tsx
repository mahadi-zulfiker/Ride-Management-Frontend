import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from './hooks/redux';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AccountStatusPage from './pages/auth/AccountStatusPage';

// Protected Pages
import RiderDashboard from './pages/rider/RiderDashboard';
import DriverDashboard from './pages/driver/DriverDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import TestAuth from './components/TestAuth';
import TestRegister from './components/TestRegister';
import TestPage from './components/TestPage';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
            <Route path="/account-status" element={<AccountStatusPage />} />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/test-register" element={<TestRegister />} />
            <Route path="/test" element={<TestPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute />
                </ProtectedRoute>
              }
            />

            {/* Rider Routes */}
            <Route
              path="/rider/*"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['rider']} />
                </ProtectedRoute>
              }
            />

            {/* Driver Routes */}
            <Route
              path="/driver/*"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['driver']} />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <RoleBasedRoute allowedRoles={['admin']} />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
