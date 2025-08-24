import { useState } from 'react';
import { 
  Wifi, WifiOff, Car, Clock, MapPin, DollarSign, 
  CheckCircle, AlertCircle, TrendingUp, Users 
} from 'lucide-react';
import { useAppSelector } from '../../../hooks/redux';
import { useUpdateDriverStatusMutation } from '../../../store/api';
import toast from 'react-hot-toast';

const AvailabilityControl = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [updateDriverStatus, { isLoading }] = useUpdateDriverStatusMutation();
  const [isOnline, setIsOnline] = useState(user?.isOnline || false);

  const handleToggleStatus = async () => {
    try {
      await updateDriverStatus({
        driverId: user?._id || '',
        status: !isOnline
      }).unwrap();
      
      setIsOnline(!isOnline);
      toast.success(isOnline ? 'You are now offline' : 'You are now online and ready to receive rides!');
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Failed to update status. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Mock data for today's stats
  const todayStats = {
    rides: 8,
    earnings: 156.50,
    hours: 6.5,
    rating: 4.8,
  };

  const weeklyStats = {
    rides: 42,
    earnings: 892.30,
    hours: 38,
    rating: 4.7,
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Status Header */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Availability Control</h1>
              <p className="text-gray-600">Manage your online status and view your performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
                isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Online/Offline Toggle */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Go Online</h2>
            
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {isOnline ? (
                  <Wifi className="w-16 h-16 text-green-600" />
                ) : (
                  <WifiOff className="w-16 h-16 text-gray-600" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isOnline ? 'You are Online' : 'You are Offline'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isOnline 
                  ? 'You are currently receiving ride requests from riders.'
                  : 'Go online to start receiving ride requests and earning money.'
                }
              </p>
              
              <button
                onClick={handleToggleStatus}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                  isOnline
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {isOnline ? (
                      <>
                        <WifiOff className="w-5 h-5 mr-2" />
                        Go Offline
                      </>
                    ) : (
                      <>
                        <Wifi className="w-5 h-5 mr-2" />
                        Go Online
                      </>
                    )}
                  </div>
                )}
              </button>
            </div>

            {/* Status Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Status Information</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {isOnline ? 'Receiving ride requests' : 'Not receiving requests'}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {isOnline ? 'Eligible for earnings' : 'No earnings while offline'}
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {isOnline ? 'Visible to riders' : 'Hidden from riders'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Today's Performance */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Car className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-primary-600">{todayStats.rides}</div>
                <div className="text-sm text-gray-600">Rides</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">${todayStats.earnings}</div>
                <div className="text-sm text-gray-600">Earnings</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{todayStats.hours}h</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">{todayStats.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* Weekly Comparison */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-3">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Rides</span>
                  <span className="font-medium">{weeklyStats.rides}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="font-medium">${weeklyStats.earnings}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-medium">{weeklyStats.hours}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-medium">{weeklyStats.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Set Preferred Area</h3>
                <p className="text-sm text-gray-500">Choose your service area</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Set Schedule</h3>
                <p className="text-sm text-gray-500">Plan your working hours</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Support</h3>
                <p className="text-sm text-gray-500">Get help when needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips for Drivers */}
      <div className="mt-6 bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Earnings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Stay Online During Peak Hours</h3>
                <p className="text-sm text-gray-600">Peak hours typically include morning and evening rush hours, weekends, and special events.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Maintain High Ratings</h3>
                <p className="text-sm text-gray-600">Good ratings help you get more ride requests and better earnings.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Keep Your Vehicle Clean</h3>
                <p className="text-sm text-gray-600">A clean and well-maintained vehicle improves rider experience and ratings.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-primary-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Be Professional</h3>
                <p className="text-sm text-gray-600">Professional behavior and good communication lead to better tips and ratings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityControl;
