import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Car, Shield } from 'lucide-react';
import { useAppDispatch } from '../../hooks/redux';
import { useRegisterMutation } from '../../store/api';
import { setCredentials } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

type Role = 'rider' | 'driver';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  phone: string;
  emergencyContact: string;
  vehicleType: string;
  licensePlate: string;
}

type RegisterField =
  | 'name'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'role'
  | 'phone'
  | 'emergencyContact'
  | 'vehicleType'
  | 'licensePlate';

type RegisterErrors = Partial<Record<RegisterField, string>>;

interface VehicleInfo {
  type: string;
  licensePlate: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver' | 'admin';
  phone?: string;
  emergencyContact?: string;
  vehicleInfo?: VehicleInfo;
  isApproved?: boolean;
  isOnline?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
interface AuthResponse {
  user: User;
  token: string;
}

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const initialRole = (searchParams.get('role') as Role) || 'rider';

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole,
    phone: '',
    emergencyContact: '',
    vehicleType: '',
    licensePlate: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters long';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    if (formData.role === 'driver') {
      if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required for drivers';
      if (!formData.licensePlate) newErrors.licensePlate = 'License plate is required for drivers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as RegisterFormData));
    if (errors[name as RegisterField]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const registerData: {
        name: string;
        email: string;
        password: string;
        role: Role;
        phone: string;
        emergencyContact: string;
        vehicleInfo?: VehicleInfo;
      } = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        emergencyContact: formData.emergencyContact,
        ...(formData.role === 'driver' && {
          vehicleInfo: {
            type: formData.vehicleType,
            licensePlate: formData.licensePlate,
          },
        }),
      };

      const result = (await register(registerData).unwrap()) as AuthResponse;

      if (result.user && result.token) {
        dispatch(setCredentials({ user: result.user, token: result.token }));
        toast.success('Registration successful!');
        switch (result.user.role) {
          case 'rider':
            navigate('/rider');
            break;
          case 'driver':
            navigate('/driver');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error: unknown) {
      let errorMessage = 'Registration failed. Please try again.';
      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data?.message === 'string'
      ) {
        errorMessage = (error as { data: { message: string } }).data.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="flex justify-center">
            <Car className="w-12 h-12 text-teal-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              sign in to your existing account
            </Link>
          </p>
        </motion.div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I want to register as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'rider' }))}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${formData.role === 'rider'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-300 hover:border-teal-300'
                      }`}
                  >
                    <User className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">Rider</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'driver' }))}
                    className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${formData.role === 'driver'
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-300 hover:border-teal-300'
                      }`}
                  >
                    <Car className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">Driver</span>
                  </button>
                </div>
              </motion.div>

              {(['name', 'email', 'phone', 'emergencyContact'] as const).map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                    {field === 'emergencyContact' ? 'Emergency Contact (Optional)' : field}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field === 'name' ? (
                        <User className="h-5 w-5 text-gray-400" />
                      ) : field === 'email' ? (
                        <Mail className="h-5 w-5 text-gray-400" />
                      ) : field === 'phone' ? (
                        <Phone className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Shield className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : field === 'phone' || field === 'emergencyContact' ? 'tel' : 'text'}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors[field] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder={`Enter your ${field === 'emergencyContact' ? 'emergency contact' : field}`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors[field] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors[field]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <AnimatePresence>
                {formData.role === 'driver' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
                        Vehicle Type
                      </label>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md ${errors.vehicleType ? 'border-red-300' : 'border-gray-300'
                          } border-gray-300`}
                      >
                        <option value="">Select vehicle type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="van">Van</option>
                      </select>
                      <AnimatePresence>
                        {errors.vehicleType && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {errors.vehicleType}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                        License Plate
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Car className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="licensePlate"
                          name="licensePlate"
                          type="text"
                          value={formData.licensePlate}
                          onChange={handleInputChange}
                          className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors.licensePlate ? 'border-red-300' : 'border-gray-300'
                            }`}
                          placeholder="Enter license plate number"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.licensePlate && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {errors.licensePlate}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {(['password', 'confirmPassword'] as const).map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (formData.role === 'driver' ? 2 : 0) + index * 0.1 }}
                >
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id={field}
                      name={field}
                      type={
                        field === 'password'
                          ? showPassword
                            ? 'text'
                            : 'password'
                          : showConfirmPassword
                            ? 'text'
                            : 'password'
                      }
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${errors[field] ? 'border-red-300' : 'border-gray-300'
                        }`}
                      placeholder={field === 'password' ? 'Create a password' : 'Confirm your password'}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        field === 'password'
                          ? setShowPassword(prev => !prev)
                          : setShowConfirmPassword(prev => !prev)
                      }
                    >
                      {(field === 'password' ? showPassword : showConfirmPassword) ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors[field] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors[field]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">{/* Google SVG */}</svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{/* Facebook SVG */}</svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RegisterPage;
