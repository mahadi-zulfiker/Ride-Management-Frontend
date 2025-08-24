import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, MapPin, Clock, Phone, Star, Navigation, 
  CheckCircle, AlertCircle, User, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

const ActiveRide = () => {
  const navigate = useNavigate();
  const [rideStatus, setRideStatus] = useState('accepted'); // accepted, picked_up, in_transit, completed
  const [estimatedTime, setEstimatedTime] = useState(8); // minutes
  const [currentLocation, setCurrentLocation] = useState('123 Main St, City, State');

  // Mock ride data - in real app, this would come from API
  const rideData = {
    id: 'RIDE123',
    driver: {
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      vehicle: {
        model: 'Toyota Camry',
        color: 'Silver',
        licensePlate: 'ABC-123',
      },
      photo: 'J',
    },
    pickup: '123 Main St, City, State',
    destination: '456 Oak Ave, City, State',
    fare: 25,
    distance: '3.2 km',
    paymentMethod: 'Credit Card',
  };

  useEffect(() => {
    // Simulate ride status updates
    const statusUpdates = [
      { status: 'picked_up', time: 3000 },
      { status: 'in_transit', time: 8000 },
      { status: 'completed', time: 15000 },
    ];

    statusUpdates.forEach(({ status, time }) => {
      setTimeout(() => {
        setRideStatus(status);
        if (status === 'picked_up') {
          toast.success('Driver has picked you up!');
        } else if (status === 'in_transit') {
          toast.success('Ride in progress...');
        } else if (status === 'completed') {
          toast.success('Ride completed! Thank you for using RideShare.');
          setTimeout(() => navigate('/rider'), 2000);
        }
      }, time);
    });

    // Update ETA every 30 seconds
    const etaInterval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 0.5));
    }, 30000);

    return () => clearInterval(etaInterval);
  }, [navigate]);

  const getStatusInfo = () => {
    switch (rideStatus) {
      case 'accepted':
        return {
          title: 'Driver is on the way',
          description: 'Your driver is heading to your pickup location',
          icon: <Car className="w-6 h-6 text-blue-600" />,
          color: 'blue',
        };
      case 'picked_up':
        return {
          title: 'Ride in progress',
          description: 'You are on your way to your destination',
          icon: <Navigation className="w-6 h-6 text-green-600" />,
          color: 'green',
        };
      case 'in_transit':
        return {
          title: 'Almost there',
          description: 'You are approaching your destination',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          color: 'green',
        };
      case 'completed':
        return {
          title: 'Ride completed',
          description: 'Thank you for using RideShare',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          color: 'green',
        };
      default:
        return {
          title: 'Finding driver',
          description: 'Please wait while we find a driver for you',
          icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
          color: 'yellow',
        };
    }
  };

  const statusInfo = getStatusInfo();

  const callDriver = () => {
    window.open(`tel:${rideData.driver.phone}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Ride Status Card */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 bg-${statusInfo.color}-100 rounded-full flex items-center justify-center mr-4`}>
              {statusInfo.icon}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{statusInfo.title}</h1>
              <p className="text-gray-600">{statusInfo.description}</p>
            </div>
          </div>

          {rideStatus !== 'completed' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Estimated arrival:</span>
                </div>
                <span className="text-blue-800 font-bold">{Math.round(estimatedTime)} min</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Driver Information */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Driver</h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-primary-600">{rideData.driver.photo}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{rideData.driver.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{rideData.driver.rating} • {rideData.driver.vehicle.model}</span>
                </div>
                <p className="text-sm text-gray-500">{rideData.driver.vehicle.color} • {rideData.driver.vehicle.licensePlate}</p>
              </div>
            </div>
            
            <button
              onClick={callDriver}
              className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ride Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="text-gray-900">{rideData.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Destination</p>
                <p className="text-gray-900">{rideData.destination}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium text-gray-900">{rideData.distance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-medium text-gray-900">{rideData.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fare Information */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Fare</h3>
              <p className="text-sm text-gray-500">Final amount to be charged</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">${rideData.fare}</div>
              <div className="text-sm text-gray-500">USD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Safety Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
              <Shield className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Ride Tracking</p>
                <p className="text-sm text-gray-500">Real-time location sharing</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 border border-gray-200 rounded-lg">
              <User className="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Verified Driver</p>
                <p className="text-sm text-gray-500">Background checked driver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;
