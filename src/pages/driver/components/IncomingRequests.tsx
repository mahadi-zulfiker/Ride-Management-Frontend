import { useState, useEffect } from 'react';
import { 
  Phone, MapPin, Clock, DollarSign, User, Car, 
  CheckCircle, XCircle, AlertCircle, Star 
} from 'lucide-react';
import { useAppSelector } from '../../../hooks/redux';
import { useAcceptRideMutation, useRejectRideMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const IncomingRequests = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [acceptRide, { isLoading: isAccepting }] = useAcceptRideMutation();
  const [rejectRide, { isLoading: isRejecting }] = useRejectRideMutation();

  const [incomingRequests, setIncomingRequests] = useState([
    {
      id: 'RIDE001',
      rider: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        rating: 4.8,
        photo: 'S',
      },
      pickup: '123 Main St, Downtown',
      destination: '456 Oak Ave, Uptown',
      distance: '3.2 km',
      estimatedTime: '8 min',
      fare: 25.50,
      paymentMethod: 'Credit Card',
      requestTime: '2 min ago',
      expiresIn: 15, // seconds
    },
    {
      id: 'RIDE002',
      rider: {
        name: 'Mike Wilson',
        phone: '+1 (555) 987-6543',
        rating: 4.6,
        photo: 'M',
      },
      pickup: '789 Pine St, Midtown',
      destination: '321 Elm St, Westside',
      distance: '2.1 km',
      estimatedTime: '6 min',
      fare: 18.75,
      paymentMethod: 'Cash',
      requestTime: '1 min ago',
      expiresIn: 25,
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  // Simulate countdown timers for requests
  useEffect(() => {
    const interval = setInterval(() => {
      setIncomingRequests(prev => 
        prev.map(request => ({
          ...request,
          expiresIn: Math.max(0, request.expiresIn - 1)
        })).filter(request => request.expiresIn > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAcceptRide = async (rideId: string) => {
    try {
      await acceptRide(rideId).unwrap();
      setIncomingRequests(prev => prev.filter(request => request.id !== rideId));
      toast.success('Ride accepted successfully!');
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to accept ride. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleRejectRide = async (rideId: string) => {
    try {
      await rejectRide(rideId).unwrap();
      setIncomingRequests(prev => prev.filter(request => request.id !== rideId));
      toast.success('Ride rejected');
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to reject ride. Please try again.';
      toast.error(errorMessage);
    }
  };

  const callRider = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user?.isOnline) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You're Currently Offline</h2>
            <p className="text-gray-600 mb-6">
              You need to go online to receive ride requests from riders.
            </p>
            <button
              onClick={() => window.location.href = '/driver'}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Go Online
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Incoming Requests</h1>
              <p className="text-gray-600">Accept or reject ride requests from riders</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online - Receiving requests</span>
            </div>
          </div>
        </div>
      </div>

      {incomingRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Incoming Requests</h2>
            <p className="text-gray-600">
              You'll see ride requests here when riders book rides in your area.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {incomingRequests.map((request) => (
            <div
              key={request.id}
              className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${
                selectedRequest === request.id ? 'border-primary-500' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                {/* Request Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-600">{request.rider.photo}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.rider.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{request.rider.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{request.requestTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expiry Timer */}
                  <div className={`text-right ${
                    request.expiresIn <= 10 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <div className="text-sm font-medium">
                      {request.expiresIn > 0 ? formatTime(request.expiresIn) : 'Expired'}
                    </div>
                    <div className="text-xs">Time remaining</div>
                  </div>
                </div>

                {/* Ride Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Pickup</p>
                        <p className="text-gray-900">{request.pickup}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="text-gray-900">{request.destination}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Distance</span>
                      <span className="font-medium">{request.distance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Est. Time</span>
                      <span className="font-medium">{request.estimatedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Payment</span>
                      <span className="font-medium">{request.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Fare Information */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Estimated Fare</h4>
                      <p className="text-sm text-gray-500">Base fare + distance + time</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">${request.fare}</div>
                      <div className="text-sm text-gray-500">USD</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => callRider(request.rider.phone)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Rider
                  </button>
                  
                  <button
                    onClick={() => handleRejectRide(request.id)}
                    disabled={isRejecting || request.expiresIn === 0}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {isRejecting ? 'Rejecting...' : 'Reject'}
                  </button>
                  
                  <button
                    onClick={() => handleAcceptRide(request.id)}
                    disabled={isAccepting || request.expiresIn === 0}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isAccepting ? 'Accepting...' : 'Accept'}
                  </button>
                </div>

                {/* Expired Warning */}
                {request.expiresIn === 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">This request has expired</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Respond Quickly</h3>
                <p className="text-sm text-gray-600">Accept or reject requests within the time limit to maintain good standing.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Check Rider Rating</h3>
                <p className="text-sm text-gray-600">Consider rider ratings and payment methods before accepting rides.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Consider Distance</h3>
                <p className="text-sm text-gray-600">Factor in pickup distance and total trip length for optimal earnings.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Call if Needed</h3>
                <p className="text-sm text-gray-600">Contact riders for clarification on pickup location or special requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequests;
