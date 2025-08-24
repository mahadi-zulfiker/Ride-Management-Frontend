import { useState, useEffect } from 'react';
import { 
  Car, MapPin, Clock, DollarSign, User, Phone, 
  CheckCircle, Navigation, AlertCircle, Star, 
  Play, Pause, Square 
} from 'lucide-react';
import { useUpdateRideStatusMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const ActiveRideManagement = () => {
  const [updateRideStatus, { isLoading }] = useUpdateRideStatusMutation();
  const [currentRide, setCurrentRide] = useState({
    id: 'RIDE001',
    status: 'accepted', // accepted, picked_up, in_transit, completed
    rider: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      photo: 'S',
    },
    pickup: '123 Main St, Downtown',
    destination: '456 Oak Ave, Uptown',
    fare: 25.50,
    distance: '3.2 km',
    estimatedTime: '12 min',
    paymentMethod: 'Credit Card',
    startTime: '14:30',
    currentTime: '14:35',
  });

  const [rideTimer, setRideTimer] = useState(0); // seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setRideTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateRideStatus({
        rideId: currentRide.id,
        status: newStatus
      }).unwrap();
      
      setCurrentRide(prev => ({ ...prev, status: newStatus }));
      
      const statusMessages = {
        picked_up: 'Rider picked up successfully!',
        in_transit: 'Ride in progress...',
        completed: 'Ride completed! Great job!'
      };
      
      toast.success(statusMessages[newStatus as keyof typeof statusMessages] || 'Status updated');
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to update status. Please try again.';
      toast.error(errorMessage);
    }
  };

  const callRider = () => {
    window.open(`tel:${currentRide.rider.phone}`, '_blank');
  };

  const getStatusInfo = () => {
    switch (currentRide.status) {
      case 'accepted':
        return {
          title: 'Heading to Pickup',
          description: 'Navigate to the pickup location',
          icon: <Navigation className="w-6 h-6 text-blue-600" />,
          color: 'blue',
          nextAction: 'picked_up',
          nextActionText: 'Picked Up Rider'
        };
      case 'picked_up':
        return {
          title: 'Ride in Progress',
          description: 'Drive safely to the destination',
          icon: <Car className="w-6 h-6 text-green-600" />,
          color: 'green',
          nextAction: 'in_transit',
          nextActionText: 'Start Trip'
        };
      case 'in_transit':
        return {
          title: 'En Route to Destination',
          description: 'You are on your way to the destination',
          icon: <Navigation className="w-6 h-6 text-green-600" />,
          color: 'green',
          nextAction: 'completed',
          nextActionText: 'Complete Ride'
        };
      case 'completed':
        return {
          title: 'Ride Completed',
          description: 'Thank you for providing excellent service!',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          color: 'green',
          nextAction: null,
          nextActionText: null
        };
      default:
        return {
          title: 'Ride Status',
          description: 'Current ride status',
          icon: <AlertCircle className="w-6 h-6 text-gray-600" />,
          color: 'gray',
          nextAction: null,
          nextActionText: null
        };
    }
  };

  const statusInfo = getStatusInfo();

  if (!currentRide) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Ride</h2>
            <p className="text-gray-600">
              You don't have any active rides at the moment. Check incoming requests to accept a new ride.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Ride Status Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-12 h-12 bg-${statusInfo.color}-100 rounded-full flex items-center justify-center mr-4`}>
                {statusInfo.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{statusInfo.title}</h1>
                <p className="text-gray-600">{statusInfo.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Ride Timer</div>
              <div className="text-2xl font-bold text-primary-600">{formatTime(rideTimer)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rider Information */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Rider Information</h2>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-primary-600">{currentRide.rider.photo}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{currentRide.rider.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{currentRide.rider.rating}</span>
                </div>
              </div>
              <button
                onClick={callRider}
                className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="font-medium">{currentRide.rider.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Payment Method</span>
                <span className="font-medium">{currentRide.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Ride Started</span>
                <span className="font-medium">{currentRide.startTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ride Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="text-gray-900">{currentRide.pickup}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="text-gray-900">{currentRide.destination}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-medium text-gray-900">{currentRide.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Est. Time</p>
                  <p className="font-medium text-gray-900">{currentRide.estimatedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fare Information */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Fare</h3>
              <p className="text-sm text-gray-500">Final amount to be charged</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">${currentRide.fare}</div>
              <div className="text-sm text-gray-500">USD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      {statusInfo.nextAction && (
        <div className="mt-6 bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Ride Status</h2>
            
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusUpdate(statusInfo.nextAction!)}
                disabled={isLoading}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {statusInfo.nextActionText}
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> Only update the status when you have actually completed the action. 
                    This helps maintain accurate ride tracking and billing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={callRider}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Call Rider</h3>
                <p className="text-sm text-gray-500">Contact rider for updates</p>
              </div>
            </button>

            <button
              onClick={() => window.open('https://maps.google.com', '_blank')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Navigation className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Open Maps</h3>
                <p className="text-sm text-gray-500">Navigate to destination</p>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/driver/earnings'}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">View Earnings</h3>
                <p className="text-sm text-gray-500">Check your earnings</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRideManagement;
