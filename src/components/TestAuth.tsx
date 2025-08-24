import { useState } from 'react';
import { useLoginMutation } from '../store/api';
import toast from 'react-hot-toast';

const TestAuth = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { email, password });
      const result = await login({ email, password }).unwrap();
      toast.success('Login successful!');
      console.log('Login result:', result);
    } catch (error: any) {
      console.error('Login error details:', error);
      console.error('Error status:', error.status);
      console.error('Error data:', error.data);
      console.error('Error message:', error.error);
      
      let errorMessage = 'Login failed';
      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.error) {
        errorMessage = error.error;
      } else if (error.status === 'FETCH_ERROR') {
        errorMessage = 'Network error - check if backend is running';
      }
      
      toast.error(errorMessage);
    }
  };

  const testApiConnection = async () => {
    try {
      const response = await fetch('https://ridemanagementapi.vercel.app/');
      console.log('API connection test:', response.status, response.statusText);
      const text = await response.text();
      console.log('API response:', text);
      toast.success(`API Status: ${response.status}`);
    } catch (error) {
      console.error('API connection error:', error);
      toast.error('API connection failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Test Authentication</h2>
      
      <button
        onClick={testApiConnection}
        className="w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Test API Connection
      </button>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Test Login'}
        </button>
      </form>
      
      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <h3 className="font-semibold text-sm mb-2">Test Credentials:</h3>
        <p className="text-xs text-gray-600">Email: test@example.com</p>
        <p className="text-xs text-gray-600">Password: password123</p>
        <p className="text-xs text-gray-500 mt-2">
          Note: You may need to register this user first or use existing credentials.
        </p>
      </div>
    </div>
  );
};

export default TestAuth;
