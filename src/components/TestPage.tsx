import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-4">
            🚖 Ride Management System
          </h1>
          <p className="text-lg text-gray-600">
            Frontend Application Test Page
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Authentication */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔐 Authentication Tests</h2>
            <div className="space-y-3">
              <Link
                to="/test-register"
                className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
              >
                Test Registration
              </Link>
              <Link
                to="/test-auth"
                className="block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center"
              >
                Test Login
              </Link>
            </div>
          </div>

          {/* Public Pages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🌐 Public Pages</h2>
            <div className="space-y-3">
              <Link
                to="/"
                className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-center"
              >
                Landing Page
              </Link>
              <Link
                to="/about"
                className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-center"
              >
                About Page
              </Link>
              <Link
                to="/features"
                className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-center"
              >
                Features Page
              </Link>
              <Link
                to="/contact"
                className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-center"
              >
                Contact Page
              </Link>
              <Link
                to="/faq"
                className="block w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 text-center"
              >
                FAQ Page
              </Link>
            </div>
          </div>

          {/* Authentication Pages */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔑 Auth Pages</h2>
            <div className="space-y-3">
              <Link
                to="/login"
                className="block w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-center"
              >
                Login Page
              </Link>
              <Link
                to="/register"
                className="block w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 text-center"
              >
                Register Page
              </Link>
            </div>
          </div>

          {/* Protected Routes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Protected Routes</h2>
            <div className="space-y-3">
              <Link
                to="/rider"
                className="block w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 text-center"
              >
                Rider Dashboard
              </Link>
              <Link
                to="/driver"
                className="block w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 text-center"
              >
                Driver Dashboard
              </Link>
              <Link
                to="/admin"
                className="block w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 text-center"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🔌 API Status</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">Backend URL:</p>
                <p className="text-xs text-gray-600 break-all">
                  https://ridemanagementapi.vercel.app
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">Frontend URL:</p>
                <p className="text-xs text-gray-600">
                  http://localhost:5173
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Instructions</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. First test API connection</p>
              <p>2. Register a test user</p>
              <p>3. Test login functionality</p>
              <p>4. Navigate to protected routes</p>
              <p>5. Check browser console for errors</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Check the browser console for detailed error messages and API responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
