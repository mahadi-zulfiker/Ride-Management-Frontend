import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car, Clock, CreditCard, DollarSign, Navigation } from 'lucide-react';
import { useCreateRideMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const BookRide = () => {
  const navigate = useNavigate();
  const [createRide, { isLoading }] = useCreateRideMutation();

  const [formData, setFormData] = useState({
    pickupLocation: '',
    destinationLocation: '',
    vehicleType: 'sedan',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const vehicleTypes = [
    { id: 'sedan', name: 'Sedan', icon: '🚗', price: 1.0, description: 'Comfortable 4-seater' },
    { id: 'suv', name: 'SUV', icon: '🚙', price: 1.3, description: 'Spacious 6-seater' },
    { id: 'motorcycle', name: 'Motorcycle', icon: '🏍️', price: 0.7, description: 'Quick and economical' },
    { id: 'van', name: 'Van', icon: '🚐', price: 1.5, description: 'Large group transport' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'cash', name: 'Cash', icon: '💰' },
    { id: 'mobile', name: 'Mobile Payment', icon: '📱' },
  ];

  const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicleType);
  const estimatedFare = selectedVehicle ? Math.round(25 * selectedVehicle.price) : 25; // Base fare calculation

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }

    if (!formData.destinationLocation.trim()) {
      newErrors.destinationLocation = 'Destination location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const rideData = {
        pickupLocation: {
          latitude: 40.7128, // Mock coordinates - in real app, get from geocoding
          longitude: -74.0060,
          address: formData.pickupLocation,
        },
        destinationLocation: {
          latitude: 40.7589,
          longitude: -73.9851,
          address: formData.destinationLocation,
        },
        paymentMethod: formData.paymentMethod as 'cash' | 'card' | 'mobile',
      };

      const result = await createRide(rideData).unwrap();
      
      if (result) {
        toast.success('Ride booked successfully! Finding your driver...');
        navigate('/rider/active');
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to book ride. Please try again.';
      toast.error(errorMessage);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, reverse geocode the coordinates
          setFormData(prev => ({ 
            ...prev, 
            pickupLocation: 'Current Location' 
          }));
          toast.success('Location detected!');
        },
        (error) => {
          toast.error('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Book a Ride</h1>
          <p className="text-gray-600">Enter your pickup and destination locations</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Location Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.pickupLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter pickup location"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <Navigation className="h-5 w-5 text-primary-600 hover:text-primary-700" />
                </button>
              </div>
              {errors.pickupLocation && (
                <p className="mt-1 text-sm text-red-600">{errors.pickupLocation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="destinationLocation"
                  value={formData.destinationLocation}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.destinationLocation ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter destination"
                />
              </div>
              {errors.destinationLocation && (
                <p className="mt-1 text-sm text-red-600">{errors.destinationLocation}</p>
              )}
            </div>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Vehicle Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {vehicleTypes.map((vehicle) => (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, vehicleType: vehicle.id }))}
                  className={`p-4 border-2 rounded-lg text-center transition-colors duration-200 ${
                    formData.vehicleType === vehicle.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{vehicle.icon}</div>
                  <div className="font-medium">{vehicle.name}</div>
                  <div className="text-sm text-gray-500">{vehicle.description}</div>
                  <div className="text-sm font-medium mt-1">
                    {vehicle.price > 1 ? `${vehicle.price}x` : 'Base'} fare
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                  className={`p-3 border-2 rounded-lg text-center transition-colors duration-200 ${
                    formData.paymentMethod === method.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="text-xl mb-1">{method.icon}</div>
                  <div className="text-sm font-medium">{method.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fare Estimate */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Estimated Fare</h3>
                <p className="text-sm text-gray-600">Based on distance and vehicle type</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">${estimatedFare}</div>
                <div className="text-sm text-gray-500">USD</div>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Finding Driver...
              </>
            ) : (
              <>
                <Car className="w-5 h-5 mr-2" />
                Book Ride
              </>
            )}
          </button>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Schedule Ride</h3>
              <p className="text-sm text-gray-500">Book for later</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <CreditCard className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Payment Methods</h3>
              <p className="text-sm text-gray-500">Manage your cards</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
              <DollarSign className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Fare Estimate</h3>
              <p className="text-sm text-gray-500">Check pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
